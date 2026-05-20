import { useState, useEffect, useCallback } from 'react'

const COUNTDOWN = 5

/**
 * useOtpTimer - Hook for managing an OTP resend countdown.
 * 
 * Handles the tick-down from a specified duration and provides
 * state to enable/disable the resend functionality.
 * 
 * @returns {Object} seconds, canResend, resend
 */
export function useOtpTimer() {
  const [seconds, setSeconds] = useState(COUNTDOWN)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (seconds > 0) {
      const t = setTimeout(() => {
        setSeconds((s) => {
          if (s === 1) setCanResend(true)
          return s - 1
        })
      }, 1000)
      return () => clearTimeout(t)
    }
  }, [seconds])

  /** Resets the timer and disables the resend button */
  const resend = useCallback(() => {
    setSeconds(COUNTDOWN)
    setCanResend(false)
  }, [])

  return { seconds, canResend, resend }
}
