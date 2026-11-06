import { useRef } from 'react'
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from 'framer-motion'
import { Img } from '../ui/motion.jsx'
import { MARQUEE } from '../../data/content.js'

/** A row that drifts on its own and speeds up / reverses with scroll velocity. */
function VelocityRow({ children, baseVelocity = -2 }) {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useVelocity(scrollY)
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const direction = useRef(1)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * baseVelocity * (delta / 1000)
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    moveBy += direction.current * moveBy * f
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="vrow">
      <motion.div className="vrow__track" style={{ x }}>
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const row = (
    <div className="vrow__set">
      {MARQUEE.map((m, i) => (
        <span className="vrow__item" key={m.name}>
          <span className={`serif ${i % 2 ? 'is-italic' : ''}`}>{m.name}</span>
          <span className="vrow__thumb">
            <Img img={m.img} sizes="120px" alt="" />
          </span>
        </span>
      ))}
    </div>
  )
  return (
    <section className="marquee" aria-label="From our counter">
      <VelocityRow baseVelocity={-2.2}>{row}</VelocityRow>
    </section>
  )
}
