import { motion } from 'framer-motion'
import { pageTransition } from '@utils/motionVariants'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { organisationSchema, breadcrumbSchema } from '@data/seo'
import TimelineSection  from '@components/sections/TimelineSection'
import StatsSection     from '@components/sections/StatsSection'
import QuoteBanner      from '@components/sections/QuoteBanner'
import OutroSection     from '@components/sections/OutroSection'
import SectionReveal    from '@components/ui/SectionReveal'
import Tag              from '@components/ui/Tag'
import ParallaxImage    from '@components/ui/ParallaxImage'

export default function Heritage() {
  const seo = useSEO({
    title:       'Heritage',
    description: 'Six decades of obsession. Velox Automobiles has been crafting race-bred supercars in Milan since 1962 — 47 race victories and a legacy that endures.',
    canonical:   '/heritage',
    ogImage:     'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80&fit=crop&auto=format',
    jsonLd: [
      organisationSchema,
      breadcrumbSchema([
        { name: 'Home',     path: '/' },
        { name: 'Heritage', path: '/heritage' },
      ]),
    ],
  })

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <section className="relative overflow-hidden flex items-end" style={{ height: '70vh', minHeight: 480 }}>
        <ParallaxImage src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&fit=crop&crop=center&auto=format" alt="Velox heritage road" speed={0.25} brightness={0.32} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,5,1) 0%,rgba(5,5,5,.45) 35%,transparent 70%)' }} />
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-[1260px] mx-auto w-full">
          <SectionReveal><Tag className="mb-4">Since 1962</Tag></SectionReveal>
          <SectionReveal delay={0.12}>
            <h1 className="font-heading" style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: 'var(--cream)', lineHeight: 0.88 }}>
              OUR<br /><span style={{ color: 'var(--gold)' }}>HERITAGE</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <h2 className="font-display font-bold mb-6 leading-[1.06]" style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', color: 'var(--cream)' }}>
                Born from a Garage,<br /><em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Built for Eternity</em>
              </h2>
              <p className="font-body font-light leading-[2.1] mb-4" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>
                In 1962, a young engineer named Viktor Atreo rented a small garage in the Navigli district of Milan. With a single drafting table, a set of worn-down pencils, and an obsession that bordered on madness, he sketched the first Velox over three sleepless nights.
              </p>
              <p className="font-body font-light leading-[2.1]" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>
                Two years later, the Velox V1 crossed the finish line at Monza for the first time. The crowd stood silent for a moment before erupting. Something extraordinary had arrived. Sixty-three years later, that obsession has never cooled — it has only intensified.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15} direction="right">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=83&fit=crop&auto=format" alt="Velox Atreo X side profile" className="w-full object-cover" style={{ height: 480, filter: 'brightness(0.85) contrast(1.04) saturate(0.85)' }} loading="lazy" width="800" height="533" />
                <div className="absolute bottom-6 right-6 px-6 py-4" style={{ background: 'rgba(5,5,5,.85)', border: '1px solid rgba(192,154,90,.2)' }}>
                  <span className="font-heading text-[2.5rem] block leading-none" style={{ color: 'var(--gold)' }}>1962</span>
                  <span className="font-body text-[0.58rem] tracking-[0.3em] uppercase" style={{ color: 'var(--dim)' }}>The Beginning</span>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      <StatsSection />
      <TimelineSection />

      <QuoteBanner
        img="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=78&fit=crop&crop=center&auto=format"
        quote="We do not build cars. We build the feeling of being alive."
        author="Viktor Atreo · 1974, after Le Mans victory"
        speed={0.26} brightness={0.3} height="60vh" minHeight={400}
      />

      <section className="section-pad" style={{ background: 'var(--ink)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-14">
            <Tag className="mb-4">Motorsport</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', color: 'var(--cream)' }}>
              Racing <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>DNA</em>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5" style={{ background: 'var(--faint)' }}>
            {[
              { img: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&q=80&fit=crop&auto=format', label: 'Le Mans 1974',   desc: 'Outright victory in the RS1' },
              { img: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=600&q=80&fit=crop&auto=format', label: 'Speed Record 1991', desc: '387 km/h — stood 14 years' },
              { img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fit=crop&auto=format', label: '47 Race Wins',   desc: 'Across 6 decades of competition' },
            ].map(({ img, label, desc }, i) => (
              <SectionReveal key={label} delay={i * 0.12}>
                <div className="group relative overflow-hidden" style={{ background: 'var(--ink)', aspectRatio: '4/3' }}>
                  <img src={img} alt={label} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" style={{ filter: 'brightness(0.65) saturate(0.7)' }} loading="lazy" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(5,5,5,.9) 0%,transparent 55%)' }} />
                  <div className="absolute bottom-0 p-6">
                    <span className="font-display font-bold block mb-1" style={{ fontSize: '1.1rem', color: 'var(--cream)' }}>{label}</span>
                    <span className="font-body font-light text-[0.7rem]" style={{ color: 'var(--dim)' }}>{desc}</span>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <OutroSection />
    </motion.div>
  )
}
