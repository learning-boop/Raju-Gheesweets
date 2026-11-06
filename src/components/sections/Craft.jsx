import { useState } from 'react'
import { Img, Reveal, RevealLines } from '../ui/motion.jsx'
import { STEPS } from '../../data/content.js'

/**
 * Four tall photo panels. On desktop the active one widens to tell its step;
 * hovering, focusing or tapping a panel makes it active. On phones they stack.
 */
export default function Craft() {
  const [active, setActive] = useState(0)

  return (
    <section id="craft" className="section craft">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">06 · The craft</p></Reveal>
            <RevealLines className="h2 serif" lines={['From ghee', <em key="e">to gift box.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            Four steps every tray goes through before it reaches the counter.
          </Reveal>
        </div>

        <Reveal as="ol" className="panels" amount={0.2}>
          {STEPS.map((s, i) => (
            <li key={s.no} className={`panel ${i === active ? 'is-active' : ''}`} onMouseEnter={() => setActive(i)}>
              <button
                type="button"
                className="panel__btn"
                aria-expanded={i === active}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                <span className="panel__media">
                  <Img img={s.img} sizes="(min-width: 860px) 640px, 92vw" />
                </span>
                <span className="panel__shade" aria-hidden="true" />
                <span className="panel__no serif">{s.no}</span>
                <span className="panel__label">{s.title}</span>
                <span className="panel__body">
                  <span className="panel__title serif">{s.title}</span>
                  <span className="panel__text">{s.text}</span>
                </span>
              </button>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
