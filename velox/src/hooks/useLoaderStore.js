import { create } from 'zustand'

export const useLoaderStore = create((set) => ({
  done:    false,
  progress: 0,
  setProgress: (p) => set({ progress: p }),
  finish:  ()  => set({ done: true, progress: 100 }),
}))
