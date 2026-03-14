import { useEffect, useRef, useState } from 'react'
import { useCursorStore } from '@hooks/useCursorStore'

/**
 * Cursor — custom gold cursor for desktop pointer devices.
 *
 * FIX: We can't call matchMedia during SSR/first-render, so we use a
 * lazy useState initialiser that runs synchronously on the client.
 * This means `show` is correct on first render — no flash, no missing cursor.
 *
 * Mobile/touch: returns null entirely. CSS cursor:none only applied when
 * this component confirms it's a pointer device.
 */

function detectPointer() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches
}

export default function Cursor() {
  // Lazy initialiser runs sync on client — correct value on first render
  const [show]  = useState(() => detectPointer())
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: -200, y: -200 })
  const ring    = useRef({ x: -200, y: -200 })
  const raf     = useRef(null)
  const visible = useRef(false)
  const { hovering, label } = useCursorStore()

  // Inject cursor:none ONLY when custom cursor is active
  useEffect(() => {
    if (!show) return
    const style = document.createElement('style')
    style.id = 'velox-cursor-style'
    style.textContent = `
      body, a, button, [role="button"], input, textarea, select, label {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)
    return () => document.getElementById('velox-cursor-style')?.remove()
  }, [show])

  // Animation loop
  useEffect(() => {
    if (!show) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible.current) {
        visible.current = true
        if (dotRef.current)  dotRef.current.style.opacity = '1'
        if (ringRef.current) ringRef.current.style.opacity = '1'
      }
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const loop = () => {
      const { x, y } = mouse.current
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%)`
      }
      ring.current.x += (x - ring.current.x) * 0.1
      ring.current.y += (y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`
      }
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf.current)
    }
  }, [show])

  if (!show) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top: 0, left: 0,
          zIndex:        9800,
          pointerEvents: 'none',
          borderRadius:  '50%',
          willChange:    'transform',
          background:    'var(--gold)',
          width:         hovering ? 5 : 8,
          height:        hovering ? 5 : 8,
          opacity:       0,
          transition:    'width .15s ease, height .15s ease',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:       'fixed',
          top: 0, left: 0,
          zIndex:         9799,
          pointerEvents:  'none',
          borderRadius:   '50%',
          willChange:     'transform',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          width:          hovering ? 58 : 36,
          height:         hovering ? 58 : 36,
          border:         hovering
            ? '1px solid var(--gold)'
            : '1px solid rgba(192,154,90,.36)',
          opacity:        0,
          transition:     'width .22s cubic-bezier(.22,1,.36,1), height .22s cubic-bezier(.22,1,.36,1), border-color .22s',
        }}
      >
        {hovering && label && (
          <span style={{
            fontFamily:    "'Montserrat',sans-serif",
            fontSize:      '0.38rem',
            fontWeight:    600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         'var(--gold)',
            whiteSpace:    'nowrap',
          }}>
            {label}
          </span>
        )}
      </div>
    </>
  )
}
