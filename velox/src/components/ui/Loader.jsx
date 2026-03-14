import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoaderStore } from '@hooks/useLoaderStore'

export default function Loader() {
  const [pct, setPct] = useState(0)
  const finish = useLoaderStore(s => s.finish)
  const done   = useLoaderStore(s => s.done)

  useEffect(() => {
    // Track all images on the page
    const imgs  = [...document.querySelectorAll('img')]
    let loaded  = 0
    const total = imgs.length || 1

    function tick() {
      loaded++
      const p = Math.min(Math.round((loaded / total) * 100), 100)
      setPct(p)
      if (loaded >= total) {
        setTimeout(finish, 400)
      }
    }

    imgs.forEach(img => {
      if (img.complete && img.naturalWidth > 0) { tick(); return }
      img.addEventListener('load',  tick, { once: true, passive: true })
      img.addEventListener('error', tick, { once: true, passive: true })
    })

    // Hard cap — never block more than 3s
    const fallback = setTimeout(() => { setPct(100); finish() }, 3000)
    return () => clearTimeout(fallback)
  }, [finish])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9900] flex flex-col items-center justify-center gap-8"
          style={{ background: 'var(--black)' }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
        >
          {/* Logo */}
          <motion.span
            className="font-heading text-5xl tracking-[0.55em]"
            style={{ color: 'var(--gold)' }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1 } }}
          >
            VELOX
          </motion.span>

          {/* Progress bar */}
          <div className="w-44 h-px overflow-hidden" style={{ background: 'rgba(192,154,90,.15)' }}>
            <div
              className="h-full transition-all duration-75 ease-linear"
              style={{ width: `${pct}%`, background: 'var(--gold)' }}
            />
          </div>

          {/* Percentage */}
          <span
            className="font-body text-[0.5rem] font-medium tracking-[0.45em]"
            style={{ color: 'var(--gold-lo)' }}
          >
            {pct}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
