import { Link } from 'react-router-dom'
import { NAV_LINKS } from '@data/timeline'

const LEGAL = [
  { label: 'Privacy', href: '#' },
  { label: 'Legal',   href: '#' },
  { label: 'Cookies', href: '#' },
]

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative z-10 pt-16 pb-10"
      style={{ background: 'var(--black)', borderTop: '1px solid var(--faint)' }}
    >
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        {/* Top row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10"
          style={{ borderBottom: '1px solid rgba(192,154,90,.06)' }}
        >
          {/* Logo + tagline */}
          <div>
            <Link
              to="/"
              aria-label="VELOX — Return to homepage"
              className="font-heading text-3xl tracking-[0.42em] block mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
              style={{ color: 'var(--gold-lo)' }}
            >
              VELOX
            </Link>
            <span className="font-display italic text-[0.85rem]" style={{ color: 'rgba(192,154,90,.28)' }}>
              Est. 1962 — Velocity Perfected
            </span>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8 gap-y-3" role="list">
              {NAV_LINKS.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="font-body text-[0.54rem] tracking-[0.34em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    style={{ color: 'rgba(240,233,220,.22)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,233,220,.22)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/configure"
                  className="font-body text-[0.54rem] tracking-[0.34em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                  style={{ color: 'rgba(240,233,220,.22)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,233,220,.22)' }}
                >
                  Configure
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-8">
          <small className="font-body text-[0.52rem] tracking-[0.18em]" style={{ color: 'rgba(240,233,220,.12)' }}>
            <span aria-label="Copyright">©</span> {new Date().getFullYear()} Velox Automobiles S.p.A. — Milano, Italy. All rights reserved.
          </small>
          <nav aria-label="Legal links">
            <ul className="flex gap-6" role="list">
              {LEGAL.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="font-body text-[0.52rem] tracking-[0.28em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
                    style={{ color: 'rgba(240,233,220,.14)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,233,220,.14)' }}
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
