import { create } from 'zustand'

interface ValidationState {
  isValid: boolean
  setValid: (isValid: boolean) => void
}

export const useValidationStore = create<ValidationState>((set) => ({
  isValid: false,
  setValid: (isValid) => set({ isValid }),
}))
