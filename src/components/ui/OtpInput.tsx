import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react'
import { cn } from '../../utils/cn'

interface OtpInputProps {
  value: string[]
  onChange: (val: string[]) => void
  hasError: boolean
}

export function OtpInput({ value, onChange, hasError }: OtpInputProps) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleChange = (idx: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next = [...value]
    next[idx] = digit
    onChange(next)
    if (digit && idx < 3) refs[idx + 1].current?.focus()
  }

  const handleKeyDown = (idx: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (!value[idx] && idx > 0) {
        refs[idx - 1].current?.focus()
        const next = [...value]
        next[idx - 1] = ''
        onChange(next)
      }
    }
    if (e.key === 'ArrowLeft' && idx > 0) refs[idx - 1].current?.focus()
    if (e.key === 'ArrowRight' && idx < 3) refs[idx + 1].current?.focus()
  }

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4).split('')
    const next = [...value]
    digits.forEach((d, i) => { next[i] = d })
    onChange(next)
    const focus = Math.min(digits.length, 3)
    refs[focus].current?.focus()
  }

  return (
    <div 
      className={cn('flex gap-3', hasError && 'animate-shake')} 
      role="group" 
      aria-label="One-time password"
    >
      {value.map((digit, idx) => (
        <input
          key={idx}
          ref={refs[idx]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          aria-label={`OTP digit ${idx + 1}`}
          aria-invalid={hasError}
          onChange={(e) => handleChange(idx, e.target.value)}
          onKeyDown={(e) => handleKeyDown(idx, e)}
          onPaste={handlePaste}
          className={cn(
            'w-14 h-14 text-center text-xl font-semibold rounded-xl border-2 outline-none',
            'transition-all duration-150',
            'focus:border-brand-500 focus:shadow-input',
            hasError ? 'border-error text-error' : digit ? 'border-brand-500' : 'border-gray-200',
          )}
        />
      ))}
    </div>
  )
}
