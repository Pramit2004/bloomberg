import Navbar   from './Navbar'
import Footer   from './Footer'
import SkipLink from '@components/ui/SkipLink'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--black)' }}>
      {/* Skip to content — first focusable element on every page */}
      <SkipLink />
      <Navbar />
      {/* id="main-content" is the skip link target */}
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
