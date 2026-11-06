import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from './Icon.jsx'
import { SITE } from '../../config/site.js'
import { EASE_IN_OUT } from '../../lib/motion.js'

/** Short branded intro: logo + counter, then a curtain lifts. */
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let n = 0
    let done = false
    const id = setInterval(() => {
      n = Math.min(100, n + Math.max(1, Math.ceil((100 - n) / 8)))
      setCount(n)
      if (n >= 100 && !done) {
        done = true
        clearInterval(id)
        setTimeout(onDone, 300)
      }
    }, 40)
    return () => clearInterval(id)
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      transition={{ duration: 1, ease: EASE_IN_OUT }}
      role="status"
      aria-label="Loading Raju Ghee Sweets"
    >
      <motion.div
        className="preloader__mark"
        initial={{ scale: 0.6, opacity: 0, y: -30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Logo height={201} />
      </motion.div>
      <motion.p className="preloader__te te" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        {SITE.nameTe}
      </motion.p>
      <div className="preloader__bar">
        <span style={{ transform: `scaleX(${count / 100})` }} />
      </div>
      <span className="preloader__count serif" aria-hidden="true">
        {String(count).padStart(3, '0')}
      </span>
    </motion.div>
  )
}
