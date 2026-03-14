import { useRef } from 'react'
import { Link } from 'react-router-dom'
import SectionReveal from '@components/ui/SectionReveal'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'

export default function StorySection() {
  const imgWrap = useRef(null)

  return (
    <section className="section-pad overflow-hidden">
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-[52%_1fr] gap-16 lg:gap-24 items-center">

          {/* Image column */}
          <SectionReveal direction="left">
            <div
              ref={imgWrap}
              className="relative group"
              style={{ cursor: 'none' }}
            >
              {/* Gold frame accent */}
              <span
                className="absolute z-[-1] border border-[rgba(192,154,90,.18)] transition-transform duration-700 group-hover:-translate-x-1 group-hover:-translate-y-1"
                style={{ top: '-1.2rem', left: '-1.2rem', right: '3rem', bottom: '3rem' }}
              />

              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&q=84&fit=crop&crop=focalpoint&fp-x=.5&fp-y=.45&auto=format"
                alt="Velox Atreo X side profile"
                className="w-full object-cover transition-all duration-700 group-hover:scale-[1.015] group-hover:brightness-95"
                style={{ height: 540, objectPosition: 'center 42%', filter: 'brightness(0.88) contrast(1.04)' }}
                loading="lazy" decoding="async" width="900" height="600"
              />

              {/* Inset accent image */}
              <img
                src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=520&q=80&fit=crop&auto=format"
                alt="Velox detail"
                className="absolute hidden md:block w-[46%] object-cover transition-all duration-500 group-hover:brightness-95"
                style={{
                  bottom: '-2.5rem', right: '-2.5rem',
                  aspectRatio: '4/3',
                  border: '3px solid var(--black)',
                  boxShadow: '0 20px 60px rgba(0,0,0,.72)',
                  filter: 'brightness(0.84)',
                }}
                loading="lazy" decoding="async" width="520" height="390"
              />
            </div>
          </SectionReveal>

          {/* Text column */}
          <div>
            <SectionReveal><Tag>Born to Race</Tag></SectionReveal>
            <SectionReveal delay={0.12}>
              <h2
                className="font-display font-bold mt-5 mb-7 leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.4rem)', color: 'var(--cream)' }}
              >
                Where <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Obsession</em><br />
                Meets the Road
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.22}>
              <p className="font-body font-light leading-[2.1] mb-4" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>
                Since 1962, Velox has pursued a single truth: the perfect car is one you never want to stop driving. Every component, every material, every stitch exists for one reason — an experience that redefines the possible.
              </p>
              <p className="font-body font-light leading-[2.1]" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>
                Our engineers don't design vehicles. They sculpt sensations.
              </p>
            </SectionReveal>

            {/* Stats */}
            <SectionReveal delay={0.34}>
              <div
                className="flex gap-10 mt-10 pt-8 flex-wrap"
                style={{ borderTop: '1px solid var(--faint)' }}
              >
                {[
                  { val: '1962',    lbl: 'Founded' },
                  { val: '14,800+', lbl: 'Cars Built' },
                  { val: '47',      lbl: 'Race Wins' },
                ].map(({ val, lbl }) => (
                  <div key={lbl}>
                    <span className="font-display font-bold block leading-none" style={{ fontSize: '2rem', color: 'var(--gold)' }}>{val}</span>
                    <span className="font-body font-normal text-[0.5rem] tracking-[0.35em] uppercase block mt-1" style={{ color: 'rgba(240,233,220,0.22)' }}>{lbl}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>

            {/* CTAs */}
            <SectionReveal delay={0.46}>
              <div className="flex gap-4 mt-8 flex-wrap">
                <Button to="/models" variant="gold">Explore Models</Button>
                <Button to="/heritage" variant="outline">Our Heritage</Button>
              </div>
            </SectionReveal>
          </div>

        </div>
      </div>
    </section>
  )
}
