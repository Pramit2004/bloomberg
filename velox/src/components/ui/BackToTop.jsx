import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { getLenis } from '@hooks/useLenis'

/**
 * BackToTop — appears after scrolling 600px, smoothly scrolls back to top.
 * Uses Lenis if available, falls back to native scroll.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false)
  const prefersReduced  = useReducedMotion()

  useEffect(() => {
    let pending = false
    const onScroll = () => {
      if (!pending) {
        pending = true
        requestAnimationFrame(() => {
          setShow(window.scrollY > 600)
          pending = false
        })
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    const lenis = getLenis()
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 })
    } else {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="btt"
          onClick={scrollTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22,1,0.36,1] } }}
          exit={{    opacity: 0, y: 16, transition: { duration: 0.3 } }}
          whileHover={{ scale: 1.05 }}
          whileTap={{   scale: 0.95 }}
          className="fixed bottom-8 right-8 z-[1000] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] group"
          style={{
            width:      48,
            height:     48,
            background: 'var(--ink)',
            border:     '1px solid rgba(192,154,90,.3)',
          }}
        >
          {/* Arrow up */}
          <svg
            width="16" height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            style={{
              stroke: 'var(--gold)',
              strokeWidth: 1.5,
              transition: 'transform 0.3s',
            }}
            className="group-hover:-translate-y-0.5 transition-transform duration-300"
          >
            <polyline points="3,10 8,5 13,10" />
          </svg>

          {/* Circular progress ring */}
          <CircleProgress />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function CircleProgress() {
  const [pct, setPct] = useState(0)
  const r  = 22
  const c  = 2 * Math.PI * r
  const dash = c - (pct / 100) * c

  useEffect(() => {
    let pending = false
    const update = () => {
      pending = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    const onScroll = () => { if (!pending) { pending = true; requestAnimationFrame(update) } }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <svg
      width="48" height="48"
      viewBox="0 0 48 48"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
    >
      <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(192,154,90,.1)" strokeWidth="1" />
      <circle
        cx="24" cy="24" r={r}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1"
        strokeDasharray={c}
        strokeDashoffset={dash}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.1s linear' }}
      />
    </svg>
  )
}
