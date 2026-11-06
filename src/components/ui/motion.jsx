import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { imgSrc, imgSrcSet } from '../../data/images.js'
import { EASE } from '../../lib/motion.js'

/* ── <Img> — responsive, lazy, swappable for local files ───── */
export function Img({ img, sizes = '100vw', priority = false, className = '', ...rest }) {
  if (!img) return null
  return (
    <img
      src={imgSrc(img, 1200)}
      srcSet={imgSrcSet(img)}
      sizes={sizes}
      alt={img.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
      draggable="false"
      {...rest}
    />
  )
}

/* ── fade-up when scrolled into view ─────────────────────── */
export function Reveal({ as = 'div', children, delay = 0, y = 40, amount = 0.2, className = '', ...rest }) {
  const M = motion[as]
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </M>
  )
}

/* ── masked line-by-line heading reveal ──────────────────────
   The heading itself is watched (not the masked lines, which start
   clipped and so never count as "in view"). Pass `play` to drive it. */
export function RevealLines({ lines, className = '', as = 'h2', delay = 0, play }) {
  const Tag = as
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const show = play === undefined ? inView : play
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <motion.span
            className="line-inner"
            initial={{ y: '110%' }}
            animate={{ y: show ? '0%' : '110%' }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.12 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ── magnetic wrapper for buttons ────────────────────────── */
export function Magnetic({ children, strength = 0.3, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }
  return (
    <motion.span ref={ref} className={`magnetic ${className}`} style={{ x: sx, y: sy }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  )
}

/* ── 3D tilt on hover (mouse only) ───────────────────────── */
export function Tilt({ children, className = '', max = 6, ...rest }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 180, damping: 18 })
  const sry = useSpring(ry, { stiffness: 180, damping: 18 })
  const onMove = (e) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    ry.set(px * max * 2)
    rx.set(-py * max * 2)
    e.currentTarget.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }
  return (
    <motion.div
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
