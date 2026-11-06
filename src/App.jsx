import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import Lenis from 'lenis'
import { LenisContext } from './hooks/index.js'
import Cursor from './components/ui/Cursor.jsx'
import Preloader from './components/ui/Preloader.jsx'
import Nav from './components/sections/Nav.jsx'
import Hero from './components/sections/Hero.jsx'
import Marquee from './components/sections/Marquee.jsx'
import Story from './components/sections/Story.jsx'
import Menu from './components/sections/Menu.jsx'
import Specials from './components/sections/Specials.jsx'
import Snacks from './components/sections/Snacks.jsx'
import Gifting from './components/sections/Gifting.jsx'
import Craft from './components/sections/Craft.jsx'
import Visit from './components/sections/Visit.jsx'
import Footer, { FloatingOrder } from './components/sections/Footer.jsx'
import { CartProvider } from './cart/cart.jsx'
import CartDrawer, { CartToast } from './components/shop/CartDrawer.jsx'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function App() {
  const [reduce] = useState(prefersReducedMotion)
  const [loading, setLoading] = useState(() => !prefersReducedMotion())
  const [lenis, setLenis] = useState(null)
  const finishLoading = useCallback(() => setLoading(false), [])

  // Smooth scrolling (skipped for reduced-motion users)
  useEffect(() => {
    if (reduce) return
    const instance = new Lenis({ duration: 1.15, autoRaf: true, anchors: { offset: -72 } })
    setLenis(instance)
    return () => {
      instance.destroy()
      setLenis(null)
    }
  }, [reduce])

  // Hold the page still while the intro plays
  useEffect(() => {
    document.documentElement.classList.toggle('is-loading', loading)
    if (!lenis) return
    if (loading) lenis.stop()
    else lenis.start()
  }, [loading, lenis])

  return (
    <MotionConfig reducedMotion="user">
      <LenisContext.Provider value={lenis}>
       <CartProvider>
        <AnimatePresence>{loading && <Preloader key="preloader" onDone={finishLoading} />}</AnimatePresence>
        <Cursor />
        <a className="skip-link" href="#menu">Skip to the menu</a>
        <Nav />
        <main>
          <Hero ready={!loading} />
          <Marquee />
          <Story />
          <Menu />
          <Specials />
          <Snacks />
          <Gifting />
          <Craft />
          <Visit />
        </main>
        <Footer />
        <FloatingOrder />
        <CartToast />
        <CartDrawer />
       </CartProvider>
      </LenisContext.Provider>
    </MotionConfig>
  )
}
