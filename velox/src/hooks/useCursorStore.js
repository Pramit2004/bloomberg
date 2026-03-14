import { create } from 'zustand'

export const useCursorStore = create((set) => ({
  hovering: false,
  label:    '',
  setHover: (hovering, label = '') => set({ hovering, label }),
}))
