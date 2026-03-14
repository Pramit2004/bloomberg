import { Component } from 'react'
import { Link } from 'react-router-dom'

/**
 * ErrorBoundary — catches any JS error in child tree and shows a
 * graceful fallback instead of a white blank screen.
 * Must be a class component (React requirement for error boundaries).
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    // In production you'd send this to Sentry / LogRocket etc.
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: 'var(--black)' }}
      >
        {/* Decorative number */}
        <span
          className="font-heading block leading-none mb-6 select-none"
          style={{ fontSize: 'clamp(5rem,15vw,10rem)', color: 'rgba(192,154,90,.08)' }}
        >
          ERR
        </span>

        <h1
          className="font-display font-bold mb-4"
          style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)', color: 'var(--cream)' }}
        >
          Something Went Wrong
        </h1>

        <p
          className="font-body font-light mb-10 max-w-md"
          style={{ fontSize: '0.88rem', color: 'var(--dim)', lineHeight: 2 }}
        >
          An unexpected error occurred. Our team has been notified.
          Please try refreshing the page or return home.
        </p>

        {/* Show error detail in development only */}
        {import.meta.env.DEV && this.state.error && (
          <pre
            className="text-left text-[0.65rem] mb-10 p-5 max-w-2xl w-full overflow-auto"
            style={{
              background: 'rgba(155,35,53,.08)',
              border: '1px solid rgba(155,35,53,.3)',
              color: '#f87171',
              borderRadius: 2,
            }}
          >
            {this.state.error.toString()}
          </pre>
        )}

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => window.location.reload()}
            className="font-body font-semibold tracking-[0.4em] uppercase text-[0.58rem] px-8 py-3.5 transition-all duration-300 hover:-translate-y-px"
            style={{ background: 'var(--gold)', color: 'var(--black)', border: 'none' }}
          >
            Refresh Page
          </button>
          <Link
            to="/"
            onClick={() => this.setState({ hasError: false, error: null })}
            className="font-body font-semibold tracking-[0.4em] uppercase text-[0.58rem] px-8 py-3.5 transition-all duration-300 hover:-translate-y-px"
            style={{ border: '1px solid rgba(192,154,90,.45)', color: 'var(--gold)' }}
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }
}
