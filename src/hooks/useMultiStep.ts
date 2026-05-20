import { useState } from 'react'
import type { Direction } from '../types/registration.types'

const TOTAL_STEPS = 6

/**
 * useMultiStep - Hook for managing multi-step navigation.
 * 
 * Provides current step state, navigation functions, and tracking for the
 * direction of movement (forward/backward) to enable direction-aware transitions.
 * 
 * @param {number} initialStep - The step to start at (defaults to 1).
 * @returns {Object} step, direction, next, back, isFirst, isLast
 */
export function useMultiStep(initialStep: number = 1) {
  const [step, setStep]           = useState(initialStep)
  const [direction, setDirection] = useState<Direction>('forward')

  const next = () => {
    if (step < TOTAL_STEPS) {
      setDirection('forward')
      setStep((s) => s + 1)
    }
  }

  const back = () => {
    if (step > 1) {
      setDirection('backward')
      setStep((s) => s - 1)
    }
  }

  return { 
    step, 
    direction, 
    next, 
    back, 
    isFirst: step === 1, 
    isLast: step === TOTAL_STEPS 
  }
}
