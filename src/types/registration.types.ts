export type AccountType = 'personal' | 'business'

export interface RegistrationState {
  accountType:  AccountType | null
  mobile:       string
  otp:          string
  firstName:    string
  lastName:     string
  email:        string
  password:     string
}

export interface StepProps {
  onNext: () => void
  onBack: () => void
}

export type Direction = 'forward' | 'backward'
