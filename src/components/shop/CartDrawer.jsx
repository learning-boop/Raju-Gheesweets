import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Img } from '../ui/motion.jsx'
import { useCart } from '../../cart/cart.jsx'
import { DELIVERY, PAYMENT, rupees } from '../../data/shop.js'
import { SITE } from '../../config/site.js'
import { useLenis } from '../../hooks/index.js'
import { EASE } from '../../lib/motion.js'

// Pickup slots every 30 minutes, from an hour after opening to half an hour before closing.
const SLOTS = []
for (let m = (SITE.hours.open + 1) * 60; m <= SITE.hours.close * 60 - 30; m += 30) {
  const h = Math.floor(m / 60)
  const label = `${((h + 11) % 12) + 1}:${String(m % 60).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`
  SLOTS.push(label)
}
const today = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

const EMPTY = { name: '', phone: '', method: 'pickup', date: '', time: '', address: '', pincode: '', city: '', payment: 'UPI', notes: '' }

function validate(f, items) {
  const e = {}
  if (!f.name.trim()) e.name = 'Enter your name'
  if (!/^(\+?91)?[6-9]\d{9}$/.test(f.phone.replace(/[\s-]/g, ''))) e.phone = 'Enter a 10-digit mobile number'
  if (f.method === 'pickup') {
    if (!f.date) e.date = 'Choose a pickup date'
    else if (f.date < today()) e.date = 'Choose today or a later date'
    if (!f.time) e.time = 'Choose a pickup time'
  } else {
    if (f.address.trim().length < 8) e.address = 'Enter the full address'
    if (!/^\d{6}$/.test(f.pincode)) e.pincode = 'Enter a 6-digit pincode'
    else if (f.method === 'local' && !f.pincode.startsWith(DELIVERY.local.pincodePrefix))
      e.pincode = 'That pincode is outside Vijayawada. Choose courier instead'
    if (f.method === 'courier' && !f.city.trim()) e.city = 'Enter your city'
  }
  if (f.method === 'courier') {
    const fresh = items.filter((i) => !i.product.courier)
    if (fresh.length) e.items = `${fresh.map((i) => i.product.name).join(', ')} can't travel by courier. Remove them, or choose pickup or Vijayawada delivery.`
  }
  return e
}

function orderMessage(f, items, subtotal, unpriced) {
  const lines = items.map(
    (i, n) => `${n + 1}. ${i.product.name} — ${i.pack} × ${i.qty}${i.total != null ? ` — ${rupees(i.total)}` : ' — price to confirm'}`,
  )
  const how =
    f.method === 'pickup'
      ? `Pickup at ${SITE.addressShort} on ${new Date(f.date + 'T00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}, ${f.time}`
      : `${DELIVERY[f.method].label}: ${f.address.trim()}${f.method === 'courier' && f.city.trim() ? `, ${f.city.trim()}` : ''} — ${f.pincode}`
  const total =
    items.length === unpriced
      ? 'Prices: please confirm'
      : `Subtotal: ${rupees(subtotal)}${unpriced ? ` + ${unpriced} item(s) to confirm` : ''}`
  const fee = DELIVERY[f.method]?.fee
  const delivery = f.method === 'pickup' ? null : `${f.method === 'courier' ? 'Courier' : 'Delivery'} charge: ${fee ? rupees(fee) : 'please confirm'}`
  return [
    `Hi ${SITE.name}! I'd like to place an order from the website.`,
    '',
    ...lines,
    '',
    total,
    delivery,
    how,
    `Payment: ${f.payment}${f.method === 'pickup' ? ' at pickup' : f.payment === 'Cash' ? ' on delivery' : ''}`,
    '',
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    f.notes.trim() ? `Notes: ${f.notes.trim()}` : null,
  ]
    .filter((l) => l !== null)
    .join('\n')
}

// `group` renders a div, for fields that hold their own labels (radio groups can't sit inside a <label>)
function Field({ label, error, children, wide, group }) {
  const Tag = group ? 'div' : 'label'
  return (
    <Tag className={`field ${wide ? 'field--wide' : ''} ${error ? 'has-error' : ''}`} role={group ? 'group' : undefined} aria-label={group ? label : undefined}>
      <span className="field__label">{label}</span>
      {children}
      {error && <span className="field__error" role="alert">{error}</span>}
    </Tag>
  )
}

export default function CartDrawer() {
  const cart = useCart()
  const { items, count, subtotal, unpriced, open, setOpen } = cart
  const lenis = useLenis()
  const closeRef = useRef(null)
  const returnTo = useRef(null)
  const [step, setStep] = useState('cart') // cart → details → sent
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: undefined, items: k === 'method' ? undefined : er.items }))
  }

  // lock the page behind the panel, close on Escape, and put focus back where it was
  useEffect(() => {
    if (!open) return
    returnTo.current = document.activeElement
    lenis?.stop()
    document.documentElement.classList.add('menu-open')
    const t = setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      lenis?.start()
      document.documentElement.classList.remove('menu-open')
      returnTo.current?.focus?.()
    }
  }, [open, lenis, setOpen])

  // an emptied cart goes back to the first step (but keep the "sent" confirmation)
  useEffect(() => {
    if (!items.length && step === 'details') setStep('cart')
  }, [items.length, step])

  const send = (e) => {
    e.preventDefault()
    const errs = validate(form, items)
    setErrors(errs)
    if (Object.keys(errs).length) return
    if (!SITE.whatsapp) {
      setErrors({ items: "The shop's WhatsApp number hasn't been set up yet, so orders can't be sent. Please call the shop instead." })
      return
    }
    const url = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(orderMessage(form, items, subtotal, unpriced))}`
    window.open(url, '_blank', 'noopener')
    setStep('sent')
  }

  const finish = () => {
    cart.clear()
    setStep('cart')
    setOpen(false)
  }

  const methodFee = DELIVERY[form.method]?.fee

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="drawer-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="drawer-scrim" onClick={() => setOpen(false)} aria-hidden="true" />
          <motion.aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: EASE }}
            data-lenis-prevent
          >
            <header className="drawer__head">
              <h2 id="cart-title" className="serif">
                {step === 'details' ? 'Your details' : step === 'sent' ? 'Order sent' : 'Your order'}
              </h2>
              <button ref={closeRef} type="button" className="drawer__close" onClick={() => setOpen(false)} aria-label="Close cart">
                <Icon name="close" />
              </button>
            </header>

            {step === 'sent' ? (
              <div className="drawer__body drawer__done">
                <span className="drawer__done-icon"><Icon name="check" size={28} /></span>
                <p>Your order is ready in WhatsApp. Press send there, and the shop will confirm the prices, timing and payment.</p>
                <p className="drawer__muted">WhatsApp didn’t open? Go back and try again, or call the shop.</p>
                <div className="drawer__actions">
                  <button type="button" className="btn btn--ghost" onClick={() => setStep('details')}>Back to order</button>
                  <button type="button" className="btn btn--gold" onClick={finish}>Done, clear cart</button>
                </div>
              </div>
            ) : !items.length ? (
              <div className="drawer__body drawer__empty">
                <Icon name="bag" size={36} />
                <p>Your cart is empty.</p>
                <a className="btn btn--gold" href="#menu" onClick={() => setOpen(false)}>Browse the sweets</a>
              </div>
            ) : step === 'cart' ? (
              <>
                <ul className="drawer__body cart-list">
                  {items.map((i) => (
                    <li key={i.key} className="cart-line">
                      <span className="cart-line__img"><Img img={i.product.img} sizes="64px" alt="" /></span>
                      <div className="cart-line__info">
                        <p className="cart-line__name">{i.product.name}</p>
                        <p className="cart-line__pack">{i.pack} · {i.price == null ? 'price on request' : `${rupees(i.price)} each`}</p>
                        <div className="qty">
                          <button type="button" onClick={() => cart.setQty(i.key, i.qty - 1)} aria-label={`One less ${i.product.name}`}><Icon name="minus" size={16} /></button>
                          <span aria-live="polite">{i.qty}</span>
                          <button type="button" onClick={() => cart.setQty(i.key, i.qty + 1)} aria-label={`One more ${i.product.name}`}><Icon name="plus" size={16} /></button>
                        </div>
                      </div>
                      <div className="cart-line__end">
                        <span className="cart-line__total">{i.total == null ? '' : rupees(i.total)}</span>
                        <button type="button" className="cart-line__remove" onClick={() => cart.remove(i.key)} aria-label={`Remove ${i.product.name}`}>
                          <Icon name="trash" size={18} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="drawer__foot">
                  <div className="drawer__sum">
                    <span>Subtotal · {count} {count === 1 ? 'item' : 'items'}</span>
                    <strong>{items.length === unpriced ? 'To confirm' : rupees(subtotal)}</strong>
                  </div>
                  {unpriced > 0 && (
                    <p className="drawer__muted">
                      {unpriced === items.length ? 'Prices' : `${unpriced} price${unpriced > 1 ? 's' : ''}`} will be confirmed by the shop on WhatsApp.
                    </p>
                  )}
                  <button type="button" className="btn btn--gold drawer__cta" onClick={() => setStep('details')}>
                    Continue <Icon name="arrow" size={18} />
                  </button>
                </footer>
              </>
            ) : (
              <form className="drawer__form" onSubmit={send} noValidate>
                <div className="drawer__body">
                  <fieldset className="methods">
                    <legend className="field__label">How would you like it?</legend>
                    {Object.entries(DELIVERY).map(([k, d]) => (
                      <label key={k} className={`method ${form.method === k ? 'is-on' : ''}`}>
                        <input type="radio" name="method" value={k} checked={form.method === k} onChange={set('method')} />
                        <span>
                          <strong>{d.label}</strong>
                          <small>{d.note}</small>
                        </span>
                      </label>
                    ))}
                  </fieldset>

                  {errors.items && <p className="field__error field__error--block" role="alert">{errors.items}</p>}

                  <div className="fields">
                    <Field label="Your name" error={errors.name}>
                      <input value={form.name} onChange={set('name')} autoComplete="name" placeholder="Lakshmi" />
                    </Field>
                    <Field label="Mobile number" error={errors.phone}>
                      <input value={form.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" placeholder="98480 12345" />
                    </Field>

                    {form.method === 'pickup' ? (
                      <>
                        <Field label="Pickup date" error={errors.date}>
                          <input type="date" min={today()} value={form.date} onChange={set('date')} />
                        </Field>
                        <Field label="Pickup time" error={errors.time}>
                          <select value={form.time} onChange={set('time')}>
                            <option value="">Choose a time</option>
                            {SLOTS.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </Field>
                      </>
                    ) : (
                      <>
                        <Field label="Delivery address" error={errors.address} wide>
                          <textarea rows={2} value={form.address} onChange={set('address')} autoComplete="street-address" placeholder="House no., street, area, landmark" />
                        </Field>
                        {form.method === 'courier' && (
                          <Field label="City" error={errors.city}>
                            <input value={form.city} onChange={set('city')} autoComplete="address-level2" placeholder="Hyderabad" />
                          </Field>
                        )}
                        <Field label="Pincode" error={errors.pincode}>
                          <input value={form.pincode} onChange={set('pincode')} autoComplete="postal-code" inputMode="numeric" maxLength={6} placeholder={form.method === 'local' ? '520002' : '500001'} />
                        </Field>
                      </>
                    )}

                    <Field label="Payment" wide group>
                      <div className="pay">
                        {PAYMENT.map((p) => (
                          <label key={p} className={`pay__opt ${form.payment === p ? 'is-on' : ''}`}>
                            <input type="radio" name="payment" value={p} checked={form.payment === p} onChange={set('payment')} />
                            {p === 'Cash' ? (form.method === 'pickup' ? 'Cash at pickup' : 'Cash on delivery') : 'UPI'}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="Notes (optional)" wide>
                      <textarea rows={2} value={form.notes} onChange={set('notes')} placeholder="Gift box, less sugar, a message on the card…" />
                    </Field>
                  </div>
                </div>

                <footer className="drawer__foot">
                  <div className="drawer__sum">
                    <span>Subtotal</span>
                    <strong>{items.length === unpriced ? 'To confirm' : rupees(subtotal)}</strong>
                  </div>
                  {form.method !== 'pickup' && (
                    <p className="drawer__muted">
                      {methodFee ? `Delivery: ${rupees(methodFee)}` : 'Delivery charge confirmed on WhatsApp'}. You pay when the shop confirms.
                    </p>
                  )}
                  <div className="drawer__actions">
                    <button type="button" className="btn btn--ghost" onClick={() => setStep('cart')}>Back</button>
                    <button type="submit" className="btn btn--gold drawer__cta">
                      <Icon name="chat" size={18} /> Send order on WhatsApp
                    </button>
                  </div>
                </footer>
              </form>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Small "added" confirmation that also opens the cart. */
export function CartToast() {
  const { toast, setOpen } = useCart()
  return (
    <div className="cart-toast-wrap" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.button
            key={toast.id}
            type="button"
            className="cart-toast"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <Icon name="check" size={18} /> {toast.text} <span className="cart-toast__view">View cart</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
