import Icon from '../ui/Icon.jsx'
import { Img, Magnetic, Reveal, RevealLines } from '../ui/motion.jsx'
import { GIFTING, GIFT_STEPS } from '../../data/content.js'
import { ext, waHref } from '../../config/site.js'

/** A gift card: photo wrapped in a crimson-and-gold ribbon, with a hanging gift tag. */
function GiftCard({ data, icon, featured = false, delay = 0 }) {
  const href = waHref(`Hi Raju Ghee Sweets! I'd like to enquire about: ${data.eyebrow}.`)
  return (
    <Reveal className={`giftcard ${featured ? 'giftcard--featured' : ''}`} delay={delay} amount={0.15}>
      <a href={href} {...ext(href)} className="giftcard__link" data-cursor="Enquire">
        <div className="giftcard__media">
          <Img img={data.img} sizes={featured ? '(min-width: 900px) 700px, 92vw' : '(min-width: 900px) 400px, 92vw'} />
          <span className="giftcard__ribbon" aria-hidden="true" />
          <span className="giftcard__tag">
            <Icon name={icon} size={15} /> {data.eyebrow}
          </span>
        </div>
        <div className="giftcard__body">
          <h3 className="serif">{data.title}</h3>
          <p>{data.text}</p>
          {data.chips && (
            <ul className="giftcard__chips" aria-label="Festivals">
              {data.chips.map((c) => <li key={c}>{c}</li>)}
            </ul>
          )}
          <span className="giftcard__cta">
            {data.cta} <Icon name="arrowUpRight" size={16} />
          </span>
        </div>
      </a>
    </Reveal>
  )
}

export default function Gifting() {
  const wa = waHref('Hi Raju Ghee Sweets! I would like to plan a gift box.')
  return (
    <section id="gifting" className="section gifting">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">05 · Gifting &amp; orders</p></Reveal>
            <RevealLines className="h2 serif" lines={['Boxes for', <em key="e">every occasion.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            From a single box for a home visit to trays for a wedding hall — sweets and hots packed for every
            occasion Vijayawada celebrates.
          </Reveal>
        </div>

        <div className="giftgrid">
          <GiftCard data={GIFTING.festival} icon="box" featured />
          <GiftCard data={GIFTING.functions} icon="kalash" delay={0.05} />
          <GiftCard data={GIFTING.corporate} icon="briefcase" delay={0.1} />
          <GiftCard data={GIFTING.combo} icon="bowl" delay={0.15} />
        </div>

        <Reveal className="giftsteps" amount={0.3}>
          <h3 className="giftsteps__title serif">How a gift box comes together</h3>
          <ol className="giftsteps__list">
            {GIFT_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="giftsteps__no serif">{i + 1}</span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
          <div className="giftsteps__ctas">
            <Magnetic>
              <a className="btn btn--gold" href={wa} {...ext(wa)}>
                <Icon name="chat" size={18} /> Plan a gift box on WhatsApp
              </a>
            </Magnetic>
            <a className="btn btn--ghost" href="#menu">Choose sweets from the menu</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
