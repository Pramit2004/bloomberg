import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { MODELS } from '@data/models'
import Tag from '@components/ui/Tag'
import SectionReveal from '@components/ui/SectionReveal'
import { formatPrice } from '@utils/helpers'
import { useCursorStore } from '@hooks/useCursorStore'

function ModelCard({ model, index }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const setHover = useCursorStore(s => s.setHover)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22,1,0.36,1], delay: index * 0.15 } } : {}}
      className="group relative overflow-hidden"
      style={{ background: 'var(--ink)', isolation: 'isolate' }}
      onMouseEnter={() => setHover(true, 'View')}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: 420 }}>
        <img
          src={model.gallery[0]}
          alt={model.name}
          className="w-full h-full object-cover transition-all duration-[850ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-100 group-hover:brightness-[0.9] group-hover:saturate-100"
          style={{
            objectPosition: 'center 35%',
            transform: 'scale(1.06)',
            filter: 'brightness(0.72) saturate(0.88)',
          }}
          loading="lazy" decoding="async" width="720" height="480"
        />
        {/* Gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-[0.65]"
          style={{ background: 'linear-gradient(to top, rgba(12,12,12,1) 0%, rgba(12,12,12,.28) 35%, transparent 58%)' }}
        />
        {/* Number */}
        <span
          className="absolute top-5 left-6 font-heading text-[0.7rem] tracking-[0.48em]"
          style={{ color: 'rgba(240,233,220,.22)' }}
        >
          0{index + 1}
        </span>
        {/* Badge */}
        {model.badge && (
          <span
            className="absolute top-5 right-5 font-body text-[0.46rem] font-semibold tracking-[0.38em] uppercase px-3 py-1.5"
            style={{ background: model.badge === 'ELECTRIC' ? '#1a3c2a' : 'var(--gold)', color: model.badge === 'ELECTRIC' ? '#5eda8a' : 'var(--black)' }}
          >
            {model.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-7 pb-8">
        <span className="font-display font-bold block leading-none mb-1"
          style={{ fontSize: '1.65rem', color: 'var(--cream)' }}>
          {model.name}
        </span>
        <span className="font-display italic font-light block mb-5"
          style={{ fontSize: '0.82rem', color: 'var(--gold-hi)', letterSpacing: '0.06em' }}>
          {model.tagline}
        </span>

        {/* Quick specs */}
        <div className="flex gap-6 mb-6 flex-wrap">
          {[
            { v: model.specs.power.replace(' hp',''), l: 'Horsepower' },
            { v: model.specs.acceleration,            l: '0–100 km/h' },
            { v: model.specs.topSpeed.replace(' km/h',''), l: 'Top km/h' },
          ].map(({ v, l }) => (
            <div key={l}>
              <span className="font-heading block leading-none" style={{ fontSize: '1.2rem', color: 'var(--gold)' }}>{v}</span>
              <span className="font-body text-[0.46rem] tracking-[0.36em] uppercase block mt-0.5" style={{ color: 'rgba(240,233,220,.24)' }}>{l}</span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div
          className="flex items-center justify-between pt-5 gap-4 flex-wrap"
          style={{ borderTop: '1px solid rgba(192,154,90,.1)' }}
        >
          <span className="font-display font-bold" style={{ fontSize: '1.28rem', color: 'var(--cream)' }}>
            From {formatPrice(model.price, model.currency)}
          </span>
          <Link
            to={`/models/${model.slug}`}
            className="font-body text-[0.52rem] font-semibold tracking-[0.38em] uppercase px-5 py-2.5 transition-colors duration-300"
            style={{ background: 'var(--gold)', color: 'var(--black)' }}
            onMouseEnter={() => setHover(true, 'Explore')}
            onMouseLeave={() => setHover(false)}
          >
            Explore →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ModelsGrid({ limit }) {
  const models = limit ? MODELS.slice(0, limit) : MODELS

  return (
    <section className="section-pad" style={{ background: 'var(--ink)' }}>
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <SectionReveal>
            <div>
              <Tag className="mb-3">The 2025 Collection</Tag>
              <h2
                className="font-display font-bold leading-[1.05] mt-3"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)', color: 'var(--cream)' }}
              >
                Choose Your{' '}
                <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Legend</em>
              </h2>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <p className="font-body font-light leading-[2] max-w-[280px]" style={{ fontSize: '0.8rem', color: 'var(--dim)' }}>
              Three distinct characters. One uncompromising standard of excellence.
            </p>
          </SectionReveal>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-0.5"
          style={{ background: 'rgba(192,154,90,.07)' }}>
          {models.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
