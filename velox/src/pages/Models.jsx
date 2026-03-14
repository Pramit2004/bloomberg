import { motion } from 'framer-motion'
import { pageTransition } from '@utils/motionVariants'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { MODELS } from '@data/models'
import { modelsListSchema, breadcrumbSchema } from '@data/seo'
import ModelsGrid    from '@components/sections/ModelsGrid'
import OutroSection  from '@components/sections/OutroSection'
import SectionReveal from '@components/ui/SectionReveal'
import Tag           from '@components/ui/Tag'

export default function Models() {
  const seo = useSEO({
    title:       'Models',
    description: 'Explore the Velox 2025 supercar collection — Atreo X (680hp), Atreo GTS (520hp) and Atreo E (750hp electric). Three legends, one standard of excellence.',
    canonical:   '/models',
    ogImage:     'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200&q=80&fit=crop&auto=format',
    jsonLd: [
      modelsListSchema(MODELS),
      breadcrumbSchema([
        { name: 'Home',   path: '/' },
        { name: 'Models', path: '/models' },
      ]),
    ],
  })

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: '55vh', minHeight: 400 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1600&q=82&fit=crop&crop=center&auto=format"
            alt="Velox supercar collection"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.35) contrast(1.1) saturate(0.8)', transform: 'scale(1.04)' }}
            loading="eager" fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,1) 0%, rgba(5,5,5,.5) 30%, transparent 70%)' }} />
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-[1260px] mx-auto w-full">
          <SectionReveal><Tag className="mb-4">The Collection</Tag></SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="font-heading" style={{ fontSize: 'clamp(3rem,7vw,7rem)', color: 'var(--cream)', lineHeight: 0.9 }}>
              CHOOSE YOUR<br /><span style={{ color: 'var(--gold)' }}>LEGEND</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <ModelsGrid />
      <OutroSection />
    </motion.div>
  )
}
