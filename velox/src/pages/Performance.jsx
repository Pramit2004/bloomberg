import { motion } from 'framer-motion'
import { pageTransition } from '@utils/motionVariants'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { performanceFaqSchema, breadcrumbSchema } from '@data/seo'
import QuoteBanner   from '@components/sections/QuoteBanner'
import SpecsRibbon   from '@components/sections/SpecsRibbon'
import OutroSection  from '@components/sections/OutroSection'
import SectionReveal from '@components/ui/SectionReveal'
import Tag           from '@components/ui/Tag'
import ParallaxImage from '@components/ui/ParallaxImage'

const TECH = [
  { num:'01', title:'Active Aerodynamics',       desc:'Intelligent surfaces adapt in 240ms, generating up to 480kg of downforce at peak velocity. The Atreo X reads the air before you feel it.',           img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=82&fit=crop&auto=format' },
  { num:'02', title:'Carbon-Ceramic Brakes',     desc:'Six-piston calipers gripping rotors that remain consistent from 0°C to 700°C. Fade-free. Relentless. Available in 420mm diameter.',                 img:'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=700&q=80&fit=crop&auto=format' },
  { num:'03', title:'Magnetorheological Suspension', desc:'Dampers that respond 1,000 times per second using iron-particle fluid and electromagnets. Comfort and track precision are no longer opposites.',  img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&q=82&fit=crop&auto=format' },
  { num:'04', title:'Launch Control',            desc:"The Atreo X's launch control system optimises torque delivery at the limit of traction, producing repeatable 2.8s 0–100 runs on demand.",          img:'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=700&q=82&fit=crop&auto=format' },
]

export default function Performance() {
  const seo = useSEO({
    title:       'Performance',
    description: 'Velox engineering explained — 680hp, 2.8s 0–100, 340km/h top speed. Active aerodynamics, carbon-ceramic brakes, magnetorheological suspension.',
    canonical:   '/performance',
    ogImage:     'https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1200&q=80&fit=crop&auto=format',
    jsonLd: [
      performanceFaqSchema,
      breadcrumbSchema([
        { name: 'Home',        path: '/' },
        { name: 'Performance', path: '/performance' },
      ]),
    ],
  })

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <section className="relative overflow-hidden flex items-end" style={{ height: '80vh', minHeight: 540 }}>
        <ParallaxImage src="https://images.unsplash.com/photo-1469285994282-454ceb49e63c?w=1600&q=80&fit=crop&crop=center&auto=format" alt="Velox supercar on open road" speed={0.28} brightness={0.3} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(105deg,rgba(5,5,5,.9) 0%,rgba(5,5,5,.5) 38%,rgba(5,5,5,.1) 65%,transparent 100%),linear-gradient(to top,rgba(5,5,5,.95) 0%,rgba(5,5,5,.35) 22%,transparent 50%)' }} />
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-[1260px] mx-auto w-full">
          <SectionReveal><Tag className="mb-4">Engineering Excellence</Tag></SectionReveal>
          <SectionReveal delay={0.12}>
            <h1 className="font-heading" style={{ fontSize:'clamp(3rem,7vw,7rem)', color:'var(--cream)', lineHeight:0.88 }}>
              BEYOND<br /><span style={{ color:'var(--gold)' }}>THE LIMIT</span>
            </h1>
          </SectionReveal>
        </div>
      </section>

      <SpecsRibbon />

      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-16">
            <Tag className="mb-4">The Technology</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize:'clamp(2rem,3.8vw,3.2rem)', color:'var(--cream)' }}>
              Engineered for the <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Exceptional</em>
            </h2>
          </SectionReveal>
          <div className="space-y-0.5" style={{ background:'var(--faint)' }}>
            {TECH.map(({ num, title, desc, img }, i) => (
              <SectionReveal key={num} delay={i * 0.08}>
                <div className="group grid grid-cols-1 md:grid-cols-[auto_1fr_300px] items-center gap-0" style={{ background:'var(--black)' }}>
                  <div className="px-6 py-8 md:px-10 md:py-10 flex-shrink-0">
                    <span className="font-heading text-[3.5rem] leading-none" style={{ color:'rgba(192,154,90,.12)' }} aria-hidden="true">{num}</span>
                  </div>
                  <div className="px-6 pb-8 md:px-8 md:py-10" style={{ borderLeft:'1px solid var(--faint)' }}>
                    <h3 className="font-display font-bold mb-3" style={{ fontSize:'1.4rem', color:'var(--cream)' }}>{title}</h3>
                    <p className="font-body font-light leading-[2]" style={{ fontSize:'0.84rem', color:'var(--dim)' }}>{desc}</p>
                  </div>
                  <div className="hidden md:block overflow-hidden" style={{ height:160, borderLeft:'1px solid var(--faint)' }}>
                    <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ filter:'brightness(0.65) saturate(0.8)' }} loading="lazy" />
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — also feeds the JSON-LD FAQ schema above */}
      <section className="section-pad" style={{ background:'var(--ink)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-12">
            <Tag className="mb-4">FAQ</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize:'clamp(2rem,3.5vw,3rem)', color:'var(--cream)' }}>
              Common <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Questions</em>
            </h2>
          </SectionReveal>
          <dl className="space-y-4 max-w-3xl">
            {[
              { q:'What is the 0–100 time of the Velox Atreo X?',    a:'The Velox Atreo X accelerates from 0–100 km/h in 2.8 seconds.' },
              { q:'What engine does the Velox Atreo X have?',         a:'A 4.0-litre twin-turbocharged V8 producing 680 horsepower and 850 Nm of torque.' },
              { q:'How fast is the Velox Atreo X top speed?',         a:'The Velox Atreo X has a top speed of 340 km/h.' },
              { q:'Is there an electric Velox?',                      a:'Yes — the Velox Atreo E features four electric motors producing 750hp with a 520km range and 350kW fast charging.' },
            ].map(({ q, a }, i) => (
              <SectionReveal key={i} delay={i * 0.08}>
                <div className="p-6" style={{ border:'1px solid var(--faint)', background:'var(--black)' }}>
                  <dt className="font-display font-semibold mb-2" style={{ fontSize:'1.05rem', color:'var(--cream)' }}>{q}</dt>
                  <dd className="font-body font-light leading-[1.9]" style={{ fontSize:'0.84rem', color:'var(--dim)' }}>{a}</dd>
                </div>
              </SectionReveal>
            ))}
          </dl>
        </div>
      </section>

      <QuoteBanner
        img="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=78&fit=crop&crop=center&auto=format"
        quote="Every road is your racetrack. Every moment, your fastest lap."
        author="Velox Automobiles"
        speed={0.24} brightness={0.3} height="55vh" minHeight={360}
      />

      <OutroSection />
    </motion.div>
  )
}
