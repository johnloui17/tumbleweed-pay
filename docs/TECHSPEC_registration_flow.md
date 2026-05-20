# Technical Specification — Multi-Step Registration Flow
**Project:** Fintech Account Registration (Figma → React + TypeScript)  
**Version:** 1.0  
**Stack:** Vite · React 18 · TypeScript · Tailwind CSS · Framer Motion · React Hook Form · Zod · Zustand

---

## 1. Repository structure

```
registration-flow/
├── public/
│   └── fonts/                        # Self-hosted Plus Jakarta Sans
├── src/
│   ├── assets/
│   │   └── illustration.svg          # Decorative left-panel SVG (unDraw)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── StepLayout.tsx        # Shared 2-col shell (illustration + form panel)
│   │   │   └── ProgressDots.tsx      # Step indicator (dots)
│   │   ├── steps/
│   │   │   ├── Step1AccountType.tsx
│   │   │   ├── Step2Mobile.tsx
│   │   │   ├── Step3Otp.tsx
│   │   │   ├── Step4Name.tsx
│   │   │   ├── Step5Password.tsx
│   │   │   └── SuccessModal.tsx
│   │   └── ui/
│   │       ├── Button.tsx            # primary / ghost / loading states
│   │       ├── FormField.tsx         # label + input + error
│   │       ├── OtpInput.tsx          # 4-box OTP with auto-advance
│   │       ├── PasswordInput.tsx     # input + show/hide toggle
│   │       └── PasswordStrength.tsx  # 4-segment bar + rule checklist
│   ├── hooks/
│   │   ├── useMultiStep.ts           # step navigation with direction tracking
│   │   └── useOtpTimer.ts            # countdown + resend logic
│   ├── schemas/
│   │   ├── accountType.schema.ts
│   │   ├── mobile.schema.ts
│   │   ├── otp.schema.ts
│   │   ├── name.schema.ts
│   │   └── password.schema.ts
│   ├── store/
│   │   └── registrationStore.ts      # Zustand — persists all form data
│   ├── types/
│   │   └── registration.types.ts     # Shared TypeScript interfaces
│   ├── utils/
│   │   ├── passwordStrength.ts       # strength scorer → 0-4
│   │   └── mockOtp.ts                # deterministic OTP mock (any 4 digits pass)
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                     # Tailwind base + custom CSS vars
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 2. Design tokens (tailwind.config.ts)

Extract these exact values from the Figma design and configure in Tailwind:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#EEF2FF',
          100: '#E0E7FF',
          500: '#3B6EF7',   // primary CTA blue (extract from Figma)
          600: '#2557E7',   // hover state
          700: '#1D45D4',   // active/press state
        },
        surface: '#F8F9FF', // left panel + card bg
        muted:   '#6B7280', // helper text
        error:   '#EF4444',
        success: '#22C55E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(59,110,247,0.08)',
        input: '0 0 0 3px rgba(59,110,247,0.15)',
      },
      animation: {
        'shake': 'shake 0.4s ease-in-out',
        'scale-in': 'scale-in 0.15s ease-out',
        'fade-up': 'fade-up 0.2s ease-out',
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%':       { transform: 'translateX(-6px)' },
          '75%':       { transform: 'translateX(6px)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
```

---

## 3. TypeScript types

```typescript
// src/types/registration.types.ts

export type AccountType = 'personal' | 'business'

export interface RegistrationState {
  accountType:  AccountType | null
  mobile:       string
  otp:          string
  firstName:    string
  lastName:     string
  password:     string
}

export interface StepProps {
  onNext: () => void
  onBack: () => void
}

export type Direction = 'forward' | 'backward'
```

---

## 4. Zustand store

```typescript
// src/store/registrationStore.ts
import { create } from 'zustand'
import type { RegistrationState } from '../types/registration.types'

interface Store extends RegistrationState {
  setField: <K extends keyof RegistrationState>(key: K, value: RegistrationState[K]) => void
  reset: () => void
}

const initial: RegistrationState = {
  accountType: null,
  mobile:      '',
  otp:         '',
  firstName:   '',
  lastName:    '',
  password:    '',
}

export const useRegistrationStore = create<Store>((set) => ({
  ...initial,
  setField: (key, value) => set((s) => ({ ...s, [key]: value })),
  reset:    () => set(initial),
}))
```

---

## 5. Zod schemas (one file per step)

```typescript
// src/schemas/mobile.schema.ts
import { z } from 'zod'
export const mobileSchema = z.object({
  mobile: z
    .string()
    .regex(/^\d{10}$/, 'Enter a valid 10-digit mobile number'),
})
export type MobileFormData = z.infer<typeof mobileSchema>

// src/schemas/password.schema.ts
import { z } from 'zod'
export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8,          'Must be at least 8 characters')
      .regex(/[A-Z]/,  'Must contain at least one uppercase letter')
      .regex(/\d/,     'Must contain at least one number'),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  })
export type PasswordFormData = z.infer<typeof passwordSchema>
```

---

## 6. Hooks

### useMultiStep

```typescript
// src/hooks/useMultiStep.ts
import { useState } from 'react'
import type { Direction } from '../types/registration.types'

const TOTAL_STEPS = 5

export function useMultiStep() {
  const [step, setStep]           = useState(1)
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

  return { step, direction, next, back, isFirst: step === 1, isLast: step === TOTAL_STEPS }
}
```

### useOtpTimer

```typescript
// src/hooks/useOtpTimer.ts
import { useState, useEffect, useCallback } from 'react'

const COUNTDOWN = 30

export function useOtpTimer() {
  const [seconds, setSeconds]   = useState(COUNTDOWN)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (seconds <= 0) { setCanResend(true); return }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000)
    return () => clearTimeout(t)
  }, [seconds])

  const resend = useCallback(() => {
    setSeconds(COUNTDOWN)
    setCanResend(false)
    // trigger SMS mock here
  }, [])

  return { seconds, canResend, resend }
}
```

---

## 7. UI components — full specs

### Button.tsx

States to implement: default · hover · active (scale) · loading (spinner) · disabled

```typescript
// src/components/ui/Button.tsx
import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'   // classnames helper

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, className, disabled, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none'

  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.97] active:bg-brand-700 px-6 py-3',
    ghost:   'bg-transparent text-muted border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-6 py-3',
  }

  return (
    <button className={cn(base, variants[variant], className)} disabled={disabled || loading} {...rest}>
      {loading
        ? <span className="flex items-center gap-2"><Spinner />{children}</span>
        : children}
    </button>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
    </svg>
  )
}
```

### OtpInput.tsx

Critical behaviors: auto-advance · backspace-to-previous · paste distribution · shake on wrong OTP · ARIA labels per digit

```typescript
// src/components/ui/OtpInput.tsx
import { useRef, type KeyboardEvent, type ClipboardEvent } from 'react'
import { cn } from '../../utils/cn'

interface OtpInputProps {
  value:    string[]    // array of 4 single chars
  onChange: (val: string[]) => void
  hasError: boolean
}

export function OtpInput({ value, onChange, hasError }: OtpInputProps) {
  const refs = Array.from({ length: 4 }, () => useRef<HTMLInputElement>(null))

  const handleChange = (idx: number, char: string) => {
    const digit = char.replace(/\D/g, '').slice(-1)
    const next  = [...value]
    next[idx]   = digit
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
    if (e.key === 'ArrowLeft'  && idx > 0) refs[idx - 1].current?.focus()
    if (e.key === 'ArrowRight' && idx < 3) refs[idx + 1].current?.focus()
  }

  const handlePaste = (e: ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4).split('')
    const next   = [...value]
    digits.forEach((d, i) => { next[i] = d })
    onChange(next)
    const focus = Math.min(digits.length, 3)
    refs[focus].current?.focus()
  }

  return (
    <div className={cn('flex gap-3', hasError && 'animate-shake')} role="group" aria-label="One-time password">
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
```

### PasswordStrength.tsx

```typescript
// src/components/ui/PasswordStrength.tsx
import { cn } from '../../utils/cn'

const RULES = [
  { label: 'At least 8 characters',        test: (p: string) => p.length >= 8 },
  { label: 'At least one uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'At least one number',           test: (p: string) => /\d/.test(p) },
]

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Strong', 'Very strong']
const STRENGTH_COLORS = ['', 'bg-red-400', 'bg-amber-400', 'bg-brand-400', 'bg-success']

interface Props { password: string }

export function PasswordStrength({ password }: Props) {
  const score   = RULES.filter((r) => r.test(password)).length + (password.length >= 12 ? 1 : 0)
  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4

  return (
    <div className="space-y-3 mt-2">
      {/* Strength bar */}
      <div className="flex gap-1.5" aria-label={`Password strength: ${STRENGTH_LABELS[clamped]}`}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors duration-300',
              i <= clamped ? STRENGTH_COLORS[clamped] : 'bg-gray-200',
            )}
          />
        ))}
      </div>
      {clamped > 0 && (
        <p className={cn('text-xs font-medium', clamped >= 3 ? 'text-success' : 'text-amber-500')}>
          {STRENGTH_LABELS[clamped]}
        </p>
      )}
      {/* Rule checklist */}
      <ul className="space-y-1.5">
        {RULES.map((rule) => {
          const passed = rule.test(password)
          return (
            <li key={rule.label} className={cn('flex items-center gap-2 text-sm', passed ? 'text-success' : 'text-muted')}>
              <span aria-hidden="true">{passed ? '✓' : '○'}</span>
              {rule.label}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
```

---

## 8. Step transition (App.tsx)

Direction-aware slide: forward = right→center, backward = left→center.

```typescript
// src/App.tsx
import { AnimatePresence, motion } from 'framer-motion'
import { useMultiStep } from './hooks/useMultiStep'
import { StepLayout }   from './components/layout/StepLayout'
import { Step1AccountType, Step2Mobile, Step3Otp, Step4Name, Step5Password } from './components/steps'
import { SuccessModal }  from './components/steps/SuccessModal'
import { useState }      from 'react'

const variants = {
  enter:   (dir: 'forward' | 'backward') => ({ opacity: 0, x: dir === 'forward' ? 32 : -32 }),
  center:  { opacity: 1,  x: 0 },
  exit:    (dir: 'forward' | 'backward') => ({ opacity: 0, x: dir === 'forward' ? -32 : 32 }),
}

const STEPS = [Step1AccountType, Step2Mobile, Step3Otp, Step4Name, Step5Password]

export default function App() {
  const { step, direction, next, back } = useMultiStep()
  const [showSuccess, setShowSuccess]   = useState(false)

  const StepComponent = STEPS[step - 1]

  const handleNext = () => {
    if (step === 5) setShowSuccess(true)
    else next()
  }

  return (
    <StepLayout currentStep={step}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <StepComponent onNext={handleNext} onBack={back} />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showSuccess && <SuccessModal />}
      </AnimatePresence>
    </StepLayout>
  )
}
```

---

## 9. SuccessModal

Render as in-flow overlay (not `position:fixed`) to avoid layout issues. Use a backdrop div with `min-height`.

```typescript
// src/components/steps/SuccessModal.tsx
import { motion } from 'framer-motion'
import { useRegistrationStore } from '../../store/registrationStore'

export function SuccessModal() {
  const store = useRegistrationStore()

  const maskEmail = (e: string) => e.replace(/(.{2}).+(@.+)/, '$1•••$2')
  const maskMobile = (m: string) => m.replace(/(\d{4})\d{2}(\d{4})/, '$1••$2')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 rounded-2xl"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{ scale: 0.92,    opacity: 0 }}
        transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl mx-4"
        role="dialog"
        aria-modal="true"
        aria-label="Account created successfully"
      >
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-success text-xl">✓</span>
          </div>
          <h2 className="font-semibold text-lg">You're all set!</h2>
          <p className="text-muted text-sm mt-1">Here's a quick summary of your account details</p>
        </div>

        <dl className="space-y-3 text-sm mb-6">
          {[
            ['Account type', store.accountType === 'personal' ? 'Personal' : 'Business'],
            ['Name',         `${store.firstName} ${store.lastName}`],
            ['Mobile',       maskMobile(store.mobile)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between">
              <dt className="text-muted">{label}</dt>
              <dd className="font-medium">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center gap-2 text-xs text-muted bg-surface rounded-lg p-3 mb-6">
          <span>🔒</span>
          <span>Your account is secured with bank-grade security</span>
        </div>

        <button
          className="w-full bg-brand-500 text-white rounded-xl py-3 font-medium hover:bg-brand-600 active:scale-[0.97] transition-all"
          onClick={() => { /* navigate to /dashboard */ }}
        >
          Go to Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}
```

---

## 10. Interaction state matrix

Every interactive element must implement all applicable states below:

| Element          | default | hover | focus-visible | active | loading | disabled | error |
|-----------------|---------|-------|---------------|--------|---------|----------|-------|
| Primary button  | ✓       | ✓     | ✓ (ring)      | scale  | spinner | opacity  | —     |
| Ghost button    | ✓       | ✓     | ✓ (ring)      | ✓      | —       | opacity  | —     |
| Text input      | ✓       | ✓     | ✓ (ring)      | —      | —       | —        | red border + msg |
| OTP box         | ✓       | —     | ✓ (ring)      | —      | —       | —        | shake + red border |
| Account card    | ✓       | scale | ✓ (ring)      | ✓      | —       | —        | — |
| Password input  | ✓       | ✓     | ✓ (ring)      | —      | —       | —        | red border + msg |
| Resend OTP link | disabled (timer) | ✓ (when active) | ✓ | ✓ | — | opacity | — |

---

## 11. Accessibility checklist

- All `<input>` elements have an associated `<label>` (via `htmlFor` / `id`)
- Error messages linked via `aria-describedby`
- OTP container has `role="group"` and `aria-label="One-time password"`; each box has `aria-label="OTP digit N"`
- Success modal has `role="dialog"` `aria-modal="true"` `aria-label`; focus is trapped inside on open
- All interactive elements are keyboard-reachable and have `focus-visible` ring styles
- Color is never the sole error indicator (icon or text always accompanies red)
- `prefers-reduced-motion` respected — wrap Framer Motion durations conditionally:

```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReduced ? 0 : 0.2
```

---

## 12. Deployment (Vercel)

```bash
# Zero-config — Vite auto-detected
vercel --prod
```

`vercel.json` is not required. Ensure `vite.config.ts` has no custom `base` unless deploying to a subdirectory.

---

## 13. README structure

```markdown
# Registration Flow

## Architecture
- **Vite + React 18 + TypeScript** — fast dev/build, tree-shakeable output
- **Tailwind CSS** — design tokens in config; no CSS file sprawl
- **Framer Motion** — direction-aware step transitions; AnimatePresence handles unmount
- **React Hook Form + Zod** — uncontrolled inputs (zero re-render on keystroke); type-safe per-step schemas
- **Zustand** — form data persists across back-navigation without prop drilling

## Trade-offs
- Chose RHF over Formik: uncontrolled inputs are critical for OTP boxes — controlled inputs on each keystroke would cause perceptible lag
- Chose Zustand over Context: simpler selector API, no Provider nesting, auto-persists across step back-navigation
- Kept mock OTP as "any 4 digits pass" — the assignment is frontend-only; a real SMS hook can replace `utils/mockOtp.ts`

## Enhancements beyond the brief
- Direction-aware step transitions (forward: slide right, back: slide left)
- Password strength meter with real-time rule checks
- OTP auto-advance, backspace-to-previous, full paste distribution
- Keyboard navigation across all OTP boxes (Arrow keys)
- Focus trap in success modal
- `prefers-reduced-motion` respected
- ARIA labels on all inputs and error messages

## Run locally
npm install && npm run dev

## Build & deploy
npm run build    # outputs to /dist
vercel --prod    # Vercel auto-detects Vite
```

---

## 14. File checklist for AI code generation

When prompting an AI to build this, generate files in this order to avoid import errors:

1. `src/types/registration.types.ts`
2. `tailwind.config.ts` + `src/index.css`
3. `src/utils/cn.ts` (classnames helper)
4. `src/utils/passwordStrength.ts`
5. `src/utils/mockOtp.ts`
6. `src/store/registrationStore.ts`
7. `src/schemas/*.ts` (all 5 schemas)
8. `src/hooks/useMultiStep.ts`
9. `src/hooks/useOtpTimer.ts`
10. `src/components/ui/Button.tsx`
11. `src/components/ui/FormField.tsx`
12. `src/components/ui/OtpInput.tsx`
13. `src/components/ui/PasswordInput.tsx`
14. `src/components/ui/PasswordStrength.tsx`
15. `src/components/layout/ProgressDots.tsx`
16. `src/components/layout/StepLayout.tsx`
17. `src/components/steps/Step1AccountType.tsx`
18. `src/components/steps/Step2Mobile.tsx`
19. `src/components/steps/Step3Otp.tsx`
20. `src/components/steps/Step4Name.tsx`
21. `src/components/steps/Step5Password.tsx`
22. `src/components/steps/SuccessModal.tsx`
23. `src/App.tsx`
24. `src/main.tsx`
25. `README.md`
