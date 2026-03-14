import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Layout        from '@components/layout/Layout'
import Cursor        from '@components/ui/Cursor'
import Loader        from '@components/ui/Loader'
import ScrollProgress from '@components/ui/ScrollProgress'
import ErrorBoundary from '@components/ui/ErrorBoundary'
import PageLoader    from '@components/ui/PageLoader'
import CookieBanner  from '@components/ui/CookieBanner'
import BackToTop     from '@components/ui/BackToTop'
import SearchModal   from '@components/ui/SearchModal'

import { useLoaderStore } from '@hooks/useLoaderStore'
import { useLenis }       from '@hooks/useLenis'

// ── Lazy-loaded pages ──────────────────────────────────────────
const Home        = lazy(() => import('@pages/Home'))
const Models      = lazy(() => import('@pages/Models'))
const ModelDetail = lazy(() => import('@pages/ModelDetail'))
const Configure   = lazy(() => import('@pages/Configure'))
const Heritage    = lazy(() => import('@pages/Heritage'))
const Performance = lazy(() => import('@pages/Performance'))
const Interior    = lazy(() => import('@pages/Interior'))
const Contact     = lazy(() => import('@pages/Contact'))
const NotFound    = lazy(() => import('@pages/NotFound'))

export default function App() {
  const location   = useLocation()
  const loaderDone = useLoaderStore(s => s.done)
  useLenis()

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <ErrorBoundary>
      {/* Initial page loader */}
      {!loaderDone && <Loader />}

      {/* Global UI — always visible */}
      <Cursor />
      <ScrollProgress />
      <BackToTop />
      <CookieBanner />
      <SearchModal />

      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"                element={<Home />} />
              <Route path="/models"          element={<Models />} />
              <Route path="/models/:slug"    element={<ModelDetail />} />
              <Route path="/configure"       element={<Configure />} />
              <Route path="/configure/:slug" element={<Configure />} />
              <Route path="/heritage"        element={<Heritage />} />
              <Route path="/performance"     element={<Performance />} />
              <Route path="/interior"        element={<Interior />} />
              <Route path="/contact"         element={<Contact />} />
              <Route path="*"               element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </Layout>
    </ErrorBoundary>
  )
}
