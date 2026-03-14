/**
 * SkipLink — invisible until focused by keyboard.
 * Allows keyboard / screen-reader users to skip the navigation
 * and jump straight to main content. WCAG 2.4.1 requirement.
 *
 * Place this as the VERY FIRST element inside <body>.
 * The target element must have id="main-content".
 */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only"
      style={{
        position:      'fixed',
        top:           '1rem',
        left:          '1rem',
        zIndex:        99999,
        padding:       '0.75rem 1.5rem',
        background:    'var(--gold)',
        color:         'var(--black)',
        fontFamily:    "'Montserrat', sans-serif",
        fontSize:      '0.7rem',
        fontWeight:    700,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        textDecoration:'none',
        outline:       'none',
        // Tailwind's sr-only hides it; focus:not-sr-only reveals it
      }}
    >
      Skip to main content
    </a>
  )
}
