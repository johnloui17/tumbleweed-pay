import { create } from 'zustand'
import type { RegistrationState } from '../types/registration.types'

interface Store extends RegistrationState {
  /** Updates a specific field in the registration state */
  setField: <K extends keyof RegistrationState>(key: K, value: RegistrationState[K]) => void
  /** Resets the registration state to initial values */
  reset: () => void
}

const initial: RegistrationState = {
  accountType: null,
  mobile:      '',
  otp:         '',
  firstName:   '',
  lastName:    '',
  email:       '',
  password:    '',
}

/**
 * useRegistrationStore - Zustand store for managing global registration state.
 * This store persists form data across steps, allowing users to navigate back and forth
 * without losing their input.
 */
export const useRegistrationStore = create<Store>((set) => ({
  ...initial,
  setField: (key, value) => set((s) => ({ ...s, [key]: value })),
  reset:    () => set(initial),
}))
