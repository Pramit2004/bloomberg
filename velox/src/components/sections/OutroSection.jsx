import { Link } from 'react-router-dom'
import ParallaxImage from '@components/ui/ParallaxImage'
import SectionReveal from '@components/ui/SectionReveal'

export default function OutroSection() {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center text-center"
      style={{ height: '90vh', minHeight: 560 }}
    >
      <ParallaxImage
        src="https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=1600&q=78&fit=crop&crop=center&auto=format"
        alt="Velox outro"
        speed={0.2}
        brightness={0.22}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(5,5,5,.38)' }} />

      <div className="relative z-10 px-6">
        <SectionReveal>
          <span className="font-body font-semibold tracking-[0.6em] uppercase text-[0.52rem] block mb-5" style={{ color: 'var(--gold)' }}>
            Your Velox Awaits
          </span>
        </SectionReveal>
        <SectionReveal delay={0.12}>
          <span
            className="font-heading block leading-[0.88] tracking-[0.04em] mb-4"
            style={{ fontSize: 'clamp(4rem,9.5vw,9.5rem)', color: 'var(--cream)' }}
          >
            CONFIGURE<br />YOURS
          </span>
        </SectionReveal>
        <SectionReveal delay={0.24}>
          <span
            className="font-display italic font-light block mb-10"
            style={{ fontSize: 'clamp(1.1rem,2vw,1.8rem)', color: 'var(--gold-hi)' }}
          >
            Every Velox is unique. Every Velox is yours.
          </span>
        </SectionReveal>
        <SectionReveal delay={0.36}>
          <Link
            to="/configure"
            className="inline-flex items-center gap-3 font-body font-semibold tracking-[0.4em] uppercase text-[0.6rem] px-10 py-4 transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: 'var(--gold)', color: 'var(--black)' }}
          >
            Begin Configuration →
          </Link>
        </SectionReveal>
      </div>
    </section>
  )
}
