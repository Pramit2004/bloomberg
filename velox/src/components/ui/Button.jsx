import { Link } from 'react-router-dom'
import { useCursorStore } from '@hooks/useCursorStore'
import { cx } from '@utils/helpers'

const base =
  'inline-flex items-center justify-center gap-3 font-body font-semibold tracking-[0.4em] text-[0.58rem] uppercase transition-all duration-300 select-none'

const variants = {
  gold:    'bg-[var(--gold)] text-black hover:bg-[var(--gold-hi)] hover:-translate-y-px',
  outline: 'border border-[rgba(192,154,90,0.45)] text-[var(--gold)] hover:bg-[rgba(192,154,90,0.08)] hover:border-[var(--gold)]',
  ghost:   'text-[var(--cream-dim)] border-b border-transparent hover:text-[var(--cream)] hover:border-[rgba(240,233,220,0.3)]',
  dark:    'bg-[var(--ink)] text-[var(--cream)] border border-[var(--faint)] hover:border-[rgba(192,154,90,0.3)]',
}

const sizes = {
  sm: 'px-4 py-2.5',
  md: 'px-6 py-3.5',
  lg: 'px-8 py-4',
}

export default function Button({
  children,
  variant = 'gold',
  size    = 'md',
  href,
  to,
  onClick,
  className,
  arrow = false,
  disabled = false,
  type = 'button',
  cursorLabel = '',
  ...props
}) {
  const setHover = useCursorStore(s => s.setHover)

  const cls = cx(base, variants[variant], sizes[size], className, disabled && 'opacity-50 cursor-not-allowed')
  const handlers = {
    onMouseEnter: () => setHover(true, cursorLabel),
    onMouseLeave: () => setHover(false),
    onClick,
  }

  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span
          className="relative inline-block"
          style={{ width: 42, height: 1, background: 'currentColor', flexShrink: 0 }}
        >
          <span
            className="absolute right-0 top-[-3px]"
            style={{
              borderTop: '3px solid transparent',
              borderBottom: '3px solid transparent',
              borderLeft: '6px solid currentColor',
            }}
          />
        </span>
      )}
    </>
  )

  if (to) return <Link to={to} className={cls} {...handlers} {...props}>{content}</Link>
  if (href) return <a href={href} className={cls} {...handlers} {...props}>{content}</a>
  return (
    <button type={type} className={cls} disabled={disabled} {...handlers} {...props}>
      {content}
    </button>
  )
}
