import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Img, Reveal } from '../ui/motion.jsx'
import { PILLARS } from '../../data/content.js'
import { SITE } from '../../config/site.js'

// *word* = highlighted in gold
const STORY =
  'At Raju Ghee Sweets, ghee is never an afterthought. It’s where every sweet begins — *besan* *roasted* *till* *it* *smells* *like* *home,* syrup pulled to a single string, and recipes Vijayawada has grown up on.'

function Word({ children, progress, range, gold }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return (
    <span className={`sw ${gold ? 'is-gold' : ''}`}>
      <motion.span style={{ opacity }}>{children}</motion.span>{' '}
    </span>
  )
}

function ScrollText({ text }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className="story__text serif" aria-label={text.replaceAll('*', '')}>
      {words.map((w, i) => {
        const gold = w.startsWith('*')
        const start = i / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]} gold={gold}>
            {w.replaceAll('*', '')}
          </Word>
        )
      })}
    </p>
  )
}

export default function Story() {
  return (
    <section id="story" className="section story">
      <div className="container">
        <div className="story__grid">
          <aside className="story__aside">
            <Reveal>
              <p className="eyebrow">01 · Our promise</p>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="chip">
                {SITE.since ? `Serving Vijayawada since ${SITE.since}` : 'Serving Vijayawada since [year]'}
              </span>
            </Reveal>
          </aside>
          <ScrollText text={STORY} />
        </div>

        <div className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal className="pillar" key={p.title} delay={i * 0.1}>
              <span className="pillar__photo"><Img img={p.img} sizes="160px" /></span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
