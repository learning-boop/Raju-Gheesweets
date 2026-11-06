import { useLayoutEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Img, Reveal, RevealLines } from '../ui/motion.jsx'
import { SNACKS } from '../../data/content.js'
import AddToCart from '../shop/AddToCart.jsx'
import { useMedia } from '../../hooks/index.js'

function SnackCard({ s }) {
  // `focus` zooms in on the snack when the photo shows more than the food
  const crop = s.focus && { objectPosition: s.focus.at, transformOrigin: s.focus.at, scale: s.focus.zoom }
  return (
    <article className="snack">
      <div className="snack__media">
        <Img img={s.img} sizes={s.focus ? '520px' : '260px'} style={crop || undefined} />
      </div>
      <div className="snack__body">
        <h3 className="serif">{s.name}</h3>
        <p>{s.desc}</p>
        <div className="snack__notes">{s.notes.map((n) => <span key={n}>{n}</span>)}</div>
        <AddToCart name={s.name} />
      </div>
    </article>
  )
}

export default function Snacks() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const viewportRef = useRef(null)
  const distRef = useRef(0)
  const [dist, setDist] = useState(0)
  const reduce = useReducedMotion()
  // The pinned, scroll-sideways row needs the heading, cards and footer to fit in one screen.
  // Shorter screens (small laptops, zoomed browsers) get a normal row with arrow buttons instead,
  // so nothing is ever cut off.
  const roomy = useMedia('(min-width: 960px) and (min-height: 720px)')
  const pinned = roomy && !reduce

  const nudge = (dir) => {
    const v = viewportRef.current
    const card = v?.querySelector('.snack')
    if (!v || !card) return
    v.scrollBy({ left: dir * (card.offsetWidth + 22) * 2, behavior: reduce ? 'auto' : 'smooth' })
  }

  useLayoutEffect(() => {
    if (!pinned) return
    const measure = () => {
      const t = trackRef.current
      if (!t) return
      const d = Math.max(0, t.scrollWidth - window.innerWidth + 48)
      distRef.current = d
      setDist(d)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(trackRef.current)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [pinned])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const x = useTransform(smooth, (v) => -v * distRef.current)
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      id="snacks"
      ref={sectionRef}
      className={`snacks ${pinned ? 'is-pinned' : ''}`}
      style={pinned ? { height: `calc(100vh + ${dist}px)` } : undefined}
    >
      <div className="snacks__sticky">
        <div className="container section-head snacks__head">
          <div>
            <Reveal><p className="eyebrow eyebrow--dark">04 · The savoury side</p></Reveal>
            <RevealLines className="h2 serif" lines={['Hots that', <em key="e">crunch back.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            No sweet box in Andhra travels alone. Fried crisp, seasoned generously and packed by weight — ready to
            sit beside the laddus.
          </Reveal>
        </div>

        <div className="snacks__viewport" ref={viewportRef} data-lenis-prevent-wheel={pinned ? undefined : ''}>
          <motion.div ref={trackRef} className="snacks__track" style={pinned ? { x } : undefined}>
            {SNACKS.map((s) => (
              <SnackCard key={s.name} s={s} />
            ))}
          </motion.div>
        </div>

        <div className="container snacks__foot">
          {pinned ? (
            <div className="snacks__progress" aria-hidden="true">
              <motion.span style={{ scaleX: bar }} />
            </div>
          ) : (
            <div className="snacks__nav">
              <button type="button" className="snacks__arrow" onClick={() => nudge(-1)} aria-label="Previous snacks">
                <Icon name="arrow" size={18} style={{ transform: 'scaleX(-1)' }} />
              </button>
              <button type="button" className="snacks__arrow" onClick={() => nudge(1)} aria-label="More snacks">
                <Icon name="arrow" size={18} />
              </button>
              <span className="snacks__hint">Swipe for more</span>
            </div>
          )}
          <a className="btn btn--dark" href="#gifting">Mix sweets and hots in one box</a>
        </div>
      </div>
    </section>
  )
}
