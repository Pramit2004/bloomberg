import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { slideUp, fadeUp } from '@utils/motionVariants'

export default function HeroSection() {
  const imgRef  = useRef(null)
  const mouse   = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const ready   = useRef(false)
  const [loaded, setLoaded] = useState(false)

  // Mouse parallax on hero image
  useEffect(() => {
    const onMove = e => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) *  9,
      }
    }
    if (window.matchMedia('(hover: hover)').matches) {
      window.addEventListener('mousemove', onMove, { passive: true })
    }
    // Wait for hero animation to finish before enabling mouse parallax
    const t = setTimeout(() => { ready.current = true }, 3800)

    let raf
    const loop = () => {
      if (ready.current && imgRef.current) {
        current.current.x += (mouse.current.x - current.current.x) * 0.04
        current.current.y += (mouse.current.y - current.current.y) * 0.04
        imgRef.current.style.transform =
          `scale(1.04) translate(${current.current.x}px, ${current.current.y}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(t)
    }
  }, [])

  return (
    <section
      className="relative flex items-end overflow-hidden"
      style={{ height: '100svh', minHeight: 620 }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          srcSet="
            https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fit=crop&crop=center&auto=format&fm=webp 800w,
            https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=82&fit=crop&crop=center&auto=format&fm=webp 1400w,
            https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&q=84&fit=crop&crop=center&auto=format&fm=webp 1920w
          "
          sizes="100vw"
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=82&fit=crop&crop=center&auto=format"
          alt="Velox Atreo X — 680hp Supercar"
          className="w-full object-cover will-change-transform"
          style={{
            height: '115%',
            objectPosition: 'center 58%',
            filter: loaded ? 'brightness(0.5) contrast(1.06) saturate(0.9)' : 'brightness(0)',
            transform: 'scale(1.04) translate3d(0,0,0)',
            animation: loaded ? 'heroReveal 1.6s 0.5s cubic-bezier(0.22,1,0.36,1) both' : 'none',
            transition: 'filter 0.5s ease',
          }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(105deg, rgba(5,5,5,.92) 0%, rgba(5,5,5,.58) 36%, rgba(5,5,5,.1) 60%, transparent 100%),
            linear-gradient(to top, rgba(5,5,5,.96) 0%, rgba(5,5,5,.4) 20%, transparent 50%)
          `,
        }}
      />

      {/* Side labels — desktop only */}
      <span
        className="absolute z-20 font-body text-[0.48rem] font-medium tracking-[0.52em] uppercase hidden lg:block"
        style={{ color: 'rgba(240,233,220,0.16)', writingMode: 'vertical-lr', left: '1.6rem', bottom: '4.5rem', transform: 'rotate(180deg)' }}
      >
        Est. Milano · Italy · 1962
      </span>
      <span
        className="absolute z-20 font-body text-[0.48rem] font-medium tracking-[0.52em] uppercase hidden lg:block"
        style={{ color: 'rgba(240,233,220,0.16)', writingMode: 'vertical-lr', right: '1.6rem', top: '50%', transform: 'translateY(-50%)' }}
      >
        Atreo Collection · 2025
      </span>

      {/* Content */}
      <div className="relative z-30 w-full px-6 pb-16 md:px-16 md:pb-24 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        {/* Left */}
        <div className="max-w-xl">
          <motion.div
            className="inline-flex items-center gap-3 mb-4 font-body font-semibold tracking-[0.6em] uppercase text-[0.54rem]"
            style={{ color: 'var(--gold)' }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 1.8 } }}
          >
            <span style={{ width: 28, height: 1, background: 'var(--gold)', display: 'inline-block' }} />
            Velox Atreo X — 2025 Edition
          </motion.div>

          <div className="title-clip">
            <motion.h1
              className="font-heading leading-none tracking-[0.025em]"
              style={{ fontSize: 'clamp(4.5rem, 10.5vw, 10.5rem)', color: 'var(--cream)' }}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={2.0}
            >
              PURE
            </motion.h1>
          </div>
          <div className="title-clip">
            <motion.div
              className="font-display font-light italic"
              style={{ fontSize: 'clamp(1.6rem, 3.8vw, 3.6rem)', color: 'var(--gold-hi)', lineHeight: 1.1 }}
              variants={slideUp}
              initial="hidden"
              animate="visible"
              custom={2.15}
            >
              Velocity Perfected.
            </motion.div>
          </div>

          <motion.p
            className="font-body font-light tracking-[0.05em] leading-relaxed mt-5"
            style={{ fontSize: 'clamp(0.8rem, 1.4vw, 0.92rem)', color: 'var(--dim)', maxWidth: 420, lineHeight: 2 }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2.5}
          >
            680 horsepower. Twin-turbocharged. Hand-assembled in Milan. The Atreo X is not a machine — it is a philosophy made physical.
          </motion.p>
        </div>

        {/* Right */}
        <motion.div
          className="flex flex-col gap-5 items-start md:items-end flex-shrink-0"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2.7}
        >
          <Link
            to="/models"
            className="group flex items-center gap-4 font-heading text-[1rem] tracking-[0.18em] transition-all duration-300 hover:gap-6"
            style={{ color: 'var(--gold)' }}
          >
            Explore Models
            <span className="relative inline-block h-px bg-[var(--gold)] transition-all duration-300 group-hover:w-[68px]" style={{ width: 46 }}>
              <span className="absolute right-0 top-[-3px]"
                style={{ borderTop: '3px solid transparent', borderBottom: '3px solid transparent', borderLeft: '6px solid var(--gold)' }} />
            </span>
          </Link>
          <div className="flex items-center gap-3 font-body font-medium tracking-[0.5em] uppercase text-[0.48rem]"
            style={{ color: 'rgba(240,233,220,0.22)' }}>
            <span className="w-[5px] h-[5px] rounded-full animate-blink" style={{ background: 'var(--gold)' }} />
            Scroll to discover
          </div>
        </motion.div>
      </div>
    </section>
  )
}
