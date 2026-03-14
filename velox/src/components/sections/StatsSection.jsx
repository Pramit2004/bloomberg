import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { STATS } from '@data/timeline'
import Tag from '@components/ui/Tag'
import SectionReveal from '@components/ui/SectionReveal'

function CountUp({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true
    const numTarget = parseInt(target.replace(/[^0-9]/g, ''))
    const steps = 60
    const stepVal = numTarget / steps
    let current = 0
    const interval = setInterval(() => {
      current = Math.min(current + stepVal, numTarget)
      setCount(Math.floor(current))
      if (current >= numTarget) clearInterval(interval)
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, target, duration])

  const display = target.includes(',')
    ? count.toLocaleString('en-GB')
    : count.toString()

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section
      className="relative overflow-hidden py-24"
      style={{ background: 'var(--black)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(192,154,90,.04) 0%, transparent 70%)' }}
      />
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        <SectionReveal className="text-center mb-16">
          <Tag className="justify-center mb-4">By The Numbers</Tag>
          <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(2rem,3.5vw,3rem)', color: 'var(--cream)' }}>
            A Legacy Built on <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Precision</em>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {STATS.map(({ value, label, suffix }, i) => (
            <SectionReveal key={label} delay={i * 0.12} className="text-center relative">
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-16 hidden lg:block"
                  style={{ background: 'rgba(192,154,90,.1)' }}
                />
              )}
              <span
                className="font-heading block leading-none mb-3"
                style={{ fontSize: 'clamp(2.8rem,5vw,4.5rem)', color: 'var(--gold)' }}
              >
                <CountUp target={value} suffix={suffix} />
              </span>
              <span
                className="font-body font-light tracking-[0.35em] uppercase text-[0.52rem]"
                style={{ color: 'rgba(240,233,220,.28)' }}
              >
                {label}
              </span>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
