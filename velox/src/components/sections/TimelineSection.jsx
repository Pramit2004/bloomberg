import { TIMELINE } from '@data/timeline'
import Tag from '@components/ui/Tag'
import SectionReveal from '@components/ui/SectionReveal'

export default function TimelineSection({ limit }) {
  const items = limit ? TIMELINE.slice(-limit) : TIMELINE

  return (
    <section className="section-pad" style={{ background: 'var(--ink)' }}>
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <SectionReveal><Tag className="justify-center mb-4">Our Story</Tag></SectionReveal>
          <SectionReveal delay={0.1}>
            <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(2.2rem,4vw,3.6rem)', color: 'var(--cream)' }}>
              Six Decades of <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Obsession</em>
            </h2>
          </SectionReveal>
        </div>

        {/* Desktop: horizontal */}
        <div className="hidden lg:grid relative" style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}>
          <div
            className="absolute top-[0.9rem] left-[10%] right-[10%] h-px"
            style={{ background: 'linear-gradient(to right, transparent, rgba(192,154,90,.28) 15%, rgba(192,154,90,.28) 85%, transparent)' }}
          />
          {items.map(({ year, title, desc }, i) => (
            <SectionReveal key={year} delay={i * 0.08} className="px-5 text-center">
              <div
                className="w-[10px] h-[10px] rounded-full mx-auto mb-6 relative z-10"
                style={{ background: 'var(--gold)', boxShadow: '0 0 0 4px rgba(192,154,90,.12), 0 0 0 8px rgba(192,154,90,.06)' }}
              />
              <span className="font-heading block mb-1 tracking-[0.12em]" style={{ fontSize: '1.4rem', color: 'var(--gold)' }}>{year}</span>
              <span className="font-display font-semibold block mb-2" style={{ fontSize: '0.95rem', color: 'var(--cream)' }}>{title}</span>
              <p className="font-body font-light leading-[1.85]" style={{ fontSize: '0.68rem', color: 'var(--dim)' }}>{desc}</p>
            </SectionReveal>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col gap-8">
          {items.map(({ year, title, desc }, i) => (
            <SectionReveal key={year} delay={i * 0.06}>
              <div className="flex gap-5 items-start">
                <div className="flex flex-col items-center pt-1 flex-shrink-0">
                  <div
                    className="w-[10px] h-[10px] rounded-full"
                    style={{ background: 'var(--gold)', boxShadow: '0 0 0 3px rgba(192,154,90,.15)' }}
                  />
                  {i < items.length - 1 && (
                    <div className="w-px flex-1 mt-2" style={{ background: 'rgba(192,154,90,.15)', minHeight: 40 }} />
                  )}
                </div>
                <div>
                  <span className="font-heading tracking-[0.12em] block mb-0.5" style={{ fontSize: '1.3rem', color: 'var(--gold)' }}>{year}</span>
                  <span className="font-display font-semibold block mb-1.5" style={{ fontSize: '0.95rem', color: 'var(--cream)' }}>{title}</span>
                  <p className="font-body font-light leading-[1.85]" style={{ fontSize: '0.75rem', color: 'var(--dim)' }}>{desc}</p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
