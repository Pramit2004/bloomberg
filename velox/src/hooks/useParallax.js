import { useEffect, useRef } from 'react'

/**
 * useParallax — attaches GPU-accelerated scroll parallax to a ref element.
 * @param {number} speed  0 = no movement, 1 = full scroll speed. 0.25 is typical.
 * @returns {ref}         attach to the wrapper element (not the image itself)
 */
export function useParallax(speed = 0.25) {
  const ref    = useRef(null)
  const rectRef = useRef(null)
  const rafRef  = useRef(null)
  let pending  = false

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function cacheRect() {
      const r = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect()
      rectRef.current = {
        top:    r.top + window.scrollY,
        height: r.height,
      }
    }

    function update() {
      pending = false
      const rect = rectRef.current
      if (!rect) return
      const vh     = window.innerHeight
      const secTop = rect.top - window.scrollY
      if (secTop > vh || secTop + rect.height < 0) return
      const offset = (vh / 2 - secTop - rect.height / 2) * speed
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    function onScroll() {
      if (!pending) { pending = true; rafRef.current = requestAnimationFrame(update) }
    }

    cacheRect()
    const ro = new ResizeObserver(cacheRect)
    ro.observe(document.body)

    window.addEventListener('scroll', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      ro.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [speed])

  return ref
}
