import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let pending = false
    function update() {
      pending = false
      const max = document.documentElement.scrollHeight - window.innerHeight
      setPct(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    function onScroll() {
      if (!pending) { pending = true; requestAnimationFrame(update) }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[600] h-[2px] origin-left"
      style={{
        background: `linear-gradient(to right, var(--gold-lo), var(--gold), var(--gold-hi))`,
        transform:  `scaleX(${pct / 100})`,
        transformOrigin: 'left',
        transition: 'transform .05s linear',
      }}
    />
  )
}
