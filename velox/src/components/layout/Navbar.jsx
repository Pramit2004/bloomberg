import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@data/timeline'
import { useCursorStore } from '@hooks/useCursorStore'
import { useSearchStore } from '@components/ui/SearchModal'

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location   = useLocation()
  const setHover   = useCursorStore(s => s.setHover)
  const menuBtnRef = useRef(null)
  const firstLinkRef = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 70)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Close menu on route change, return focus to hamburger
  useEffect(() => {
    if (menuOpen) {
      setMenuOpen(false)
      document.body.style.overflow = ''
      menuBtnRef.current?.focus()
    }
  }, [location.pathname])

  // Trap focus inside open menu & close on Escape
  useEffect(() => {
    if (!menuOpen) return
    firstLinkRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        document.body.style.overflow = ''
        menuBtnRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen])

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <header role="banner">
        <nav
          aria-label="Main navigation"
          className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-16"
          style={scrolled ? { background: 'rgba(5,5,5,0.94)', backdropFilter: 'blur(18px)' } : {}}
        >
          {/* Logo */}
          <Link
            to="/"
            aria-label="VELOX — Return to homepage"
            className="font-heading text-2xl tracking-[0.42em] z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            style={{ color: 'var(--gold)' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            VELOX
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex gap-9 items-center" role="list">
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    'relative font-body text-[0.58rem] font-medium tracking-[0.42em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ' +
                    (isActive ? 'text-[var(--gold)]' : 'text-[var(--dim)] hover:text-[var(--cream)]')
                  }
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      <span aria-hidden="true"
                        className="absolute -bottom-1 left-0 right-0 h-px transition-transform duration-300 origin-left"
                        style={{ background: 'var(--gold)', transform: isActive ? 'scaleX(1)' : 'scaleX(0)' }}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop Search */}
          <button
            onClick={() => useSearchStore.getState().openSearch()}
            aria-label="Search (Ctrl+K)"
            className="hidden md:flex items-center gap-2 font-body text-[0.58rem] font-medium tracking-[0.35em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] px-3 py-2"
            style={{ color: 'var(--dim)', background: 'transparent', border: 'none' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"
              style={{ stroke: 'currentColor', strokeWidth: 1.5 }}>
              <circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="15" y2="15"/>
            </svg>
            Search
          </button>

          {/* Desktop CTA */}
          <Link
            to="/configure"
            className="hidden md:inline-flex items-center font-body text-[0.58rem] font-semibold tracking-[0.38em] uppercase px-5 py-2.5 transition-all duration-300 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
            style={{ background: 'var(--gold)', color: 'var(--black)' }}
            onMouseEnter={() => setHover(true, 'Configure')}
            onMouseLeave={() => setHover(false)}
          >
            Configure
          </Link>

          {/* Hamburger — mobile only */}
          <button
            ref={menuBtnRef}
            onClick={toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden flex flex-col gap-[5px] p-2 z-[510] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} aria-hidden="true"
                className="block w-[22px] h-px transition-all duration-300"
                style={{
                  background: 'var(--gold)',
                  transform: menuOpen
                    ? i === 0 ? 'rotate(45deg) translate(3px, 4px)'
                    : i === 2 ? 'rotate(-45deg) translate(3px, -4px)'
                    : 'none'
                    : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            key="mob-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[490] flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(20px)' }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-6" role="list">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.li key={path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: i * 0.07 + 0.1 } }}
                  >
                    <Link
                      ref={i === 0 ? firstLinkRef : undefined}
                      to={path}
                      className="font-heading text-[2.2rem] tracking-[0.22em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] block"
                      style={{ color: 'var(--dim)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)' }}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: NAV_LINKS.length * 0.07 + 0.1 } }}
              className="mt-4"
            >
              <Link
                to="/configure"
                className="font-body text-[0.65rem] font-semibold tracking-[0.4em] uppercase px-8 py-4 block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--black)]"
                style={{ background: 'var(--gold)', color: 'var(--black)' }}
              >
                Configure Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
