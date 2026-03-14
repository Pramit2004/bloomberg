import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '@data/timeline'
import Tag from '@components/ui/Tag'
import SectionReveal from '@components/ui/SectionReveal'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="section-pad" style={{ background: 'var(--panel)' }}>
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        <SectionReveal className="text-center mb-16">
          <Tag className="justify-center mb-4">What They Say</Tag>
          <h2 className="font-display font-bold mt-3" style={{ fontSize: 'clamp(2rem,3.8vw,3.2rem)', color: 'var(--cream)' }}>
            Owners Who <em className="italic font-light" style={{ color: 'var(--gold-hi)' }}>Know</em>
          </h2>
        </SectionReveal>

        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1] } }}
              exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
            >
              <p
                className="font-display italic font-light leading-relaxed mb-8"
                style={{ fontSize: 'clamp(1.3rem,2.5vw,2rem)', color: 'var(--cream)' }}
              >
                <span style={{ fontSize: '4rem', color: 'rgba(192,154,90,.2)', lineHeight: 0, verticalAlign: '-.2em', display: 'inline-block', marginRight: '0.1em' }}>"</span>
                {TESTIMONIALS[active].quote}
                <span style={{ fontSize: '4rem', color: 'rgba(192,154,90,.2)', lineHeight: 0, verticalAlign: '-.2em', display: 'inline-block', marginLeft: '0.1em' }}>"</span>
              </p>
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-body font-semibold text-[0.65rem]"
                  style={{ background: 'var(--gold)', color: 'var(--black)' }}
                >
                  {TESTIMONIALS[active].avatar}
                </div>
                <div className="text-left">
                  <span className="font-body font-semibold text-[0.72rem] tracking-wide block" style={{ color: 'var(--cream)' }}>
                    {TESTIMONIALS[active].name}
                  </span>
                  <span className="font-body font-light text-[0.62rem]" style={{ color: 'var(--dim)' }}>
                    {TESTIMONIALS[active].title}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  background: i === active ? 'var(--gold)' : 'rgba(192,154,90,0.25)',
                  border: 'none',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
