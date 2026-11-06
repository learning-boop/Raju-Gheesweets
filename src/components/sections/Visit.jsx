import Icon from '../ui/Icon.jsx'
import { Reveal, RevealLines } from '../ui/motion.jsx'
import { SITE, ext, phoneLabel, telHref } from '../../config/site.js'
import { useOpenStatus } from '../../hooks/index.js'

function MapArt() {
  return (
    <svg className="map" viewBox="0 0 640 520" role="img" aria-label="Illustrative map: main store at Vijayatakies Centre, branches on MG Road and Eluru Road">
      <defs>
        <pattern id="map-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" className="map__grid" />
        </pattern>
      </defs>
      <rect width="640" height="520" className="map__bg" />
      <rect width="640" height="520" fill="url(#map-grid)" />
      <path className="map__river" d="M-40 470 C 100 432, 200 500, 330 456 S 540 396, 690 420" />
      <text className="map__river-label" x="56" y="506">Krishna River</text>
      <path className="map__road map__road--thin" d="M30 150 L 620 210" />
      <path className="map__road map__road--thin" d="M200 40 L 560 470" />
      <path className="map__rail" d="M150 -10 C 190 160, 230 300, 250 530" />
      <path className="map__road" d="M-10 300 C 160 282, 320 262, 650 330" />
      <path className="map__road" d="M300 262 C 360 190, 450 120, 650 54" />
      <text className="map__road-label" x="560" y="350" transform="rotate(12 560 350)">MG ROAD</text>
      <text className="map__road-label" x="520" y="86" transform="rotate(-20 520 86)">ELURU ROAD</text>
      <rect className="map__stn" x="188" y="196" width="16" height="16" rx="4" />
      <text className="map__label" x="68" y="188">Vijayawada Jn.</text>

      {[
        { x: 520, y: 300, r: 7, tag: { x: 462, y: 232, w: 116, label: 'MG Road' } },
        { x: 420, y: 166, r: 7, tag: { x: 300, y: 112, w: 116, label: 'Eluru Road' } },
      ].map((p) => (
        <g key={p.tag.label}>
          <circle className="map__pulse" cx={p.x} cy={p.y} r={p.r} />
          <circle className="map__pin" cx={p.x} cy={p.y} r={p.r} />
          <circle className="map__core" cx={p.x} cy={p.y} r="3" />
          <rect className="map__tag" x={p.tag.x} y={p.tag.y} width={p.tag.w} height="30" rx="8" />
          <text className="map__tag-text" x={p.tag.x + p.tag.w / 2} y={p.tag.y + 20} textAnchor="middle">{p.tag.label}</text>
        </g>
      ))}

      <circle className="map__pulse" cx="300" cy="266" r="11" />
      <circle className="map__pin" cx="300" cy="266" r="11" />
      <circle className="map__core" cx="300" cy="266" r="4.5" />
      <rect className="map__tag" x="214" y="300" width="176" height="46" rx="10" />
      <text className="map__tag-kicker" x="230" y="319">MAIN STORE</text>
      <text className="map__tag-text" x="230" y="337">Vijayatakies Centre</text>

      <g transform="translate(596 44)">
        <circle className="map__compass" r="20" />
        <path className="map__north" d="M0 -12 L6 6 L0 2 L-6 6 Z" />
      </g>
    </svg>
  )
}

export default function Visit() {
  const open = useOpenStatus()
  return (
    <section id="visit" className="section visit">
      <div className="container">
        <div className="section-head">
          <div>
            <Reveal><p className="eyebrow">07 · Visit us</p></Reveal>
            <RevealLines className="h2 serif" lines={['Find us at', <em key="e">Vijayatakies Centre.</em>]} />
          </div>
          <Reveal as="p" className="section-head__lead" delay={0.15}>
            In the heart of Governor Peta, a short ride from Vijayawada Junction — with branches on MG Road and Eluru
            Road.
          </Reveal>
        </div>

        <div className="visit__grid">
          <div className="visit__cards">
            <Reveal className="card store">
              <div className="store__top">
                <p className="eyebrow">Main store</p>
                <span className="status">
                  <span className={`live-dot ${open ? '' : 'is-off'}`} />
                  {open ? 'Open now · until 10 PM' : 'Closed · opens 9 AM'}
                </span>
              </div>
              <h3 className="serif">{SITE.name}</h3>
              <p className="info"><Icon name="pin" /> <span>{SITE.address}</span></p>
              <p className="info"><Icon name="clock" /> <span>Open every day, {SITE.hours.label}</span></p>
              <p className="info"><Icon name="phone" /> <span>{phoneLabel}</span></p>
              <div className="store__ctas">
                <a className="btn btn--gold" href={SITE.mapsUrl} {...ext(SITE.mapsUrl)}>
                  Get directions <Icon name="arrowUpRight" size={18} />
                </a>
                <a className="btn btn--ghost" href={telHref}>Call the store</a>
              </div>
            </Reveal>
            <div className="branches">
              {SITE.branches.map((b, i) => (
                <Reveal className="card branch" key={b.name} delay={0.08 * (i + 1)}>
                  <p className="eyebrow">Branch</p>
                  <h3 className="serif">{b.name}</h3>
                  <p>{b.address || '[Branch address]'}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal as="figure" className="map-card" delay={0.1}>
            <MapArt />
            <figcaption>Illustrative map — not to scale.</figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
