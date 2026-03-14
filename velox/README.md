# VELOX Automobiles

> Premium luxury supercar brand website — React + Vite + Tailwind CSS + Framer Motion

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start dev server (works in GitHub Codespace automatically)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
velox/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx        # App shell wrapper
│   │   │   ├── Navbar.jsx        # Responsive nav + mobile drawer
│   │   │   └── Footer.jsx
│   │   ├── sections/
│   │   │   ├── HeroSection.jsx   # Full-screen hero + mouse parallax
│   │   │   ├── SpecsRibbon.jsx   # Performance stats bar
│   │   │   ├── StorySection.jsx  # Brand story split layout
│   │   │   ├── ModelsGrid.jsx    # 3-column models with hover
│   │   │   ├── InteriorShowcase.jsx
│   │   │   ├── QuoteBanner.jsx   # Reusable parallax quote section
│   │   │   ├── TimelineSection.jsx # Heritage timeline
│   │   │   ├── StatsSection.jsx  # Animated count-up stats
│   │   │   ├── TestimonialsSection.jsx
│   │   │   └── OutroSection.jsx
│   │   └── ui/
│   │       ├── Button.jsx        # Multi-variant button
│   │       ├── Cursor.jsx        # Custom GPU cursor
│   │       ├── Loader.jsx        # Image-tracking loader
│   │       ├── Marquee.jsx       # Gold ticker bar
│   │       ├── ParallaxImage.jsx # GPU parallax image wrapper
│   │       ├── ScrollProgress.jsx
│   │       ├── SectionReveal.jsx # Scroll-triggered fade/slide
│   │       └── Tag.jsx
│   ├── data/
│   │   ├── models.js             # All 3 car models with full data
│   │   └── timeline.js           # Timeline, stats, nav, testimonials
│   ├── hooks/
│   │   ├── useCursorStore.js     # Zustand cursor state
│   │   ├── useLenis.js           # Smooth scroll (Lenis)
│   │   ├── useLoaderStore.js     # Zustand loader state
│   │   ├── useParallax.js        # GPU parallax hook
│   │   └── useReveal.js          # IntersectionObserver reveal
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Models.jsx
│   │   ├── ModelDetail.jsx       # Dynamic route /models/:slug
│   │   ├── Configure.jsx         # Full configurator with form
│   │   ├── Heritage.jsx
│   │   ├── Performance.jsx
│   │   ├── Interior.jsx
│   │   ├── Contact.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── index.css             # Tailwind + custom CSS tokens
│   ├── utils/
│   │   ├── helpers.js
│   │   └── motionVariants.js     # Reusable Framer Motion variants
│   ├── App.jsx                   # Router + AnimatePresence
│   └── main.jsx                  # Entry point
├── index.html
├── vite.config.js                # allowedHosts: 'all' for Render/Codespace
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── package.json
```

---

## 🌐 Routes

| Route                | Page            |
|----------------------|-----------------|
| `/`                  | Home            |
| `/models`            | Models grid     |
| `/models/:slug`      | Model detail    |
| `/configure`         | Configurator    |
| `/configure/:slug`   | Configure model |
| `/heritage`          | Brand heritage  |
| `/performance`       | Tech & perf     |
| `/interior`          | Cabin craft     |
| `/contact`           | Contact + form  |
| `/*`                 | 404             |

---

## ⚡ Performance Features

- **Preloaded hero image** with `<link rel="preload">` + `srcset`/`sizes` + WebP
- **Lenis** smooth scroll — native on touch, JS-driven on desktop
- **GPU-only parallax** via `translate3d` — no `top/left` reads inside rAF
- **IntersectionObserver** scroll reveals — zero cost off-screen
- **Framer Motion** `AnimatePresence` page transitions
- **Code splitting** by route via Vite `manualChunks`
- **Image lazy loading** + `decoding="async"` on all non-hero images
- **Zustand** for global state (cursor, loader) — no prop drilling
- Fixed image heights everywhere — **zero Cumulative Layout Shift**

---

## 🚀 Deploy on Render

1. Push to GitHub
2. New → Web Service → connect repo
3. Build command: `npm install && npm run build`
4. Start command: `npx serve dist`  _(or use a static site)_
5. Environment: Node 18+

`vite.config.js` already has `allowedHosts: 'all'` — works on any host.

---

## 🔧 Tech Stack

| Tool            | Purpose                    |
|-----------------|----------------------------|
| React 18        | UI framework               |
| Vite 5          | Build tool + dev server    |
| React Router 6  | Client-side routing        |
| Framer Motion   | Animations + page transitions |
| Lenis           | Smooth scroll              |
| Tailwind CSS    | Utility styling            |
| Zustand         | Global state management    |
| react-hot-toast | Toast notifications        |
| react-helmet-async | SEO meta tags          |

---

## ✅ Production Upgrades (Options A + B + C)

### Option A — Deploy Ready
| File | Purpose |
|---|---|
| `public/_redirects` | Netlify/Render SPA routing — all paths → index.html |
| `public/robots.txt` | Search engine crawl rules |
| `public/sitemap.xml` | All routes for Google indexing |
| `public/404.html` | GitHub Pages SPA routing fallback |
| `.env.example` | Documents all environment variables |
| `jsconfig.json` | VS Code path alias resolution (no red underlines) |
| `render.yaml` | One-click Render deployment with security headers |
| `netlify.toml` | One-click Netlify deployment with caching headers |
| `.github/workflows/ci.yml` | GitHub Actions: lint + build on every PR |
| `src/components/ui/ErrorBoundary.jsx` | Catches JS errors — no white screens |
| `src/components/ui/PageLoader.jsx` | Suspense fallback for lazy routes |
| `src/App.jsx` (updated) | Lazy routes + Suspense + ErrorBoundary |

### Option B — SEO Package
| File | Purpose |
|---|---|
| `src/hooks/useSEO.js` | Centralised SEO config hook |
| `src/components/ui/SEOHead.jsx` | All meta tags: title, description, canonical, OG, Twitter Card |
| `src/data/seo.js` | JSON-LD schemas: Car, Organization, FAQ, BreadcrumbList, LocalBusiness |
| All 9 pages updated | Per-page title, description, canonical URL, OG image, JSON-LD |

**JSON-LD schemas implemented:**
- `Organization` — brand identity, contact, social links
- `WebSite` — site-level schema
- `Car` — product schema on every model detail page (price, specs, images)
- `ItemList` — models collection page
- `FAQPage` — performance page questions
- `LocalBusiness / AutoDealer` — contact page with opening hours
- `BreadcrumbList` — every page has breadcrumbs for rich results

### Option C — Accessibility (WCAG 2.1 AA)
| Feature | Implementation |
|---|---|
| Skip to content | `SkipLink.jsx` — first focusable element, jumps to `#main-content` |
| Focus visible | Gold `outline: 2px solid var(--gold)` on all focusable elements |
| Keyboard nav | Escape closes mobile menu, focus returns to trigger |
| Focus trap | Mobile menu traps focus with `aria-modal="true"` |
| Reduced motion | `useReducedMotion()` in SectionReveal, Lenis disabled if set |
| ARIA labels | All buttons, navs, forms, images, dialogs labelled |
| `aria-expanded` | Hamburger button announces open/close state |
| Semantic HTML | `<header>`, `<main>`, `<footer>`, `<nav>`, `<address>`, `<dl>`, `<ul>` |
| Form labels | Every input has `<label htmlFor>`, required fields announced |
| `role` attrs | `radiogroup`, `dialog`, `table`, `row`, `cell`, `list`, `alert` |
| High contrast | `forced-colors: active` support |
| Print styles | Clean print output with URLs shown |

