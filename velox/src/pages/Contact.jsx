import { motion } from 'framer-motion'
import { useState } from 'react'
import { pageTransition } from '@utils/motionVariants'
import { useSEO } from '@hooks/useSEO'
import SEOHead from '@components/ui/SEOHead'
import { localBusinessSchema, breadcrumbSchema } from '@data/seo'
import { useForm, required, email, phone, minLength } from '@hooks/useForm'
import FormField from '@components/ui/FormField'
import SectionReveal from '@components/ui/SectionReveal'
import Tag from '@components/ui/Tag'
import Button from '@components/ui/Button'
import toast from 'react-hot-toast'

const ENQUIRY_TYPES = ['Test Drive','Model Information','Configure','Dealer Enquiry','Press','Other']
const LOCATIONS = [
  { city:'Milan',    country:'Italy',          address:'Via Monte Napoleone 12, 20121', phone:'+39 02 7600 0000' },
  { city:'London',   country:'United Kingdom', address:'42 Berkeley Square, W1J 5AW',  phone:'+44 20 7629 0000' },
  { city:'Dubai',    country:'UAE',            address:'DIFC Gate Village, Building 3', phone:'+971 4 123 0000' },
  { city:'New York', country:'United States',  address:'767 Fifth Avenue, NY 10153',   phone:'+1 212 000 0000'  },
]

export default function Contact() {
  const [type,      setType]      = useState(ENQUIRY_TYPES[0])
  const [submitted, setSubmitted] = useState(false)

  const seo = useSEO({
    title:'Contact', description:'Contact Velox — book a test drive, enquire about a model, or visit a showroom in Milan, London, Dubai or New York.',
    canonical:'/contact', jsonLd:[localBusinessSchema, breadcrumbSchema([{name:'Home',path:'/'},{name:'Contact',path:'/contact'}])],
  })

  const { values, errors, touched, handleChange, handleBlur, validate } = useForm({
    initialValues: { fname:'', lname:'', email:'', phone:'', city:'', message:'' },
    validators: {
      fname:   required('First name'),
      lname:   required('Last name'),
      email:   email,
      phone:   phone,
      message: minLength(10, 'Message'),
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Please fix the errors above before submitting.')
      return
    }
    setSubmitted(true)
    toast.success('Message received. A Velox specialist will respond within 24 hours.')
  }

  return (
    <motion.div {...pageTransition}>
      <SEOHead {...seo} />
      <section className="pt-40 pb-20" style={{ background:'var(--ink)', borderBottom:'1px solid var(--faint)' }}>
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <Tag className="mb-5">Get in Touch</Tag>
          <h1 className="font-heading" style={{ fontSize:'clamp(3rem,7vw,7rem)', color:'var(--cream)', lineHeight:0.88 }}>
            LET&rsquo;S<br /><span style={{ color:'var(--gold)' }}>TALK</span>
          </h1>
        </div>
      </section>

      <section className="section-pad">
        <div className="max-w-[1260px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-16 items-start">
            <SectionReveal>
              {submitted ? (
                <div className="py-16 text-center" style={{ border:'1px solid rgba(192,154,90,.3)', background:'rgba(192,154,90,.04)' }} role="alert">
                  <span className="font-heading text-3xl block mb-4" style={{ color:'var(--gold)' }}>THANK YOU</span>
                  <p className="font-body font-light" style={{ fontSize:'0.88rem', color:'var(--dim)' }}>
                    A Velox specialist will respond within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate aria-label="Contact form">
                  {/* Enquiry type */}
                  <fieldset>
                    <legend className="font-body text-[0.56rem] tracking-[0.35em] uppercase block mb-3" style={{ color:'var(--dim)' }}>
                      Enquiry Type *
                    </legend>
                    <div className="flex flex-wrap gap-2" role="radiogroup">
                      {ENQUIRY_TYPES.map(t => (
                        <button key={t} type="button" onClick={() => setType(t)}
                          role="radio" aria-checked={type === t}
                          className="px-4 py-2 font-body text-[0.6rem] tracking-[0.28em] uppercase transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                          style={{ border:`1px solid ${type===t?'var(--gold)':'var(--faint)'}`, background:type===t?'rgba(192,154,90,.1)':'transparent', color:type===t?'var(--gold)':'var(--dim)' }}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  {/* Name row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id="ct-fname" name="fname" label="First Name" required
                      value={values.fname} error={errors.fname} touched={touched.fname}
                      onChange={handleChange} onBlur={handleBlur} autoComplete="given-name" />
                    <FormField id="ct-lname" name="lname" label="Last Name" required
                      value={values.lname} error={errors.lname} touched={touched.lname}
                      onChange={handleChange} onBlur={handleBlur} autoComplete="family-name" />
                  </div>

                  <FormField id="ct-email" name="email" label="Email Address" type="email" required
                    value={values.email} error={errors.email} touched={touched.email}
                    onChange={handleChange} onBlur={handleBlur} autoComplete="email" />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id="ct-phone" name="phone" label="Phone" type="tel"
                      value={values.phone} error={errors.phone} touched={touched.phone}
                      onChange={handleChange} onBlur={handleBlur} autoComplete="tel" />
                    <FormField id="ct-city" name="city" label="City"
                      value={values.city} error={errors.city} touched={touched.city}
                      onChange={handleChange} onBlur={handleBlur} />
                  </div>

                  <FormField id="ct-msg" name="message" label="Message" required rows={5}
                    placeholder="Tell us how we can help..."
                    value={values.message} error={errors.message} touched={touched.message}
                    onChange={handleChange} onBlur={handleBlur} />

                  <Button type="submit" variant="gold" size="lg" className="w-full justify-center">
                    Send Enquiry →
                  </Button>
                </form>
              )}
            </SectionReveal>

            <SectionReveal delay={0.15}>
              <div>
                <Tag className="mb-8">Our Showrooms</Tag>
                <div className="space-y-4" role="list" aria-label="Showroom locations">
                  {LOCATIONS.map(({ city, country, address, phone:ph }) => (
                    <address key={city} role="listitem" className="not-italic p-5 transition-all duration-300" style={{ border:'1px solid var(--faint)', background:'var(--ink)', display:'block' }}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-display font-bold" style={{ fontSize:'1.15rem', color:'var(--cream)' }}>{city}</span>
                        <span className="font-body text-[0.52rem] tracking-[0.3em] uppercase" style={{ color:'var(--gold-lo)' }}>{country}</span>
                      </div>
                      <p className="font-body font-light text-[0.72rem] mb-1" style={{ color:'var(--dim)' }}>{address}</p>
                      <a href={`tel:${ph.replace(/\s/g,'')}`} className="font-body font-medium text-[0.7rem] transition-colors duration-300" style={{ color:'var(--gold)' }}
                        onMouseEnter={e=>{e.target.style.color='var(--gold-hi)'}} onMouseLeave={e=>{e.target.style.color='var(--gold)'}}>
                        {ph}
                      </a>
                    </address>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
