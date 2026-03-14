/**
 * useSEO — centralised SEO configuration.
 * Pass a config object and it returns the complete <Helmet> props.
 *
 * Usage:
 *   const seo = useSEO({ title: 'Models', description: '...' })
 *   Then spread into <SEOHead {...seo} />
 */

const SITE_URL  = import.meta.env.VITE_SITE_URL  || 'https://velox-automobiles.com'
const SITE_NAME = import.meta.env.VITE_APP_NAME  || 'VELOX Automobiles'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

export function useSEO({
  title,
  description,
  canonical,
  ogImage,
  ogType   = 'website',
  noIndex  = false,
  jsonLd   = null,
} = {}) {
  const fullTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${SITE_NAME} | Pure Velocity`

  const canonicalUrl = canonical
    ? `${SITE_URL}${canonical}`
    : typeof window !== 'undefined' ? window.location.href : SITE_URL

  return {
    fullTitle,
    description,
    canonicalUrl,
    ogImage: ogImage || DEFAULT_OG_IMAGE,
    ogType,
    noIndex,
    jsonLd,
    siteName: SITE_NAME,
    siteUrl:  SITE_URL,
  }
}
