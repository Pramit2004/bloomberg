import { useState, useCallback } from 'react'

/**
 * useForm — lightweight form state + validation.
 *
 * Usage:
 *   const { values, errors, touched, handleChange, handleBlur, validate, reset } = useForm({
 *     initialValues: { email: '', name: '' },
 *     validators: {
 *       email: (v) => !v ? 'Required' : !/\S+@\S+\.\S+/.test(v) ? 'Invalid email' : null,
 *       name:  (v) => !v.trim() ? 'Required' : null,
 *     }
 *   })
 */
export function useForm({ initialValues = {}, validators = {} } = {}) {
  const [values,  setValues]  = useState(initialValues)
  const [errors,  setErrors]  = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(v => ({ ...v, [name]: value }))
    // Clear error on change if field was touched
    if (touched[name] && validators[name]) {
      const err = validators[name](value)
      setErrors(e => ({ ...e, [name]: err }))
    }
  }, [touched, validators])

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target
    setTouched(t => ({ ...t, [name]: true }))
    if (validators[name]) {
      const err = validators[name](value)
      setErrors(e => ({ ...e, [name]: err }))
    }
  }, [validators])

  const validate = useCallback(() => {
    const newErrors = {}
    const newTouched = {}
    let valid = true
    Object.keys(validators).forEach(name => {
      newTouched[name] = true
      const err = validators[name](values[name] ?? '')
      if (err) { newErrors[name] = err; valid = false }
    })
    setTouched(newTouched)
    setErrors(newErrors)
    return valid
  }, [values, validators])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  return { values, errors, touched, handleChange, handleBlur, validate, reset, setValues }
}

// ── Common validators ─────────────────────────────────────────────
export const required  = (label = 'This field') =>
  (v) => !v?.trim() ? `${label} is required` : null

export const email = (v) =>
  !v?.trim()                   ? 'Email is required' :
  !/\S+@\S+\.\S+/.test(v)     ? 'Please enter a valid email address' : null

export const phone = (v) =>
  v && !/^[+\d\s\-().]{7,20}$/.test(v) ? 'Please enter a valid phone number' : null

export const minLength = (min, label = 'This field') =>
  (v) => v?.trim().length < min ? `${label} must be at least ${min} characters` : null
