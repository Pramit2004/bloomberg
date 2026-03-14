import { useEffect, useRef } from 'react'

/**
 * useReveal — adds .visible class when element enters viewport.
 * Combine with .rv CSS class for the transition.
 */
export function useReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          io.unobserve(el)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px', ...options }
    )

    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
