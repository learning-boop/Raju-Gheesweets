import { createContext, useContext, useEffect, useState } from 'react'
import { SITE } from '../config/site.js'

/* ── media query ─────────────────────────────────────────── */
export function useMedia(query, fallback = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === 'undefined' ? fallback : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = () => setMatches(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [query])
  return matches
}

/* ── open / closed, calculated in India time ─────────────── */
function istHour() {
  const now = new Date()
  const ist = new Date(now.getTime() + (now.getTimezoneOffset() + 330) * 60000)
  return ist.getHours() + ist.getMinutes() / 60
}
const isOpenNow = () => {
  const h = istHour()
  return h >= SITE.hours.open && h < SITE.hours.close
}
export function useOpenStatus() {
  const [open, setOpen] = useState(isOpenNow)
  useEffect(() => {
    const id = setInterval(() => setOpen(isOpenNow()), 60_000)
    return () => clearInterval(id)
  }, [])
  return open
}

/* ── Lenis instance shared through context ───────────────── */
export const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)
