/**
 * PageLoader — lightweight fallback shown by <Suspense> while a
 * lazy-loaded route chunk is being fetched.
 * Intentionally minimal so it renders instantly.
 */
export default function PageLoader() {
  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center gap-6 z-50"
      style={{ background: 'var(--black)' }}
    >
      {/* Pulsing logo mark */}
      <span
        className="font-heading tracking-[0.5em] select-none"
        style={{
          fontSize: '2.2rem',
          color: 'var(--gold)',
          animation: 'pagePulse 1.4s ease-in-out infinite',
        }}
      >
        VELOX
      </span>

      {/* Animated bar */}
      <div
        className="overflow-hidden"
        style={{ width: 120, height: 1, background: 'rgba(192,154,90,.15)' }}
      >
        <div
          style={{
            height: '100%',
            background: 'var(--gold)',
            animation: 'pageBar 1.4s ease-in-out infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes pagePulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1;   }
        }
        @keyframes pageBar {
          0%   { width: 0%;   margin-left: 0;    }
          50%  { width: 100%; margin-left: 0;    }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  )
}
