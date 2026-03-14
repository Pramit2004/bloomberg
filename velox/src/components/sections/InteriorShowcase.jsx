import SectionReveal from '@components/ui/SectionReveal'
import Tag from '@components/ui/Tag'
import { INTERIOR_FEATURES } from '@data/timeline'

export default function InteriorShowcase() {
  return (
    <section className="section-pad">
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
          <SectionReveal>
            <div>
              <Tag className="mb-3">The Cabin</Tag>
              <h2
                className="font-display font-bold mt-3 leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', color: 'var(--cream)' }}
              >
                An Interior Unlike{' '}
                <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Any Other</em>
              </h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-body font-light leading-[2] max-w-[270px]" style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>
              Every surface touched by human hands. Every material sourced for lifetimes of perfection.
            </p>
          </SectionReveal>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0.5"
          style={{ background: 'var(--faint)' }}
        >
          {INTERIOR_FEATURES.map(({ img, label, desc }, i) => (
            <SectionReveal key={label} delay={i * 0.15}>
              <div className="group relative overflow-hidden" style={{ background: 'var(--ink)', aspectRatio: '4/3' }}>
                <img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:brightness-[0.94] group-hover:saturate-100"
                  style={{ transform: 'scale(1.05)', filter: 'brightness(0.72) saturate(0.8)' }}
                  loading="lazy" decoding="async" width="600" height="450"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,5,.9), transparent 55%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span
                    className="font-body font-semibold tracking-[0.42em] uppercase block mb-1.5 transition-colors duration-300 group-hover:text-[var(--gold-hi)]"
                    style={{ fontSize: '0.5rem', color: 'rgba(240,233,220,.42)' }}
                  >
                    {label}
                  </span>
                  <p
                    className="font-body font-light leading-[1.7] opacity-0 transition-all duration-500 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
                    style={{ fontSize: '0.75rem', color: 'rgba(240,233,220,.55)' }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
