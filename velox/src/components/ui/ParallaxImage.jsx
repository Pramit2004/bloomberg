import { useParallax } from '@hooks/useParallax'

/**
 * ParallaxImage — full-coverage background image with GPU parallax.
 * Parent must have position:relative and overflow:hidden.
 */
export default function ParallaxImage({ src, alt = '', speed = 0.25, brightness = 0.38, className = '' }) {
  const ref = useParallax(speed)

  return (
    <div
      ref={ref}
      className="absolute will-change-transform"
      style={{ inset: '-22%' }}
    >
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        style={{ filter: `brightness(${brightness}) contrast(1.1) saturate(0.75)` }}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}
