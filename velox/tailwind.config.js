/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black:  '#050505',
        ink:    '#0c0c0c',
        panel:  '#111111',
        gold:   '#c09a5a',
        'gold-hi':  '#e0c07a',
        'gold-lo':  '#7a6035',
        cream:  '#f0e9dc',
        'cream-dim': 'rgba(240,233,220,0.46)',
        'cream-faint': 'rgba(240,233,220,0.07)',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        heading: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body:    ['"Montserrat"', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'tag': ['0.52rem', { letterSpacing: '0.58em' }],
      },
      transitionTimingFunction: {
        'velox': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'marquee':    'marquee 22s linear infinite',
        'blink':      'blink 2s ease-in-out infinite',
        'fadeUp':     'fadeUp 0.8s ease both',
        'slideUp':    'slideUp 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'heroReveal': 'heroReveal 1.6s cubic-bezier(0.22,1,0.36,1) both',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%,100%': { opacity: 1, transform: 'scale(1)' },
          '50%':     { opacity: 0.2, transform: 'scale(0.6)' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(16px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(108%)' },
          to:   { transform: 'translateY(0)' },
        },
        heroReveal: {
          from: { transform: 'scale(1.14) translate3d(0,0,0)', filter: 'brightness(0)' },
          to:   { transform: 'scale(1.04) translate3d(0,0,0)', filter: 'brightness(0.5) contrast(1.06) saturate(0.9)' },
        },
      },
    },
  },
  plugins: [],
}
