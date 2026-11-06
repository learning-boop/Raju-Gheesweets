import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from 'framer-motion'
import Icon, { Logo } from '../ui/Icon.jsx'
import { EASE } from '../../lib/motion.js'
import { SITE, ext, phoneLabel, telHref, waHref } from '../../config/site.js'
import { CREDITS } from '../../data/images.js'
import { useCart } from '../../cart/cart.jsx'

const WORD = 'Raju Ghee Sweets'
const YEAR = new Date().getFullYear()

// The big outlined wordmark: letters rise in once the row (not the clipped letters) is in view.
function GiantWord() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <p ref={ref} className="giant serif" aria-hidden="true">
      {WORD.split('').map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%' }}
          animate={{ y: inView ? '0%' : '100%' }}
          transition={{ duration: 1, ease: EASE, delay: i * 0.035 }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </motion.span>
      ))}
    </p>
  )
}

// Floating button: opens the cart once something is in it, otherwise starts a WhatsApp chat.
export function FloatingOrder() {
  const { scrollY } = useScroll()
  const cart = useCart()
  const [scrolled, setScrolled] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 900))
  const wa = waHref()
  const motionProps = {
    initial: { opacity: 0, y: 30, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 30, scale: 0.8 },
    transition: { duration: 0.5, ease: EASE },
  }
  return (
    <AnimatePresence>
      {cart.count > 0 ? (
        <motion.button key="cart" type="button" className="fab" onClick={() => cart.setOpen(true)} {...motionProps}
          aria-label={`Open cart, ${cart.count} ${cart.count === 1 ? 'item' : 'items'}`}>
          <Icon name="bag" size={22} />
          <span>Cart</span>
          <span className="cart-badge">{cart.count}</span>
        </motion.button>
      ) : scrolled ? (
        <motion.a key="wa" className="fab" href={wa} {...ext(wa)} {...motionProps} aria-label="Order on WhatsApp">
          <Icon name="chat" size={22} />
          <span>Order</span>
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}

export default function Footer() {
  const [showCredits, setShowCredits] = useState(false)
  const socials = Object.entries(SITE.social)

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#top" aria-label={`${SITE.name}, back to top`}><Logo height={140} tagline /></a>
            <p>Ghee sweets, Andhra specials and savouries from Vijayatakies Centre, Vijayawada.</p>
            <div className="footer__social">
              {socials.map(([name, url]) => (
                <a key={name} className="social" href={url || '#'} aria-label={name[0].toUpperCase() + name.slice(1)} {...ext(url)}>
                  <Icon name={name} />
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__col" aria-label="Menu">
            <p className="eyebrow">Menu</p>
            <a href="#menu">Ghee classics</a>
            <a href="#menu">Milk &amp; syrup sweets</a>
            <a href="#specials">Andhra specials</a>
            <a href="#snacks">Snacks &amp; hots</a>
          </nav>
          <nav className="footer__col" aria-label="Order">
            <p className="eyebrow">Order</p>
            <a href="#gifting">Festival boxes</a>
            <a href="#gifting">Weddings &amp; functions</a>
            <a href="#gifting">Corporate gifting</a>
            <a href={waHref()} {...ext(waHref())}>Order on WhatsApp</a>
          </nav>
          <div className="footer__col">
            <p className="eyebrow">Visit</p>
            <p>{SITE.address}</p>
            <p>Daily · {SITE.hours.short}</p>
            <a href={telHref}>{phoneLabel}</a>
          </div>
        </div>

        <GiantWord />

        <div className="footer__bottom">
          <span>© {YEAR} {SITE.name}, {SITE.city}. All rights reserved.</span>
          <button type="button" className="footer__credits-btn" onClick={() => setShowCredits((s) => !s)} aria-expanded={showCredits}>
            Photo credits
          </button>
          <span>Made with pure ghee — and patience.</span>
        </div>

        <AnimatePresence>
          {showCredits && (
            <motion.ul
              className="credits"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {CREDITS.map((c) => (
                <li key={c.key}>
                  <a href={c.page} target="_blank" rel="noopener noreferrer">{c.alt}</a> — {c.by} ({c.license})
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </footer>
  )
}
