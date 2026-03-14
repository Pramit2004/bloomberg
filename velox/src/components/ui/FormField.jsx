/**
 * FormField — accessible input with inline validation feedback.
 * Works with useForm hook.
 */
export default function FormField({
  id,
  label,
  type       = 'text',
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  required   = false,
  placeholder = '',
  autoComplete,
  rows,        // if set, renders <textarea>
}) {
  const hasError  = touched && error
  const isValid   = touched && !error && value?.trim()

  const borderColor = hasError  ? 'rgba(155,35,53,.6)'
                    : isValid   ? 'rgba(192,154,90,.45)'
                    : 'var(--faint)'

  const inputStyle = {
    width:       '100%',
    background:  'transparent',
    padding:     '0.75rem 1rem',
    fontFamily:  "'Montserrat', sans-serif",
    fontSize:    '0.8rem',
    fontWeight:  300,
    color:       'var(--cream)',
    border:      `1px solid ${borderColor}`,
    outline:     'none',
    transition:  'border-color .25s',
    resize:      rows ? 'none' : undefined,
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="font-body text-[0.56rem] tracking-[0.35em] uppercase block mb-2"
        style={{ color: hasError ? 'rgba(155,35,53,.9)' : 'var(--dim)' }}
      >
        {label}
        {required && (
          <span aria-label="required" style={{ color: 'var(--gold)', marginLeft: '0.3rem' }}>*</span>
        )}
      </label>

      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : undefined}
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = hasError ? 'rgba(155,35,53,.8)' : 'rgba(192,154,90,.45)' }}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : undefined}
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = hasError ? 'rgba(155,35,53,.8)' : 'rgba(192,154,90,.45)' }}
        />
      )}

      {/* Inline error message */}
      {hasError && (
        <p
          id={`${id}-error`}
          role="alert"
          className="font-body text-[0.6rem] font-medium mt-1.5 flex items-center gap-1.5"
          style={{ color: 'rgba(200,60,60,.9)' }}
          aria-live="polite"
        >
          <span aria-hidden="true">⚠</span>
          {error}
        </p>
      )}

      {/* Valid checkmark */}
      {isValid && !hasError && (
        <p
          className="font-body text-[0.6rem] mt-1.5 flex items-center gap-1.5"
          style={{ color: 'rgba(90,180,90,.8)' }}
          aria-live="polite"
        >
          <span aria-hidden="true">✓</span>
          Looks good
        </p>
      )}
    </div>
  )
}
