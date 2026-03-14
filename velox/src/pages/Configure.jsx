import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { MODELS, getModelBySlug } from '@data/models'
import { pageTransition } from '@utils/motionVariants'
import { formatPrice } from '@utils/helpers'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { breadcrumbSchema } from '@data/seo'
import SectionReveal from '@components/ui/SectionReveal'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'
import toast from 'react-hot-toast'

const EXTRAS = [
  { id:'carbon',  label:'Full Carbon Exterior Package',    price:12000 },
  { id:'sport',   label:'Sport Exhaust System',            price:8500  },
  { id:'ceramic', label:'Carbon-Ceramic Brake Upgrade',    price:15000 },
  { id:'roof',    label:'Panoramic Glass Roof',            price:4200  },
  { id:'seats',   label:'Racing Bucket Seats',             price:6800  },
  { id:'audio',   label:'Meridian Signature Audio System', price:5500  },
]

export default function Configure() {
  const { slug } = useParams()
  const defaultModel = slug ? getModelBySlug(slug) : MODELS[0]
  const [selectedModel,  setSelectedModel]  = useState(defaultModel || MODELS[0])
  const [selectedColor,  setSelectedColor]  = useState(0)
  const [selectedExtras, setSelectedExtras] = useState([])
  const [submitted,      setSubmitted]      = useState(false)

  const seo = useSEO({
    title:       `Configure ${selectedModel.name}`,
    description: `Build your perfect Velox ${selectedModel.name}. Choose colour, options and submit your configuration. Starting from ${formatPrice(selectedModel.price, selectedModel.currency)}.`,
    canonical:   slug ? `/configure/${slug}` : '/configure',
    noIndex:     true, // configurator pages shouldn't be indexed
    jsonLd: breadcrumbSchema([
      { name:'Home',      path:'/' },
      { name:'Configure', path:'/configure' },
    ]),
  })

  const toggleExtra = (id) =>
    setSelectedExtras(p => p.includes(id) ? p.filter(e => e !== id) : [...p, id])

  const extrasPrice = EXTRAS.filter(e => selectedExtras.includes(e.id)).reduce((s,e) => s + e.price, 0)
  const totalPrice  = selectedModel.price + extrasPrice

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    toast.success('Configuration submitted! A specialist will contact you within 24 hours.')
  }

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />

      <section className="pt-36 pb-16" style={{ background:'var(--ink)', borderBottom:'1px solid var(--faint)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <Tag className="mb-4">Bespoke</Tag>
          <h1 className="font-heading" style={{ fontSize:'clamp(3rem,7vw,7rem)', color:'var(--cream)', lineHeight:0.88 }}>
            BUILD YOUR<br /><span style={{ color:'var(--gold)' }}>VELOX</span>
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 items-start">

            <div className="space-y-14">
              {/* Step 1 */}
              <SectionReveal>
                <h2 className="font-display font-bold mb-6" style={{ fontSize:'1.8rem', color:'var(--cream)' }}>
                  01 — Choose Your <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Model</em>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Select model">
                  {MODELS.map(m => (
                    <button key={m.id} onClick={() => { setSelectedModel(m); setSelectedColor(0) }}
                      role="radio" aria-checked={selectedModel.id === m.id}
                      className="relative overflow-hidden text-left transition-all duration-300 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                      style={{ border:`1px solid ${selectedModel.id === m.id ? 'var(--gold)' : 'var(--faint)'}`, background:'var(--ink)' }}>
                      <div style={{ height:140, overflow:'hidden' }}>
                        <img src={m.gallery[0]} alt={m.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" style={{ filter:'brightness(0.75)', objectPosition:'center 30%' }} loading="lazy" />
                      </div>
                      <div className="p-4">
                        <span className="font-display font-bold block text-[1.1rem]" style={{ color:'var(--cream)' }}>{m.name}</span>
                        <span className="font-body text-[0.62rem] font-light" style={{ color:'var(--dim)' }}>{formatPrice(m.price, m.currency)}</span>
                      </div>
                      {selectedModel.id === m.id && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center text-[0.6rem] font-bold" style={{ background:'var(--gold)', color:'var(--black)' }} aria-hidden="true">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </SectionReveal>

              {/* Step 2 */}
              <SectionReveal delay={0.1}>
                <h2 className="font-display font-bold mb-6" style={{ fontSize:'1.8rem', color:'var(--cream)' }}>
                  02 — Select <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Colour</em>
                </h2>
                <div className="flex flex-wrap gap-4" role="radiogroup" aria-label="Select exterior colour">
                  {selectedModel.colors.map(({ name, hex }, i) => (
                    <button key={name} onClick={() => setSelectedColor(i)}
                      role="radio" aria-checked={selectedColor === i} aria-label={name}
                      className="flex flex-col items-center gap-2 p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                      style={{ border:`1px solid ${selectedColor === i ? 'var(--gold)' : 'transparent'}`, background:'transparent' }}>
                      <div className="w-12 h-12 rounded-full" style={{ background:hex, boxShadow:'0 4px 12px rgba(0,0,0,.5)' }} />
                      <span className="font-body text-[0.5rem] tracking-wide text-center" style={{ color:selectedColor === i ? 'var(--gold)' : 'var(--dim)', maxWidth:70 }}>{name}</span>
                    </button>
                  ))}
                </div>
              </SectionReveal>

              {/* Step 3 */}
              <SectionReveal delay={0.15}>
                <h2 className="font-display font-bold mb-6" style={{ fontSize:'1.8rem', color:'var(--cream)' }}>
                  03 — Add <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Options</em>
                </h2>
                <div className="space-y-2" role="group" aria-label="Select optional extras">
                  {EXTRAS.map(({ id, label, price }) => {
                    const checked = selectedExtras.includes(id)
                    return (
                      <button key={id} onClick={() => toggleExtra(id)}
                        role="checkbox" aria-checked={checked}
                        className="w-full flex items-center justify-between px-5 py-4 transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                        style={{ border:`1px solid ${checked ? 'var(--gold)' : 'var(--faint)'}`, background:checked ? 'rgba(192,154,90,.06)' : 'transparent' }}>
                        <div className="flex items-center gap-4">
                          <span className="w-5 h-5 rounded flex-shrink-0 flex items-center justify-center text-[0.6rem] font-bold transition-colors duration-300"
                            style={{ border:`1px solid ${checked ? 'var(--gold)' : 'rgba(240,233,220,.2)'}`, color:checked ? 'var(--black)' : 'transparent', background:checked ? 'var(--gold)' : 'transparent' }}
                            aria-hidden="true">✓</span>
                          <span className="font-body text-[0.78rem] font-light" style={{ color:'var(--cream)' }}>{label}</span>
                        </div>
                        <span className="font-display font-semibold text-[0.85rem] flex-shrink-0" style={{ color:checked ? 'var(--gold)' : 'var(--dim)' }}>
                          +{formatPrice(price, selectedModel.currency)}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </SectionReveal>

              {/* Step 4 — Form */}
              <SectionReveal delay={0.2}>
                <h2 className="font-display font-bold mb-6" style={{ fontSize:'1.8rem', color:'var(--cream)' }}>
                  04 — Your <em className="italic font-light" style={{ color:'var(--gold-hi)' }}>Details</em>
                </h2>
                {submitted ? (
                  <div className="p-8 text-center" style={{ border:'1px solid rgba(192,154,90,.3)', background:'rgba(192,154,90,.06)' }}>
                    <span className="font-heading text-2xl block mb-2" style={{ color:'var(--gold)' }}>SUBMITTED</span>
                    <p className="font-body font-light text-[0.82rem]" style={{ color:'var(--dim)' }}>A Velox specialist will contact you within 24 hours to discuss your configuration.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    {[
                      { id:'name',    label:'Full Name',      type:'text',  required:true  },
                      { id:'email',   label:'Email Address',  type:'email', required:true  },
                      { id:'phone',   label:'Phone Number',   type:'tel',   required:false },
                      { id:'country', label:'Country',        type:'text',  required:false },
                    ].map(({ id, label, type, required }) => (
                      <div key={id}>
                        <label htmlFor={`cfg-${id}`} className="font-body text-[0.56rem] tracking-[0.35em] uppercase block mb-2" style={{ color:'var(--dim)' }}>
                          {label}{required && <span aria-label="required"> *</span>}
                        </label>
                        <input id={`cfg-${id}`} type={type} required={required} autoComplete={id}
                          className="w-full bg-transparent px-4 py-3 font-body text-[0.8rem] outline-none transition-colors duration-300 focus:ring-1 focus:ring-[var(--gold)]"
                          style={{ border:'1px solid var(--faint)', color:'var(--cream)' }}
                          onFocus={e => { e.target.style.borderColor = 'rgba(192,154,90,.45)' }}
                          onBlur={e  => { e.target.style.borderColor = 'var(--faint)' }}
                        />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="cfg-notes" className="font-body text-[0.56rem] tracking-[0.35em] uppercase block mb-2" style={{ color:'var(--dim)' }}>
                        Additional Notes
                      </label>
                      <textarea id="cfg-notes" rows={3}
                        className="w-full bg-transparent px-4 py-3 font-body text-[0.8rem] outline-none transition-colors duration-300 resize-none focus:ring-1 focus:ring-[var(--gold)]"
                        style={{ border:'1px solid var(--faint)', color:'var(--cream)' }}
                        onFocus={e => { e.target.style.borderColor = 'rgba(192,154,90,.45)' }}
                        onBlur={e  => { e.target.style.borderColor = 'var(--faint)' }}
                      />
                    </div>
                    <Button type="submit" variant="gold" size="lg" className="w-full justify-center mt-2">
                      Submit Configuration
                    </Button>
                  </form>
                )}
              </SectionReveal>
            </div>

            {/* Summary sidebar */}
            <div className="lg:sticky lg:top-28">
              <SectionReveal delay={0.3}>
                <div style={{ border:'1px solid var(--faint)', background:'var(--ink)' }} aria-label="Configuration summary" role="region">
                  <div className="overflow-hidden" style={{ height:220 }}>
                    <img src={selectedModel.gallery[0]} alt={selectedModel.name} className="w-full h-full object-cover" style={{ filter:'brightness(0.8)', objectPosition:'center 30%' }} loading="lazy" />
                  </div>
                  <div className="p-6">
                    <Tag className="mb-4">Your Configuration</Tag>
                    <dl className="space-y-3 mt-4">
                      <div className="flex justify-between">
                        <dt className="font-body text-[0.7rem]" style={{ color:'var(--dim)' }}>Model</dt>
                        <dd className="font-body font-semibold text-[0.7rem]" style={{ color:'var(--cream)' }}>{selectedModel.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="font-body text-[0.7rem]" style={{ color:'var(--dim)' }}>Colour</dt>
                        <dd className="font-body font-semibold text-[0.7rem]" style={{ color:'var(--cream)' }}>{selectedModel.colors[selectedColor].name}</dd>
                      </div>
                      {selectedExtras.length > 0 && (
                        <div>
                          <dt className="font-body text-[0.7rem] block mb-1" style={{ color:'var(--dim)' }}>Options</dt>
                          {EXTRAS.filter(e => selectedExtras.includes(e.id)).map(e => (
                            <dd key={e.id} className="flex justify-between ml-3 mb-1">
                              <span className="font-body text-[0.65rem]" style={{ color:'var(--dim)' }}>+ {e.label}</span>
                              <span className="font-body text-[0.65rem]" style={{ color:'var(--dim)' }}>+{formatPrice(e.price, selectedModel.currency)}</span>
                            </dd>
                          ))}
                        </div>
                      )}
                    </dl>
                    <div className="mt-6 pt-5 flex justify-between items-center" style={{ borderTop:'1px solid var(--faint)' }}>
                      <span className="font-body font-semibold text-[0.62rem] tracking-[0.3em] uppercase" style={{ color:'var(--dim)' }}>Total</span>
                      <span className="font-display font-bold" style={{ fontSize:'1.5rem', color:'var(--gold)' }}>{formatPrice(totalPrice, selectedModel.currency)}</span>
                    </div>
                    <p className="font-body text-[0.58rem] mt-2" style={{ color:'rgba(240,233,220,.22)' }}>* Excluding taxes and delivery. Final price confirmed by specialist.</p>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
