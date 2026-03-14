import ParallaxImage from '@components/ui/ParallaxImage'
import SectionReveal from '@components/ui/SectionReveal'

export default function QuoteBanner({
  img,
  quote,
  author,
  speed = 0.26,
  brightness = 0.36,
  height = '70vh',
  minHeight = 440,
}) {
  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height, minHeight }}
    >
      <ParallaxImage src={img} alt="" speed={speed} brightness={brightness} />
      <div className="absolute inset-0" style={{ background: 'rgba(5,5,5,.4)' }} />
      <SectionReveal className="relative z-10 text-center px-6 max-w-[800px]">
        <blockquote
          className="font-display font-light italic leading-[1.45]"
          style={{ fontSize: 'clamp(1.7rem, 3.8vw, 3.2rem)', color: 'var(--cream)' }}
        >
          <span
            className="font-display inline-block align-[-.26em]"
            style={{ fontSize: '5.5rem', color: 'rgba(192,154,90,.2)', lineHeight: 0, margin: '0 0.1em' }}
          >
            "
          </span>
          {quote}
          <span
            className="font-display inline-block align-[-.26em]"
            style={{ fontSize: '5.5rem', color: 'rgba(192,154,90,.2)', lineHeight: 0, margin: '0 0.1em' }}
          >
            "
          </span>
        </blockquote>
        {author && (
          <p className="font-body font-normal tracking-[0.55em] uppercase mt-8 text-[0.54rem]"
            style={{ color: 'var(--gold-lo)' }}>
            — {author}
          </p>
        )}
      </SectionReveal>
    </section>
  )
}
