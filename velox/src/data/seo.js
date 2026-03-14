/**
 * SEO data — JSON-LD structured data schemas for every page.
 * Google uses these for rich results (product cards, breadcrumbs etc.)
 */

const SITE_URL  = import.meta.env.VITE_SITE_URL || 'https://velox-automobiles.com'
const SITE_NAME = 'VELOX Automobiles'
const LOGO_URL  = `${SITE_URL}/favicon.svg`

// ── Organisation (used on every page) ────────────────────────
export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type':    'Organization',
  name:       SITE_NAME,
  url:        SITE_URL,
  logo:       LOGO_URL,
  description:'Handcrafted luxury supercars from Milan since 1962.',
  foundingDate: '1962',
  address: {
    '@type':          'PostalAddress',
    streetAddress:    'Via Monte Napoleone 12',
    addressLocality:  'Milan',
    addressCountry:   'IT',
    postalCode:       '20121',
  },
  sameAs: [
    'https://twitter.com/veloxautos',
    'https://instagram.com/veloxautos',
    'https://facebook.com/veloxautos',
  ],
}

// ── Website search box ────────────────────────────────────────
export const websiteSchema = {
  '@context':  'https://schema.org',
  '@type':     'WebSite',
  name:        SITE_NAME,
  url:         SITE_URL,
  description: 'Handcrafted luxury supercars. Configure yours today.',
}

// ── BreadcrumbList helper ─────────────────────────────────────
export function breadcrumbSchema(items) {
  return {
    '@context':    'https://schema.org',
    '@type':       'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       item.name,
      item:       `${SITE_URL}${item.path}`,
    })),
  }
}

// ── Car product schema builder ────────────────────────────────
export function carSchema(model) {
  return {
    '@context':   'https://schema.org',
    '@type':      'Car',
    name:         `Velox ${model.name}`,
    description:  model.description,
    brand: {
      '@type': 'Brand',
      name:    SITE_NAME,
    },
    model:           model.name,
    vehicleModelDate: '2025',
    offers: {
      '@type':         'Offer',
      priceCurrency:   'GBP',
      price:            model.price,
      availability:    'https://schema.org/InStock',
      url:             `${SITE_URL}/models/${model.slug}`,
      seller: {
        '@type': 'Organization',
        name:    SITE_NAME,
      },
    },
    image: model.hero,
    url:   `${SITE_URL}/models/${model.slug}`,
    additionalProperty: Object.entries(model.specs).map(([name, value]) => ({
      '@type': 'PropertyValue',
      name,
      value,
    })),
  }
}

// ── Models list page schema ───────────────────────────────────
export function modelsListSchema(models) {
  return {
    '@context': 'https://schema.org',
    '@type':    'ItemList',
    name:       'Velox 2025 Collection',
    description:'Three luxury supercars — Atreo X, GTS and E.',
    numberOfItems: models.length,
    itemListElement: models.map((m, i) => ({
      '@type':    'ListItem',
      position:   i + 1,
      name:       `Velox ${m.name}`,
      url:        `${SITE_URL}/models/${m.slug}`,
      image:      m.hero,
    })),
  }
}

// ── FAQ schema (used on Performance page) ────────────────────
export const performanceFaqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type':          'Question',
      name:             'What is the 0-100 time of the Velox Atreo X?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'The Velox Atreo X accelerates from 0–100 km/h in 2.8 seconds.',
      },
    },
    {
      '@type':          'Question',
      name:             'What engine does the Velox Atreo X have?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'A 4.0-litre twin-turbocharged V8 producing 680 horsepower and 850 Nm of torque.',
      },
    },
    {
      '@type':          'Question',
      name:             'How fast is the Velox Atreo X top speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'The Velox Atreo X has a top speed of 340 km/h.',
      },
    },
    {
      '@type':          'Question',
      name:             'Is there an electric Velox?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:    'Yes — the Velox Atreo E features four electric motors producing 750hp with a 520km range.',
      },
    },
  ],
}

// ── Contact page LocalBusiness schema ────────────────────────
export const localBusinessSchema = {
  '@context':   'https://schema.org',
  '@type':      'AutoDealer',
  name:         SITE_NAME,
  url:          SITE_URL,
  logo:         LOGO_URL,
  description:  'Luxury supercar manufacturer and dealer. Showrooms in Milan, London, Dubai and New York.',
  telephone:    '+39 02 7600 0000',
  address: {
    '@type':         'PostalAddress',
    streetAddress:   'Via Monte Napoleone 12',
    addressLocality: 'Milan',
    addressCountry:  'IT',
    postalCode:      '20121',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '16:00' },
  ],
}
