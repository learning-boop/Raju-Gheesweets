import { motion } from 'framer-motion'
import { Img, Reveal, RevealLines } from '../ui/motion.jsx'
import { EASE } from '../../lib/motion.js'
import { SPECIALS } from '../../data/content.js'
import AddToCart from '../shop/AddToCart.jsx'

/** Each special sits in a round katori with the logo's gold double ring, with its own Add to cart. */
export default function Specials() {
  return (
    <section id="specials" className="section specials">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">03 · Andhra specials</p></Reveal>
            <RevealLines className="h2 serif" lines={['From the Godavari', <em key="e">to the Krishna.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            The Andhra sweets every festival plate expects — ask at the counter for today’s tray.
          </Reveal>
        </div>

        <ol className="specials__grid">
          {SPECIALS.map((s, i) => {
            return (
              <motion.li
                key={s.name}
                className="special"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 4) * 0.07 }}
              >
                <div className="special__link">
                  <span className="special__katori">
                    <span className="special__photo">
                      <Img img={s.img} sizes="(min-width: 900px) 220px, 40vw" />
                    </span>
                    <span className="special__no">{String(i + 1).padStart(2, '0')}</span>
                  </span>
                  <h3 className="special__name serif">{s.name}</h3>
                  <p className="special__desc">{s.desc}</p>
                  <AddToCart name={s.name} tone="dark" />
                </div>
              </motion.li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
