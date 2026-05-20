export const RULES = [
  { label: 'At least 8 characters',        test: (p: string) => p.length >= 8 },
  { label: 'At least one uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'At least one number',           test: (p: string) => /\d/.test(p) },
]

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0
  const score = RULES.filter((r) => r.test(password)).length + (password.length >= 12 ? 1 : 0)
  return Math.min(score, 4)
}
