import { motion } from 'framer-motion'
import { pageTransition } from '@utils/motionVariants'
import SEOHead from '@components/ui/SEOHead'
import { useSEO } from '@hooks/useSEO'
import { websiteSchema, organisationSchema } from '@data/seo'

import HeroSection         from '@components/sections/HeroSection'
import Marquee             from '@components/ui/Marquee'
import SpecsRibbon         from '@components/sections/SpecsRibbon'
import StorySection        from '@components/sections/StorySection'
import QuoteBanner         from '@components/sections/QuoteBanner'
import ModelsGrid          from '@components/sections/ModelsGrid'
import InteriorShowcase    from '@components/sections/InteriorShowcase'
import StatsSection        from '@components/sections/StatsSection'
import TestimonialsSection from '@components/sections/TestimonialsSection'
import TimelineSection     from '@components/sections/TimelineSection'
import OutroSection        from '@components/sections/OutroSection'

export default function Home() {
  const seo = useSEO({
    title:       null, // uses default full title
    description: 'Velox Automobiles — handcrafted luxury supercars from Milan since 1962. 680hp twin-turbo V8, 0–100 in 2.8 seconds. Configure yours today.',
    canonical:   '/',
    ogImage:     'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80&fit=crop&auto=format',
    jsonLd:      [websiteSchema, organisationSchema],
  })

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <HeroSection />
      <Marquee />
      <SpecsRibbon />
      <StorySection />

      <QuoteBanner
        img="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&fit=crop&crop=center&auto=format"
        quote="Speed is not a number. It is the feeling of leaving everything ordinary behind."
        author="Viktor Atreo, Founder & Chief Designer · 1962"
        speed={0.26}
      />

      <ModelsGrid limit={3} />
      <InteriorShowcase />

      <QuoteBanner
        img="https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1600&q=78&fit=crop&crop=center&auto=format"
        quote="Every road is your racetrack. Every moment, your fastest lap."
        author="Velox Automobiles"
        speed={0.22}
        brightness={0.32}
        height="55vh"
        minHeight={360}
      />

      <StatsSection />
      <TestimonialsSection />
      <TimelineSection limit={5} />
      <OutroSection />
    </motion.div>
  )
}
