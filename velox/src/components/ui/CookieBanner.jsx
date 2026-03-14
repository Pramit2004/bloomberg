import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const STORAGE_KEY = 'velox-cookie-consent'

/**
 * CookieBanner — GDPR-compliant cookie consent.
 * Stores preference in localStorage.
 * Fires a custom event 'velox:consent' so analytics can listen.
 */
export default function CookieBanner() {
  const [visible,  setVisible]  = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs] = useState({
    necessary:  true,   // always on
    analytics:  false,
    marketing:  false,
  })

  useEffect(() => {
    // Only show if no decision has been stored yet
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Small delay so it doesn't pop up instantly on page load
      const t = setTimeout(() => setVisible(true), 1800)
      return () => clearTimeout(t)
    }
  }, [])

  const accept = (all = false) => {
    const consent = all
      ? { necessary: true, analytics: true, marketing: true }
      : prefs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    window.dispatchEvent(new CustomEvent('velox:consent', { detail: consent }))
    setVisible(false)
  }

  const decline = () => {
    const consent = { necessary: true, analytics: false, marketing: false }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
    window.dispatchEvent(new CustomEvent('velox:consent', { detail: consent }))
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0,   opacity: 1, transition: { duration: 0.5, ease: [0.22,1,0.36,1], delay: 0.1 } }}
          exit={{    y: 120, opacity: 0, transition: { duration: 0.35 } }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 left-0 right-0 z-[9500] md:bottom-6 md:left-6 md:right-auto md:max-w-[460px]"
        >
          <div
            className="p-6 md:p-7"
            style={{
              background:  'rgba(12,12,12,0.97)',
              border:      '1px solid rgba(192,154,90,.2)',
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span
                  className="font-heading text-[1rem] tracking-[0.25em] block mb-0.5"
                  style={{ color: 'var(--gold)' }}
                >
                  COOKIES
                </span>
                <p
                  className="font-body font-light text-[0.76rem] leading-[1.8]"
                  style={{ color: 'var(--dim)' }}
                >
                  We use cookies to enhance your experience. You can manage your preferences below.{' '}
                  <Link
                    to="#"
                    className="underline focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--gold)]"
                    style={{ color: 'var(--gold)' }}
                  >
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* Expandable preferences */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  key="prefs"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.22,1,0.36,1] } }}
                  exit={{    height: 0,      opacity: 0, transition: { duration: 0.25 } }}
                  className="overflow-hidden mb-4"
                >
                  <div
                    className="space-y-3 pt-4"
                    style={{ borderTop: '1px solid var(--faint)' }}
                  >
                    {[
                      { key: 'necessary', label: 'Necessary',      desc: 'Required for the site to function.',          locked: true  },
                      { key: 'analytics', label: 'Analytics',      desc: 'Help us understand how visitors use the site.', locked: false },
                      { key: 'marketing', label: 'Marketing',      desc: 'Used to show relevant advertisements.',         locked: false },
                    ].map(({ key, label, desc, locked }) => (
                      <label
                        key={key}
                        className="flex items-start justify-between gap-4"
                        htmlFor={`cookie-${key}`}
                      >
                        <div>
                          <span
                            className="font-body font-semibold text-[0.68rem] tracking-[0.2em] uppercase block mb-0.5"
                            style={{ color: locked ? 'var(--dim)' : 'var(--cream)' }}
                          >
                            {label}
                            {locked && <span className="ml-2 text-[0.5rem] opacity-50">(Always on)</span>}
                          </span>
                          <span
                            className="font-body font-light text-[0.65rem]"
                            style={{ color: 'rgba(240,233,220,.35)' }}
                          >
                            {desc}
                          </span>
                        </div>
                        {/* Toggle */}
                        <button
                          id={`cookie-${key}`}
                          role="switch"
                          aria-checked={prefs[key]}
                          disabled={locked}
                          onClick={() => !locked && setPrefs(p => ({ ...p, [key]: !p[key] }))}
                          className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-full"
                          style={{
                            width: 36, height: 20,
                            background: prefs[key] ? 'var(--gold)' : 'rgba(240,233,220,.15)',
                            border: 'none',
                            borderRadius: 10,
                            position: 'relative',
                            transition: 'background .25s',
                            opacity: locked ? 0.5 : 1,
                            cursor: locked ? 'not-allowed' : 'pointer',
                          }}
                        >
                          <span
                            style={{
                              position: 'absolute',
                              top: 3, left: prefs[key] ? 18 : 3,
                              width: 14, height: 14,
                              borderRadius: '50%',
                              background: 'white',
                              transition: 'left .22s cubic-bezier(.22,1,.36,1)',
                            }}
                          />
                        </button>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2 mt-2">
              <button
                onClick={() => accept(true)}
                className="flex-1 font-body text-[0.58rem] font-semibold tracking-[0.35em] uppercase py-3 transition-all duration-300 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--black)]"
                style={{ background: 'var(--gold)', color: 'var(--black)', border: 'none', minWidth: 100 }}
              >
                Accept All
              </button>
              <button
                onClick={() => setExpanded(e => !e)}
                className="font-body text-[0.58rem] font-medium tracking-[0.3em] uppercase py-3 px-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                style={{ background: 'transparent', border: '1px solid rgba(192,154,90,.35)', color: 'var(--gold)' }}
                aria-expanded={expanded}
              >
                {expanded ? 'Hide' : 'Manage'}
              </button>
              {expanded ? (
                <button
                  onClick={() => accept(false)}
                  className="font-body text-[0.58rem] font-medium tracking-[0.3em] uppercase py-3 px-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ background: 'transparent', border: '1px solid var(--faint)', color: 'var(--dim)' }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={decline}
                  className="font-body text-[0.58rem] font-medium tracking-[0.3em] uppercase py-3 px-4 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ background: 'transparent', border: '1px solid var(--faint)', color: 'var(--dim)' }}
                >
                  Decline
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
