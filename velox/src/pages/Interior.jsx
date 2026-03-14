import { motion } from 'framer-motion'
import { pageTransition } from '@utils/motionVariants'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { breadcrumbSchema } from '@data/seo'
import InteriorShowcase from '@components/sections/InteriorShowcase'
import OutroSection     from '@components/sections/OutroSection'
import SectionReveal    from '@components/ui/SectionReveal'
import Tag              from '@components/ui/Tag'
import ParallaxImage    from '@components/ui/ParallaxImage'

const MATERIALS = [
  { name:'Semi-Aniline Leather', origin:'Tuscany, Italy',      desc:'Sourced from a single tannery operating since 1892. Supple, fragrant, and virtually indestructible.' },
  { name:'Carbon Fibre',         origin:'Velox Atelier, Milan', desc:'Woven in-house from aerospace-grade carbon. Every panel weighed and inspected before installation.' },
  { name:'Forged Aluminium',     origin:'Bavaria, Germany',     desc:'CNC-machined billet aluminium switchgear. Each piece takes 4 hours to produce.' },
  { name:'Alcantara',            origin:'Japan / Italy',        desc:'Premium synthetic suede on the headliner and steering wheel. Grippy, tactile, and timeless.' },
]

export default function Interior() {
  const seo = useSEO({
    title:       'Interior',
    description: '48 hours of hand-stitching. Semi-aniline leather from Tuscany. Machined aluminium. The Velox cabin is a sanctuary unlike any other.',
    canonical:   '/interior',
    ogImage:     'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1200&q=82&fit=crop&auto=format',
    jsonLd: breadcrumbSchema([
      { name:'Home',     path:'/' },
      { name:'Interior', path:'/interior' },
    ]),
  })

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <section className="relative overflow-hidden flex items-end" style={{ height:'70vh', minHeight:480 }}>
        <ParallaxImage src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1600&q=82&fit=crop&crop=center&auto=format" alt="Velox luxury interior dashboard" speed={0.25} brightness={0.28} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(5,5,5,1) 0%,rgba(5,5,5,.45) 35%,transparent 70%)' }} />
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-[1260px] mx-auto w-full">
          <SectionReveal><Tag className="mb-4">The Cabin</Tag></SectionReveal>
          <SectionReveal delay={0.12}>
            <h1 className="font-heading" style={{ fontSize:'clamp(3rem,7vw,7rem)', color:'var(--cream)', lineHeight:0.88 }}>
              YOUR<br /><span style={{ color:'var(--gold)' }}>SANCTUARY</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SectionReveal>
              <h2 className="font-display font-bold mb-6" style={{ fontSize:'clamp(2rem,3.8vw,3.2rem)', color:'var(--cream)' }}>
                48 Hours of<br /><em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Human Attention</em>
              </h2>
              <p className="font-body font-light leading-[2.1] mb-4" style={{ fontSize:'0.88rem', color:'var(--dim)' }}>
                Every Velox cabin is assembled by a dedicated team of four master craftspeople who spend a minimum of 48 hours on interior work alone — not spread across a factory floor, but focused, uninterrupted human attention on your specific vehicle.
              </p>
              <p className="font-body font-light leading-[2.1]" style={{ fontSize:'0.88rem', color:'var(--dim)' }}>
                Every stitch is inspected. Every panel is fitted by hand. Every surface is polished until it reflects perfectly. This is not manufacturing. This is artistry.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.15} direction="right">
              <img src="https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=83&fit=crop&auto=format" alt="Hand-crafted Velox steering wheel" className="w-full object-cover" style={{ height:460, filter:'brightness(0.85) contrast(1.04) saturate(0.88)' }} loading="lazy" width="800" height="533" />
            </SectionReveal>
          </div>
        </div>
      </section>

      <InteriorShowcase />

      <section className="section-pad" style={{ background:'var(--ink)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-14">
            <Tag className="mb-4">Materials</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize:'clamp(2rem,3.8vw,3.2rem)', color:'var(--cream)' }}>
              Only the <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Finest</em>
            </h2>
          </SectionReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0.5" style={{ background:'var(--faint)' }}>
            {MATERIALS.map(({ name, origin, desc }, i) => (
              <SectionReveal key={name} delay={i * 0.1}>
                <div className="p-8" style={{ background:'var(--ink)' }}>
                  <span className="font-heading text-[0.7rem] tracking-[0.4em] block mb-1" style={{ color:'var(--gold)' }}>0{i+1}</span>
                  <h3 className="font-display font-bold mb-1" style={{ fontSize:'1.4rem', color:'var(--cream)' }}>{name}</h3>
                  <span className="font-body text-[0.58rem] tracking-[0.3em] uppercase block mb-4" style={{ color:'var(--gold-lo)' }}>{origin}</span>
                  <p className="font-body font-light leading-[1.9]" style={{ fontSize:'0.8rem', color:'var(--dim)' }}>{desc}</p>
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
