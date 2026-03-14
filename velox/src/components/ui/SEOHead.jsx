import { Helmet } from 'react-helmet-async'

/**
 * SEOHead — renders all <head> meta tags for a page.
 * Handles: title, description, canonical, Open Graph,
 * Twitter Card, robots, and JSON-LD structured data.
 *
 * Usage:
 *   <SEOHead
 *     title="Models"
 *     description="Explore the 2025 Velox collection."
 *     canonical="/models"
 *     ogImage="https://images.unsplash.com/..."
 *     jsonLd={{ '@type': 'ItemList', ... }}
 *   />
 */
export default function SEOHead({
  fullTitle,
  description,
  canonicalUrl,
  ogImage,
  ogType  = 'website',
  noIndex = false,
  jsonLd  = null,
  siteName,
}) {
  return (
    <Helmet>
      {/* ── Primary ── */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* ── Open Graph ── */}
      <meta property="og:title"       content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonicalUrl} />
      {ogImage && <meta property="og:image"        content={ogImage} />}
      {ogImage && <meta property="og:image:width"  content="1200" />}
      {ogImage && <meta property="og:image:height" content="630" />}
      {siteName && <meta property="og:site_name"    content={siteName} />}
      <meta property="og:locale"      content="en_GB" />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image"       content={ogImage} />}

      {/* ── JSON-LD Structured Data ── */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  )
}
