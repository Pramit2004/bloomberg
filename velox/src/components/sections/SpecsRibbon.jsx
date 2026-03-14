import SectionReveal from '@components/ui/SectionReveal'

const SPECS = [
  { val: '2.8', unit: 's',   label: '0–100 km/h' },
  { val: '680', unit: 'hp',  label: 'Peak Power' },
  { val: '340', unit: 'km/h',label: 'Top Speed' },
  { val: '4.0', unit: 'L',   label: 'Twin-Turbo V8' },
  { val: '850', unit: 'Nm',  label: 'Max Torque' },
]

export default function SpecsRibbon() {
  return (
    <section
      className="py-10"
      style={{
        background: 'var(--ink)',
        borderTop:    '1px solid rgba(192,154,90,.1)',
        borderBottom: '1px solid rgba(192,154,90,.1)',
      }}
    >
      <div className="max-w-[1260px] mx-auto px-6 md:px-16">
        <div className="flex flex-wrap justify-center md:justify-between gap-6 md:gap-0">
          {SPECS.map(({ val, unit, label }, i) => (
            <SectionReveal key={label} delay={i * 0.1} className="flex-1 min-w-[100px] text-center relative">
              {i > 0 && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-10 hidden md:block"
                  style={{ background: 'rgba(192,154,90,.1)' }}
                />
              )}
              <span
                className="font-heading block leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--gold)' }}
              >
                {val}
                <span className="text-[0.6rem] font-body font-light ml-0.5" style={{ color: 'var(--gold-lo)' }}>{unit}</span>
              </span>
              <span
                className="font-body text-[0.5rem] font-normal tracking-[0.4em] uppercase block mt-1.5"
                style={{ color: 'rgba(240,233,220,0.22)' }}
              >
                {label}
              </span>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
