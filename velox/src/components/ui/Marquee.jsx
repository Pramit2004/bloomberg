const DEFAULT_ITEMS = [
  'VELOX ATREO X', '680 HORSEPOWER', '0–100 IN 2.8 SECONDS',
  'MADE IN MILAN', '340 KM/H TOP SPEED', 'TWIN TURBO V8', 'PURE VELOCITY',
]

export default function Marquee({ items = DEFAULT_ITEMS, speed = 22 }) {
  const doubled = [...items, ...items]
  return (
    <div
      className="overflow-hidden py-2.5"
      style={{ background: 'var(--gold)' }}
      aria-hidden="true"
    >
      <div
        className="flex w-max"
        style={{ animation: `marquee ${speed}s linear infinite`, willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-heading text-[0.92rem] tracking-[0.28em] whitespace-nowrap px-8"
            style={{ color: 'var(--black)' }}
          >
            {item}
            <span style={{ color: 'rgba(5,5,5,0.3)', margin: '0 0.4rem' }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
