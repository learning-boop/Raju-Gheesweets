import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * A soft gold ring that trails the pointer (desktop only).
 * - grows over links/buttons
 * - shows a label over anything with data-cursor="Label"
 * The native cursor stays visible, so nothing is lost for accessibility.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [state, setState] = useState({ variant: 'default', label: '' })
  const x = useMotionValue(-200)
  const y = useMotionValue(-200)
  const sx = useSpring(x, { stiffness: 420, damping: 38, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 420, damping: 38, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      const labelled = e.target.closest('[data-cursor]')
      if (labelled) return setState({ variant: 'label', label: labelled.dataset.cursor })
      const link = e.target.closest('a, button, [role="button"], input, label')
      setState({ variant: link ? 'link' : 'default', label: '' })
    }
    const onLeave = () => {
      x.set(-200)
      y.set(-200)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerover', onOver)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [x, y])

  if (!enabled) return null
  return (
    <motion.div className={`cursor cursor--${state.variant}`} style={{ x: sx, y: sy }} aria-hidden="true">
      <span className="cursor__ring" />
      <span className="cursor__label">{state.label}</span>
    </motion.div>
  )
}
