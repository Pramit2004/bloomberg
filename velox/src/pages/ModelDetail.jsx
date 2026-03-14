import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { getModelBySlug } from '@data/models'
import { pageTransition } from '@utils/motionVariants'
import { formatPrice } from '@utils/helpers'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { carSchema, breadcrumbSchema } from '@data/seo'
import SectionReveal from '@components/ui/SectionReveal'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'

export default function ModelDetail() {
  const { slug } = useParams()
  const model = getModelBySlug(slug)
  const [activeImg, setActiveImg] = useState(0)

  if (!model) return <Navigate to="/models" replace />

  const seo = useSEO({
    title:       `${model.name} — ${formatPrice(model.price, model.currency)}`,
    description: model.description,
    canonical:   `/models/${model.slug}`,
    ogImage:     model.hero,
    ogType:      'product',
    jsonLd: [
      carSchema(model),
      breadcrumbSchema([
        { name: 'Home',      path: '/' },
        { name: 'Models',    path: '/models' },
        { name: model.name,  path: `/models/${model.slug}` },
      ]),
    ],
  })

  const specEntries = Object.entries(model.specs)

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      {/* Hero */}
      <section className="relative overflow-hidden flex items-end" style={{ height: '90vh', minHeight: 600 }}>
        <div className="absolute inset-0">
          <img
            src={model.gallery[activeImg]}
            alt={`Velox ${model.name} — ${model.tagline}`}
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: 'brightness(0.45) contrast(1.08) saturate(0.85)' }}
            loading="eager" fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(105deg,rgba(5,5,5,.92) 0%,rgba(5,5,5,.55) 40%,rgba(5,5,5,.1) 65%,transparent 100%),linear-gradient(to top,rgba(5,5,5,.95) 0%,rgba(5,5,5,.3) 22%,transparent 50%)'
        }}/>
        <div className="relative z-10 px-6 md:px-16 pb-16 max-w-[1260px] mx-auto w-full">
          <SectionReveal>
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <Tag>2025 Collection</Tag>
              {model.badge && (
                <span
                  className="font-body text-[0.46rem] font-semibold tracking-[0.38em] uppercase px-3 py-1.5"
                  style={{ background: model.badge === 'ELECTRIC' ? '#1a3c2a' : 'var(--gold)', color: model.badge === 'ELECTRIC' ? '#5eda8a' : 'var(--black)' }}
                  aria-label={`${model.badge} model`}
                >
                  {model.badge}
                </span>
              )}
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <h1 className="font-heading mb-2" style={{ fontSize: 'clamp(4rem,9vw,9rem)', color: 'var(--cream)', lineHeight: 0.88 }}>
              {model.name.toUpperCase()}
            </h1>
          </SectionReveal>
          <SectionReveal delay={0.2}>
            <p className="font-display italic font-light mb-6" style={{ fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: 'var(--gold-hi)' }}>
              {model.tagline}
            </p>
          </SectionReveal>
          <SectionReveal delay={0.3}>
            <div className="flex gap-4 flex-wrap">
              <Button to={`/configure/${model.slug}`} variant="gold" size="lg">Configure Yours</Button>
              <Button to="/models" variant="outline">All Models</Button>
            </div>
          </SectionReveal>
        </div>

        {/* Gallery thumbnails */}
        <div className="absolute bottom-6 right-6 md:right-16 z-10 flex gap-2" role="tablist" aria-label="Gallery images">
          {model.gallery.map((img, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeImg}
              aria-label={`View image ${i + 1}`}
              onClick={() => setActiveImg(i)}
              className="overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              style={{
                width: 56, height: 38,
                border: `1px solid ${i === activeImg ? 'var(--gold)' : 'rgba(240,233,220,0.2)'}`,
                opacity: i === activeImg ? 1 : 0.55,
              }}
            >
              <img src={img} alt={`${model.name} view ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      </section>

      {/* Description + Specs */}
      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <SectionReveal>
              <h2 className="font-display font-bold leading-[1.06] mb-6" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', color: 'var(--cream)' }}>
                The Story Behind the <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Machine</em>
              </h2>
              <p className="font-body font-light leading-[2.1] mb-4" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>{model.description}</p>
              <p className="font-body font-light leading-[2.1]" style={{ fontSize: '0.88rem', color: 'var(--dim)' }}>{model.longDescription}</p>
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div style={{ border: '1px solid var(--faint)' }} role="table" aria-label={`${model.name} technical specifications`}>
                <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--faint)', background: 'var(--ink)' }}>
                  <Tag>Technical Specifications</Tag>
                </div>
                {specEntries.map(([key, val], i) => (
                  <div
                    key={key}
                    role="row"
                    className="flex justify-between items-center px-6 py-4"
                    style={{ borderBottom: i < specEntries.length - 1 ? '1px solid var(--faint)' : 'none', background: i % 2 === 0 ? 'transparent' : 'rgba(240,233,220,.02)' }}
                  >
                    <span role="cell" className="font-body font-medium text-[0.65rem] tracking-[0.25em] uppercase" style={{ color: 'var(--dim)' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span role="cell" className="font-body font-semibold text-[0.72rem]" style={{ color: 'var(--cream)' }}>{val}</span>
                  </div>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad" style={{ background: 'var(--ink)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-12">
            <Tag className="mb-4">Standard Features</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', color: 'var(--cream)' }}>
              Included as <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Standard</em>
            </h2>
          </SectionReveal>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Standard features">
            {model.features.map((f, i) => (
              <SectionReveal key={f} delay={i * 0.06} className="block">
                <li className="p-5 h-full" style={{ border: '1px solid var(--faint)', background: 'var(--black)' }}>
                  <span className="font-body font-semibold text-[0.52rem] tracking-[0.3em] uppercase block mb-2" style={{ color: 'var(--gold)' }}>0{i + 1}</span>
                  <span className="font-body font-light text-[0.8rem] leading-[1.7]" style={{ color: 'var(--cream)' }}>{f}</span>
                </li>
              </SectionReveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Colours */}
      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <SectionReveal className="mb-12">
            <Tag className="mb-4">Exterior Colours</Tag>
            <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(1.8rem,3.2vw,2.8rem)', color: 'var(--cream)' }}>
              Your <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Canvas</em>
            </h2>
          </SectionReveal>
          <div className="flex flex-wrap gap-8" role="list" aria-label="Available exterior colours">
            {model.colors.map(({ name, hex }, i) => (
              <SectionReveal key={name} delay={i * 0.08} className="block">
                <div role="listitem" className="flex flex-col items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-full"
                    style={{ background: hex, boxShadow: '0 0 0 1px rgba(240,233,220,.15), 0 8px 24px rgba(0,0,0,.5)' }}
                    aria-label={name}
                  />
                  <span className="font-body text-[0.58rem] font-medium tracking-[0.2em] text-center" style={{ color: 'var(--dim)' }}>{name}</span>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center" style={{ background: 'var(--ink)' }}>
        <SectionReveal>
          <h2 className="font-display font-bold mb-6" style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', color: 'var(--cream)' }}>
            Ready for your <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>{model.name}</em>?
          </h2>
          <p className="font-body font-light mb-10" style={{ fontSize: '0.9rem', color: 'var(--dim)' }}>
            Starting from {formatPrice(model.price, model.currency)}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button to={`/configure/${model.slug}`} variant="gold" size="lg">Configure Now</Button>
            <Button to="/contact" variant="outline" size="lg">Book a Test Drive</Button>
          </div>
        </SectionReveal>
      </section>
    </motion.div>
  )
}
