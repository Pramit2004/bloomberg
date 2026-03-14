import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * SectionReveal — scroll-triggered fade/slide animation.
 * Automatically disabled when the user has "Reduce Motion" turned on.
 */
export default function SectionReveal({
  children,
  delay     = 0,
  direction = 'up',
  className = '',
}) {
  const prefersReduced = useReducedMotion()
  const { ref, inView } = useInView({
    threshold:    0.08,
    triggerOnce:  true,
    rootMargin:   '0px 0px -40px 0px',
  })

  // If reduce-motion is on, render immediately visible, no animation
  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up'    ?  28 : direction === 'down' ? -28 : 0,
      x: direction === 'left'  ? -36 : direction === 'right' ?  36 : 0,
    },
    visible: {
      opacity: 1, y: 0, x: 0,
      transition: {
        duration: 0.82,
        ease:     [0.22, 1, 0.36, 1],
        delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  )
}
