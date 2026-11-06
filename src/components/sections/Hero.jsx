import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Icon from '../ui/Icon.jsx'
import { Magnetic, RevealLines } from '../ui/motion.jsx'
import { EASE } from '../../lib/motion.js'
import { SITE } from '../../config/site.js'
import { useOpenStatus } from '../../hooks/index.js'

const POSTER = '/video/hero-sweets-poster.jpg'

// Phones get the lighter 480p file; data-saver and reduced-motion visitors get the still frame only.
function pickVideo(reduce) {
  if (typeof window === 'undefined' || reduce) return null
  if (navigator.connection?.saveData) return null
  return window.matchMedia('(max-width: 760px)').matches ? '/video/hero-sweets-480.mp4' : '/video/hero-sweets-720.mp4'
}

function HeroVideo({ ready }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [src] = useState(() => pickVideo(reduce))

  // start once the intro curtain has lifted, so the first seconds aren't spent behind it
  useEffect(() => {
    if (ready && ref.current) ref.current.play().catch(() => {})
  }, [ready, src])

  if (!src) return <img src={POSTER} alt="" />
  return <video ref={ref} src={src} poster={POSTER} muted loop playsInline preload="auto" aria-hidden="true" />
}

const fadeUp = (ready, delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
  transition: { duration: 0.9, ease: EASE, delay },
})

export default function Hero({ ready }) {
  const ref = useRef(null)
  const open = useOpenStatus()

  return (
    <section id="top" ref={ref} className="hero">
      <motion.div
        className="hero__video"
        initial={{ scale: 1.08 }}
        animate={ready ? { scale: 1 } : {}}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <HeroVideo ready={ready} />
      </motion.div>
      <div className="hero__fade" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.div className="pill" {...fadeUp(ready, 0.1)}>
            <span className={`live-dot ${open ? '' : 'is-off'}`} />
            <strong>{open ? 'Open now' : 'Opens 9 AM'}</strong>
            <span aria-hidden="true">·</span>
            <span>Daily {SITE.hours.short}</span>
          </motion.div>

          <motion.p className="hero__te te" {...fadeUp(ready, 0.2)}>
            {SITE.nameTe} · {SITE.cityTe}
          </motion.p>

          <RevealLines
            as="h1"
            className="hero__title serif"
            play={ready}
            delay={0.25}
            lines={[
              'Pure ghee.',
              'Slow fire.',
              <em key="sub">Sweets worth the wait.</em>,
            ]}
          />

          <motion.p className="hero__lead" {...fadeUp(ready, 0.7)}>
            Traditional Andhra mithai, ghee classics and crisp savouries from the heart of Vijayawada —
            for festivals, functions and every evening craving.
          </motion.p>

          <motion.div className="hero__ctas" {...fadeUp(ready, 0.85)}>
            <Magnetic>
              <a className="btn btn--gold" href="#menu">
                Explore the counter <Icon name="arrow" size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn--ghost" href="#gifting">
                Order for an occasion
              </a>
            </Magnetic>
          </motion.div>

          <motion.p className="hero__where" {...fadeUp(ready, 1)}>
            <Icon name="pin" size={18} /> {SITE.addressShort}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
