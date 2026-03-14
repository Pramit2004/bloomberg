import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { pageTransition } from '@utils/motionVariants'
import SEOHead from '@components/ui/SEOHead'
import { useSEO } from '@hooks/useSEO'

export default function NotFound() {
  const seo = useSEO({ title:'404 — Page Not Found', noIndex:true })

  return (
    <motion.div {...pageTransition} className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <SEOHead {...seo} />
      <span className="font-heading block leading-none mb-4 select-none" style={{ fontSize:'clamp(6rem,18vw,14rem)', color:'rgba(192,154,90,.08)' }} aria-hidden="true">404</span>
      <h1 className="font-display font-bold mb-4" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'var(--cream)' }}>Off the Map</h1>
      <p className="font-body font-light mb-10 max-w-sm mx-auto" style={{ fontSize:'0.88rem', color:'var(--dim)', lineHeight:2 }}>
        Even the fastest cars sometimes take a wrong turn. Let us guide you back.
      </p>
      <Link to="/" className="inline-flex items-center gap-3 font-body font-semibold tracking-[0.4em] uppercase text-[0.6rem] px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
        style={{ background:'var(--gold)', color:'var(--black)' }}>
        Return Home →
      </Link>
    </motion.div>
  )
}
