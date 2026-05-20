import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { RegistrationState } from '../types/registration.types'

interface Store extends RegistrationState {
  /** Updates a specific field in the registration state */
  setField: <K extends keyof RegistrationState>(key: K, value: RegistrationState[K]) => void
  /** Updates the current step */
  setStep: (step: number) => void
  /** Resets the registration state to initial values */
  reset: () => void
}

const initial: RegistrationState = {
  currentStep: 1,
  accountType: null,
  mobile:      '',
  otp:         '',
  firstName:   '',
  lastName:    '',
  email:       '',
  password:    '',
  isCompleted: false,
}

/**
 * useRegistrationStore - Zustand store for managing global registration state.
 * This store persists form data across steps, allowing users to navigate back and forth
 * without losing their input.
 */
export const useRegistrationStore = create<Store>()(
  persist(
    (set) => ({
      ...initial,
      setField: (key, value) => set((s) => ({ ...s, [key]: value })),
      setStep:  (step) => set({ currentStep: step }),
      reset:    () => {
        set(initial)
        localStorage.removeItem('tumbleweed-registration-storage')
      },
    }),
    {
      name: 'tumbleweed-registration-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
