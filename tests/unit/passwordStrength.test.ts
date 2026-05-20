import { describe, it, expect } from 'vitest'
import { calculatePasswordStrength } from '../../src/utils/passwordStrength'

describe('calculatePasswordStrength', () => {
  it('should return 0 for empty password', () => {
    expect(calculatePasswordStrength('')).toBe(0)
  })

  it('should return 1 if only one rule passes', () => {
    expect(calculatePasswordStrength('abc')).toBe(0) // too short
    expect(calculatePasswordStrength('abcdefgh')).toBe(1) // 8 chars
  })

  it('should return 2 if two rules pass', () => {
    expect(calculatePasswordStrength('Abcdefgh')).toBe(2) // 8 chars + uppercase
  })

  it('should return 3 if all three rules pass', () => {
    expect(calculatePasswordStrength('Abcdefgh1')).toBe(3) // 8 chars + uppercase + number
  })

  it('should return 4 if all rules pass and length >= 12', () => {
    expect(calculatePasswordStrength('Abcdefgh1234')).toBe(4)
  })
})
