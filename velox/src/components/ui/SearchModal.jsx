import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { MODELS } from '@data/models'
import { TIMELINE } from '@data/timeline'
import { formatPrice } from '@utils/helpers'

// ── Build searchable index ────────────────────────────────────────
const INDEX = [
  // Pages
  { type: 'page',  label: 'Home',        path: '/',            desc: 'Back to the homepage' },
  { type: 'page',  label: 'All Models',  path: '/models',      desc: 'Browse the full 2025 collection' },
  { type: 'page',  label: 'Heritage',    path: '/heritage',    desc: 'Our story since 1962' },
  { type: 'page',  label: 'Performance', path: '/performance', desc: '680hp, 2.8s, 340km/h' },
  { type: 'page',  label: 'Interior',    path: '/interior',    desc: 'Hand-crafted cabin' },
  { type: 'page',  label: 'Configure',   path: '/configure',   desc: 'Build your Velox' },
  { type: 'page',  label: 'Contact',     path: '/contact',     desc: 'Get in touch with us' },

  // Models
  ...MODELS.map(m => ({
    type:  'model',
    label: `Velox ${m.name}`,
    path:  `/models/${m.slug}`,
    desc:  `${m.specs.power} · ${m.specs.acceleration} · From ${formatPrice(m.price, m.currency)}`,
    badge: m.badge,
    img:   m.gallery[0],
  })),

  // Configure shortcuts
  ...MODELS.map(m => ({
    type:  'configure',
    label: `Configure ${m.name}`,
    path:  `/configure/${m.slug}`,
    desc:  `Build your ${m.name} — from ${formatPrice(m.price, m.currency)}`,
  })),

  // Timeline milestones
  ...TIMELINE.slice(-5).map(t => ({
    type:  'heritage',
    label: `${t.year} — ${t.title}`,
    path:  '/heritage',
    desc:  t.desc,
  })),
]

function search(query) {
  if (!query.trim()) return []
  const q = query.toLowerCase()
  return INDEX
    .filter(item =>
      item.label.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.path.toLowerCase().includes(q)
    )
    .slice(0, 8)
}

const TYPE_ICONS = {
  page:      '↗',
  model:     '🚗',
  configure: '⚙',
  heritage:  '◈',
}

const TYPE_LABELS = {
  page:      'Page',
  model:     'Model',
  configure: 'Configure',
  heritage:  'Heritage',
}

// ── Store ─────────────────────────────────────────────────────────
import { create } from 'zustand'
export const useSearchStore = create(set => ({
  open:    false,
  openSearch:  () => set({ open: true }),
  closeSearch: () => set({ open: false }),
}))

// ── Component ─────────────────────────────────────────────────────
export default function SearchModal() {
  const { open, closeSearch } = useSearchStore()
  const [query,   setQuery]   = useState('')
  const [results, setResults] = useState([])
  const [active,  setActive]  = useState(0)
  const inputRef  = useRef(null)
  const navigate  = useNavigate()
  const prefersReduced = useReducedMotion()

  // Run search when query changes
  useEffect(() => {
    setResults(search(query))
    setActive(0)
  }, [query])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setResults([])
    }
  }, [open])

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        open ? closeSearch() : useSearchStore.getState().openSearch()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeSearch])

  // Arrow keys + Enter navigation
  const onKeyDown = useCallback((e) => {
    if (e.key === 'Escape') { closeSearch(); return }
    if (results.length === 0) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActive(a => Math.max(a - 1, 0)) }
    if (e.key === 'Enter' && results[active]) {
      navigate(results[active].path)
      closeSearch()
    }
  }, [results, active, closeSearch, navigate])

  const go = (path) => { navigate(path); closeSearch() }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="search-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[8000]"
            style={{ background: 'rgba(5,5,5,.85)', backdropFilter: 'blur(8px)' }}
            onClick={closeSearch}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="search-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0, y: prefersReduced ? 0 : -24, scale: prefersReduced ? 1 : 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22,1,0.36,1] } }}
            exit={{    opacity: 0, y: prefersReduced ? 0 : -12, scale: prefersReduced ? 1 : 0.97, transition: { duration: 0.2 } }}
            className="fixed top-[10vh] left-1/2 z-[8001] w-full max-w-[600px] -translate-x-1/2"
            style={{ padding: '0 1rem' }}
          >
            <div style={{ background: 'var(--ink)', border: '1px solid rgba(192,154,90,.25)' }}>

              {/* Input row */}
              <div
                className="flex items-center gap-3 px-5 py-4"
                style={{ borderBottom: results.length > 0 ? '1px solid var(--faint)' : 'none' }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
                  style={{ stroke: 'var(--gold)', strokeWidth: 1.5, flexShrink: 0 }}>
                  <circle cx="7" cy="7" r="5"/><line x1="11" y1="11" x2="15" y2="15"/>
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Search models, pages, heritage..."
                  aria-label="Search site"
                  aria-autocomplete="list"
                  aria-controls="search-results"
                  className="flex-1 bg-transparent font-body text-[0.88rem] outline-none"
                  style={{ color: 'var(--cream)', caretColor: 'var(--gold)' }}
                />
                <kbd
                  className="hidden md:block font-body text-[0.5rem] tracking-widest px-2 py-1"
                  style={{ background: 'var(--faint)', color: 'var(--dim)', border: '1px solid var(--faint)' }}
                  aria-label="Press Escape to close"
                >
                  ESC
                </kbd>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <ul id="search-results" role="listbox" aria-label="Search results" className="max-h-[55vh] overflow-y-auto">
                  {results.map((r, i) => (
                    <li key={r.path + r.label} role="option" aria-selected={i === active}>
                      <button
                        onClick={() => go(r.path)}
                        onMouseEnter={() => setActive(i)}
                        className="w-full flex items-center gap-4 px-5 py-3.5 text-left transition-colors duration-150 focus:outline-none"
                        style={{
                          background:  i === active ? 'rgba(192,154,90,.08)' : 'transparent',
                          borderLeft:  i === active ? '2px solid var(--gold)' : '2px solid transparent',
                        }}
                      >
                        {/* Icon / thumbnail */}
                        {r.img ? (
                          <div className="w-10 h-10 flex-shrink-0 overflow-hidden" style={{ background: 'var(--panel)' }}>
                            <img src={r.img} alt="" className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} loading="lazy" />
                          </div>
                        ) : (
                          <span
                            className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-body text-[0.9rem]"
                            style={{ background: 'var(--faint)' }}
                            aria-hidden="true"
                          >
                            {TYPE_ICONS[r.type] || '→'}
                          </span>
                        )}
                        <div className="flex-1 min-w-0">
                          <span className="font-body font-semibold text-[0.8rem] block truncate" style={{ color: i === active ? 'var(--cream)' : 'rgba(240,233,220,.7)' }}>
                            {r.label}
                          </span>
                          <span className="font-body font-light text-[0.68rem] block truncate" style={{ color: 'var(--dim)' }}>
                            {r.desc}
                          </span>
                        </div>
                        <span
                          className="font-body text-[0.48rem] tracking-[0.3em] uppercase flex-shrink-0"
                          style={{ color: 'var(--gold-lo)' }}
                        >
                          {TYPE_LABELS[r.type]}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Empty state */}
              {query.trim() && results.length === 0 && (
                <div className="px-5 py-8 text-center">
                  <p className="font-body font-light text-[0.8rem]" style={{ color: 'var(--dim)' }}>
                    No results for <em style={{ color: 'var(--cream)' }}>"{query}"</em>
                  </p>
                </div>
              )}

              {/* Footer hint */}
              {!query && (
                <div className="px-5 py-3 flex items-center gap-4 flex-wrap" style={{ borderTop: '1px solid var(--faint)' }}>
                  {[['↑↓', 'Navigate'], ['↵', 'Open'], ['Esc', 'Close']].map(([key, hint]) => (
                    <span key={key} className="flex items-center gap-1.5">
                      <kbd className="font-body text-[0.5rem] px-1.5 py-0.5" style={{ background: 'var(--faint)', color: 'var(--dim)', border: '1px solid var(--faint)' }}>{key}</kbd>
                      <span className="font-body text-[0.55rem]" style={{ color: 'rgba(240,233,220,.25)' }}>{hint}</span>
                    </span>
                  ))}
                  <span className="font-body text-[0.55rem] ml-auto" style={{ color: 'rgba(240,233,220,.2)' }}>
                    ⌘K to open anytime
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
