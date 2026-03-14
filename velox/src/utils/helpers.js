import { clsx } from 'clsx'

/** Merge class names */
export const cx = (...args) => clsx(...args)

/** Format price with locale */
export const formatPrice = (num, currency = '£') =>
  `${currency}${num.toLocaleString('en-GB')}`

/** Unsplash image URL builder — always webp, responsive */
export const imgUrl = (id, width = 900, quality = 82) =>
  `https://images.unsplash.com/${id}?w=${width}&q=${quality}&fit=crop&crop=center&auto=format&fm=webp`

/** Debounce */
export const debounce = (fn, ms) => {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

/** Clamp a number */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/** Map a value from one range to another */
export const mapRange = (val, inMin, inMax, outMin, outMax) =>
  ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin

/** Slugify text */
export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
