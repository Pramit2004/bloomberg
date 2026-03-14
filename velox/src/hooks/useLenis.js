import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis = null

export function useLenis() {
  useEffect(() => {
    // Respect OS "prefers-reduced-motion" — disable smooth scroll if set
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return // let native scroll handle it

    lenis = new Lenis({
      duration:    1.2,
      easing:      (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth:      true,
      smoothTouch: false, // native scroll on touch devices
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      lenis = null
    }
  }, [])
}

export function getLenis() { return lenis }
