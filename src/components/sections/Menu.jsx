import { useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Img, Reveal, RevealLines } from '../ui/motion.jsx'
import { EASE } from '../../lib/motion.js'
import { MENU } from '../../data/content.js'
import AddToCart from '../shop/AddToCart.jsx'
import { ext, waHref } from '../../config/site.js'

function SweetCard({ item, index }) {
  return (
    <motion.article
      layout
      className="sweet"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
    >
      <div className="sweet__inner">
        <div className="sweet__media">
          <Img img={item.img} sizes="(min-width: 1141px) 230px, (min-width: 861px) 24vw, (min-width: 601px) 31vw, 46vw" />
          <span className="sweet__tag">{item.tag}</span>
        </div>
        <div className="sweet__body">
          <h3 className="serif">{item.name}</h3>
          <p>{item.desc}</p>
          <AddToCart name={item.name} />
        </div>
      </div>
    </motion.article>
  )
}

// Fills whatever is left of the last row, at each of the grid's column counts.
function AskCard({ count }) {
  const href = waHref('Hi Raju Ghee Sweets! What sweets are fresh on the counter today?')
  const fill = (cols) => cols - (count % cols)
  return (
    <motion.article
      layout
      className="sweet sweet--ask"
      style={{ '--fill-5': fill(5), '--fill-4': fill(4), '--fill-3': fill(3), '--fill-2': fill(2) }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
    >
      <div className="sweet__inner">
        <p className="eyebrow">Not on the list?</p>
        <h3 className="serif">The counter changes with the season.</h3>
        <p>Festival specials arrive for Sankranti, Dasara and Diwali. Ask us what’s fresh today.</p>
        <a className="btn btn--ghost" href={href} {...ext(href)}>
          Ask about today’s tray
        </a>
      </div>
    </motion.article>
  )
}

export default function Menu() {
  const [active, setActive] = useState(MENU[0].id)
  const cat = MENU.find((c) => c.id === active)

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">02 · The counter</p></Reveal>
            <RevealLines className="h2 serif" lines={['Sweets, made', <em key="e">the slow way.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            Ghee classics and milk sweets, all on one counter at Vijayatakies Centre. Pick a tray to explore.
          </Reveal>
        </div>

        <LayoutGroup>
          <div className="tabs" role="tablist" aria-label="Sweet categories">
            {MENU.map((c) => (
              <button
                key={c.id}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={c.id === active}
                aria-controls={`panel-${c.id}`}
                className={`tab ${c.id === active ? 'is-active' : ''}`}
                onClick={() => setActive(c.id)}
                type="button"
              >
                {c.id === active && (
                  <motion.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                <span className="tab__label">{c.label}</span>
              </button>
            ))}
          </div>

          <div id={`panel-${cat.id}`} role="tabpanel" aria-labelledby={`tab-${cat.id}`}>
            <AnimatePresence mode="wait">
              <motion.p
                key={cat.id + '-blurb'}
                className="menu__blurb"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                {cat.blurb}
              </motion.p>
            </AnimatePresence>

            <motion.div layout className="sweets-grid">
              <AnimatePresence mode="popLayout">
                {cat.items.map((item, i) => (
                  <SweetCard key={item.name} item={item} index={i} />
                ))}
                <AskCard key={`ask-${cat.id}`} count={cat.items.length} />
              </AnimatePresence>
            </motion.div>
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
