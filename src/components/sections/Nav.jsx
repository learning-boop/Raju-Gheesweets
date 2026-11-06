import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Icon, { Logo } from '../ui/Icon.jsx'
import { Magnetic } from '../ui/motion.jsx'
import { EASE } from '../../lib/motion.js'
import { SITE, ext, telHref, waHref } from '../../config/site.js'
import { useLenis } from '../../hooks/index.js'
import { useCart } from '../../cart/cart.jsx'

const LINKS = [
  ['#menu', 'Sweets'],
  ['#specials', 'Andhra specials'],
  ['#snacks', 'Snacks'],
  ['#gifting', 'Gifting'],
  ['#visit', 'Visit'],
]

export default function Nav() {
  const { scrollY } = useScroll()
  const lenis = useLenis()
  const cart = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  useMotionValueEvent(scrollY, 'change', (v) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(v > 40)
    if (v > 420 && v > prev + 2) setHidden(true)
    else if (v < prev - 2) setHidden(false)
  })

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    if (open) lenis?.stop()
    else lenis?.start()
    document.documentElement.classList.toggle('menu-open', open)
  }, [open, lenis])

  const order = waHref()

  return (
    <>
      <motion.header
        className={`nav ${scrolled ? 'is-scrolled' : ''}`}
        animate={{ y: hidden && !open ? '-110%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="container nav__inner">
          <a href="#top" className="nav__brand" aria-label={`${SITE.name}, back to top`}>
            <Logo height={74} />
          </a>
          <nav className="nav__links" aria-label="Main">
            {LINKS.map(([href, label]) => (
              <a key={href} href={href}>
                <span data-text={label}>{label}</span>
              </a>
            ))}
          </nav>
          <div className="nav__actions">
            <a className="btn btn--ghost btn--sm nav__call" href={telHref}>
              <Icon name="phone" size={16} />
              Call
            </a>
            <Magnetic>
              <button
                type="button"
                className="btn btn--gold btn--sm nav__cart"
                onClick={() => cart.setOpen(true)}
                aria-label={`Cart, ${cart.count} ${cart.count === 1 ? 'item' : 'items'}`}
              >
                <Icon name="bag" size={18} />
                Cart
                {cart.count > 0 && <span className="cart-badge">{cart.count}</span>}
              </button>
            </Magnetic>
            <button
              className="nav__toggle"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <Icon name={open ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="mobile-menu__links" aria-label="Mobile">
              {LINKS.map(([href, label], i) => (
                <span className="line-mask" key={href}>
                  <motion.a
                    href={href}
                    className="serif"
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    {label}
                  </motion.a>
                </span>
              ))}
            </nav>
            <div className="mobile-menu__foot">
              <p>{SITE.addressShort} · Daily {SITE.hours.short}</p>
              <a className="btn btn--gold" href={order} {...ext(order)} onClick={() => setOpen(false)}>
                <Icon name="chat" size={18} /> Order on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
