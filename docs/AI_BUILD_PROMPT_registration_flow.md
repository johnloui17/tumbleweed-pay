# AI Build Prompt — Multi-Step Registration Flow

> **How to use this prompt:**  
> Paste the "MASTER PROMPT" section into Claude Code, Cursor, or any AI coding assistant.  
> Run it in the root of a freshly scaffolded Vite + React + TypeScript project.  
> Follow the numbered phases in order — each phase builds on the previous.

---

## Pre-flight: scaffold the project first

Run these commands before prompting the AI:

```bash
npm create vite@latest registration-flow -- --template react-ts
cd registration-flow
npm install
npm install framer-motion zustand react-hook-form @hookform/resolvers zod
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then open the project in your AI coding assistant and paste the master prompt below.

---

## MASTER PROMPT

```
You are a senior frontend engineer building a production-grade multi-step account 
registration flow in React 18 + TypeScript.

CONTEXT:
The design is a fintech/digital wallet registration UI with 5 steps:
  Step 1 — Account type selection (Personal / Business radio cards)
  Step 2 — Mobile number entry (+91 prefix, 10 digits)
  Step 3 — OTP verification (4 individual boxes + 30s resend timer)
  Step 4 — Full name entry (first + last name)
  Step 5 — Password creation (with strength meter + confirm)
  Final  — Success summary modal (overlaid on step 5)

TECH STACK (already installed):
- React 18, TypeScript (strict mode)
- Tailwind CSS for all styling
- Framer Motion for step transitions and modal
- React Hook Form + Zod for form validation
- Zustand for cross-step state persistence

CODING STANDARDS — follow every rule below without exception:

1. TYPESCRIPT
   - strict: true in tsconfig — no `any`, no `as unknown`
   - All component props must have explicit interfaces
   - Zod schemas are the single source of truth for form types (use z.infer<>)
   - All hooks return typed objects, never tuples with >2 items

2. COMPONENT DESIGN
   - Single responsibility — one component = one job
   - No business logic inside JSX. Extract to hooks or utils
   - No useState for data that crosses steps — use Zustand store
   - No prop drilling beyond 1 level — use store for shared state
   - Max 80 lines of JSX per component file (logic + types can be separate)

3. STYLING
   - Tailwind only — no inline style={} except for dynamic CSS values unreachable via Tailwind
   - All interactive states must be present: hover: focus-visible: active: disabled:
   - Use cn() utility (clsx + tailwind-merge) for conditional classes — never string concatenation
   - Color palette defined in tailwind.config.ts only — never hardcoded hex in JSX

4. ACCESSIBILITY
   - Every input has an associated <label> via htmlFor/id
   - Error messages linked via aria-describedby
   - OTP group has role="group" aria-label; each box has aria-label="OTP digit N"
   - Success modal has role="dialog" aria-modal="true" and traps focus
   - All interactive elements reachable by Tab; focus ring visible on focus-visible

5. ANIMATIONS
   - Step transitions are direction-aware:
     forward  = slide in from right (x: 32 → 0), exit to left  (x: 0 → -32)
     backward = slide in from left  (x: -32 → 0), exit to right (x: 0 → 32)
   - Modal entrance: scale(0.92) + opacity(0) → scale(1) + opacity(1), 180ms
   - Button press: active:scale-[0.97]
   - OTP wrong entry: 400ms horizontal shake animation
   - Respect prefers-reduced-motion: if (matchMedia('(prefers-reduced-motion: reduce)').matches) set duration to 0

6. VALIDATION UX
   - Errors shown on blur — NOT on every keystroke
   - On "Continue" click: validate all fields in current step simultaneously
   - Error messages are specific: "Enter a valid 10-digit number" not "Invalid"
   - Continue button disabled while current step has validation errors after first submit attempt

7. OTP INPUT (most evaluated piece — do this right)
   - 4 individual <input> elements with maxLength={1}
   - handleChange: on digit input → store digit → auto-focus next box
   - handleKeyDown: Backspace on empty box → focus previous box AND clear it
   - handleKeyDown: ArrowLeft/ArrowRight → navigate between boxes
   - handlePaste: intercept paste → distribute digits → focus last filled box
   - inputMode="numeric" pattern="[0-9]*" for mobile keyboards
   - Shake animation when wrong OTP submitted

8. MOCK BEHAVIOR
   - Step 3 OTP: any 4-digit code passes (mock accepts all). Show 800ms loading state
   - Step 2 Mobile: any valid 10-digit number proceeds (no real SMS)
   - Success modal: populate from Zustand store; mask mobile as "XXXX••XXXX"

9. FILE STRUCTURE (generate files in this exact order):
   1.  src/types/registration.types.ts
   2.  tailwind.config.ts
   3.  src/index.css (Tailwind directives + @font-face for Plus Jakarta Sans from Google Fonts)
   4.  src/utils/cn.ts
   5.  src/utils/passwordStrength.ts
   6.  src/utils/mockOtp.ts
   7.  src/store/registrationStore.ts
   8.  src/schemas/accountType.schema.ts
   9.  src/schemas/mobile.schema.ts
   10. src/schemas/otp.schema.ts
   11. src/schemas/name.schema.ts
   12. src/schemas/password.schema.ts
   13. src/hooks/useMultiStep.ts
   14. src/hooks/useOtpTimer.ts
   15. src/components/ui/Button.tsx
   16. src/components/ui/FormField.tsx
   17. src/components/ui/OtpInput.tsx
   18. src/components/ui/PasswordInput.tsx
   19. src/components/ui/PasswordStrength.tsx
   20. src/components/layout/ProgressDots.tsx
   21. src/components/layout/StepLayout.tsx
   22. src/components/steps/Step1AccountType.tsx
   23. src/components/steps/Step2Mobile.tsx
   24. src/components/steps/Step3Otp.tsx
   25. src/components/steps/Step4Name.tsx
   26. src/components/steps/Step5Password.tsx
   27. src/components/steps/SuccessModal.tsx
   28. src/App.tsx
   29. src/main.tsx
   30. README.md

Generate ALL 30 files. Do not skip any. Do not leave TODOs.

DESIGN SPEC:
- Layout: 2-column on desktop (left = decorative illustration panel, right = form)
  Single column on mobile (illustration hidden)
- Primary color: #3B6EF7 (brand-500)
- Background: #F8F9FF (surface)  
- Font: Plus Jakarta Sans (Google Fonts)
- Input style: 1px border, rounded-xl, focus ring brand-500, error = red border
- Continue button: full-width, brand-500, rounded-xl, 48px height
- Back button: ghost variant, left-aligned text
- Step dots: small filled/empty circles at top of form panel
- Account type cards: rounded-2xl border, hover scale-[1.02], selected = brand border + check icon

START NOW. Generate file 1 first, confirm it compiles, then proceed in order.
After all files are generated, provide the exact commands to run and deploy.
```

---

## Phase-by-phase breakdown (for step-by-step AI sessions)

If the above master prompt is too large for a single context window, use these phases:

### Phase 1 — Foundation (paste this first)

```
Build the foundation layer for a React 18 + TypeScript registration flow.

Generate these files in order:

1. src/types/registration.types.ts
   - AccountType = 'personal' | 'business'
   - RegistrationState interface with: accountType, mobile, otp, firstName, lastName, password
   - StepProps interface: { onNext: () => void; onBack: () => void }
   - Direction = 'forward' | 'backward'

2. tailwind.config.ts
   - brand colors: 50/100/500/600/700 (primary blue ~#3B6EF7)
   - surface: '#F8F9FF', muted: '#6B7280', error: '#EF4444', success: '#22C55E'
   - font: Plus Jakarta Sans
   - custom keyframes: shake, scale-in, fade-up
   - boxShadow: card, input

3. src/index.css
   - @tailwind base/components/utilities
   - @import Google Fonts URL for Plus Jakarta Sans (400, 500, 600, 700)

4. src/utils/cn.ts
   - export function cn(...inputs) using clsx + tailwind-merge
   - npm install clsx tailwind-merge first

5. src/store/registrationStore.ts
   - Zustand store with RegistrationState
   - setField<K>(key: K, value: RegistrationState[K]) method
   - reset() method
   - initial state with all nulls/empty strings

6. All 5 Zod schemas in src/schemas/:
   - accountType: z.object({ accountType: z.enum(['personal','business']) })
   - mobile: 10-digit regex validation
   - otp: exactly 4 digits
   - name: firstName + lastName, both min 2 chars, letters only
   - password: min 8, one uppercase, one number; with confirmPassword refine check

TypeScript strict mode. No any. Export types via z.infer.
```

### Phase 2 — Hooks and UI primitives

```
Continue the registration flow project. Foundation types, store, and schemas are done.

Now generate:

1. src/hooks/useMultiStep.ts
   - useState for step (1-5) and direction ('forward'|'backward')
   - next(): increments step, sets direction='forward'
   - back(): decrements step, sets direction='backward'  
   - Returns: { step, direction, next, back, isFirst, isLast }

2. src/hooks/useOtpTimer.ts
   - 30-second countdown starting on mount
   - canResend flips true when seconds reaches 0
   - resend() resets to 30 and sets canResend=false
   - Returns: { seconds, canResend, resend }

3. src/utils/passwordStrength.ts
   - score(password: string): 0-4
   - Rules: length≥8, length≥12, hasUppercase, hasNumber
   - Each rule adds 1 to score

4. src/utils/mockOtp.ts
   - verifyOtp(otp: string): Promise<boolean>
   - Returns Promise that resolves after 800ms
   - Always resolves true (any 4 digits pass)

5. src/components/ui/Button.tsx
   - Props: variant ('primary'|'ghost'), loading, + all native button attrs
   - Primary: brand-500 bg, white text, hover:brand-600, active:scale-[0.97]
   - Ghost: transparent, border-gray-200, hover:bg-gray-50
   - Loading: shows SVG spinner + children, pointer-events disabled
   - Disabled: opacity-50 pointer-events-none
   - focus-visible ring on all variants

6. src/components/ui/FormField.tsx
   - Props: label, id, error?, children (ReactNode)
   - Renders: <label>, children (the input slot), error <p> with aria-live="polite"
   - Error p linked to input via aria-describedby

7. src/components/ui/OtpInput.tsx
   - 4 single-char inputs (see full spec in TECHSPEC)
   - Auto-advance, backspace-to-prev, paste distribution, Arrow key navigation
   - inputMode="numeric", aria-label per digit
   - Shake animation class applied when hasError=true

8. src/components/ui/PasswordInput.tsx
   - Extends FormField
   - Eye/hide toggle button (accessible: aria-label changes with state)
   - Toggles input type between 'password' and 'text'

9. src/components/ui/PasswordStrength.tsx
   - 4-segment strength bar (colors: red/amber/brand-400/success by score)
   - Rule checklist: 3 rules with ✓/○ and color states
   - Only renders when password.length > 0

All components: strict TypeScript, Tailwind only, cn() for conditionals, no inline styles.
```

### Phase 3 — Layout and step screens

```
Continue the registration flow. Foundation, hooks, and UI primitives are done.

Now generate the layout shell and all 5 step screens:

1. src/components/layout/ProgressDots.tsx
   - Props: total (5), current (1-5)
   - Renders a row of 5 dots
   - Active dot: brand-500 fill, larger (w-2.5 h-2.5)
   - Completed dot: brand-200
   - Upcoming dot: gray-200
   - Animated transition between states

2. src/components/layout/StepLayout.tsx
   - 2-column layout: left panel (bg-surface, illustration) + right panel (form)
   - Left panel hidden on mobile (md:block)
   - Left panel: "Let's get started" + "Create your account" heading + decorative SVG
   - Right panel: ProgressDots at top + slot for step content
   - Shared Back/Continue button row at bottom is NOT here — each step manages its own

3. src/components/steps/Step1AccountType.tsx
   - Heading: "To join us tell us what type of account you are opening"
   - Two cards: Personal + Business
   - Card: rounded-2xl border p-4 cursor-pointer
   - Selected: border-brand-500 bg-brand-50 + check circle icon (top-right)
   - Unselected: border-gray-200 hover:border-gray-300 hover:scale-[1.02]
   - useForm with accountType schema; Continue disabled if nothing selected
   - On submit: setField('accountType', value), onNext()

4. src/components/steps/Step2Mobile.tsx
   - Heading: "OTP Verification" sub-heading: "Mobile Number*"
   - Input: prefix "+91" (non-editable, gray bg) + 10-digit input
   - useForm with mobile schema
   - Blur validation, Continue-click validation
   - On valid submit: setField('mobile', value), onNext()

5. src/components/steps/Step3Otp.tsx
   - Heading: "OTP Verification"  
   - OtpInput component (4 boxes)
   - "Did not receive OTP? Resend OTP" — Resend is disabled during countdown, shows timer
   - On Continue: call mockOtp.verifyOtp(), show loading state on button
   - If resolves true: setField('otp', value), onNext()
   - If resolves false (extend for real API): shake animation + error message

6. src/components/steps/Step4Name.tsx
   - Heading: "What is your name?"
   - Two fields: First name, Last name
   - useForm with name schema
   - On valid submit: setField + onNext

7. src/components/steps/Step5Password.tsx
   - Heading: "Create Password for your account"
   - PasswordInput for new password
   - PasswordStrength component (updates live)
   - PasswordInput for confirm password
   - Confirm field error only shown after blur
   - useForm with password schema
   - On valid submit: setField + onNext (which triggers SuccessModal in App.tsx)

Each step:
- Manages its own useForm instance with the relevant Zod schema
- Bottom row: Back button (ghost, left) + Continue button (primary, right)
- Back button hidden on Step 1
- Continue disabled until form is valid (after first submit attempt)
- No business logic leaking into JSX
```

### Phase 4 — Success modal and App wiring

```
Final phase. All steps and UI are built. Now wire everything together.

1. src/components/steps/SuccessModal.tsx
   - Framer Motion animated overlay (not position:fixed — use absolute inset-0 on a relative parent)
   - Backdrop: bg-black/40 with fade in
   - Modal card: white rounded-2xl, scale-in animation
   - Content: green check icon, "You're all set!" heading, account summary
   - Summary rows: Account type, Name, Mobile (masked: first 4 + •• + last 4)
   - Security badge row: lock icon + "Your account is secured with bank-grade security"
   - "Go to Dashboard" button (full-width primary)
   - Focus trap: on mount, focus the modal; Escape key closes
   - role="dialog" aria-modal="true" aria-label="Account created successfully"
   - Populate all data from useRegistrationStore()

2. src/App.tsx
   - useMultiStep() for step + direction state
   - useState<boolean> for showSuccess modal
   - AnimatePresence with mode="wait" around step components
   - Direction-aware slide variants (x: ±32, opacity: 0→1)
   - Pass direction as custom prop to variants
   - STEPS array maps step index to component
   - handleNext: if step === 5, setShowSuccess(true); else next()
   - AnimatePresence for SuccessModal (separate, outside step AnimatePresence)
   - StepLayout wraps everything, receives currentStep for ProgressDots

3. src/main.tsx
   - Standard Vite React entry
   - import './index.css'
   - StrictMode wrapper

4. README.md
   Must include:
   - Architecture overview (tech choices + rationale for each)
   - Key trade-offs (RHF over Formik, Zustand over Context — explain WHY)
   - Enhancements beyond the brief (list every extra feature added)
   - Run instructions (npm install, npm run dev, npm run build)
   - Deploy instructions (vercel --prod)
   - Lighthouse targets (>90 on all 4 categories)

After generating all files:
- Run: npm run build
- Fix any TypeScript errors (there should be none with strict mode)
- Run: npm run preview  
- Confirm all 5 steps render, transitions work, OTP auto-advances, modal appears
```

---

## Common AI mistakes to watch for

When reviewing AI-generated code, check these specifically:

**OTP input** — AI often generates a single `<input>` with `maxLength={4}`. Reject this. It must be 4 individual inputs. Auto-advance and backspace-to-previous are required.

**Step transitions** — AI often generates a single fade. Check that `direction` is tracked in `useMultiStep` and passed as Framer Motion `custom` prop. Forward and backward must slide in opposite directions.

**Validation timing** — AI often triggers errors on every keystroke. The spec requires blur-triggered errors. Check that `trigger()` is called in `onBlur` handlers, not in `onChange`.

**TypeScript strictness** — AI often adds `as any` casts. None are acceptable. If the AI struggles with a type, ask it to derive the type properly.

**Tailwind conditionals** — AI often uses string concatenation: `className={"base " + (error ? "red" : "")}`. This breaks Tailwind's purge. All conditionals must use `cn()` from clsx + tailwind-merge.

**Success modal positioning** — AI often uses `position: fixed`. This breaks the layout. The parent container must have `position: relative`; the modal uses `absolute inset-0`.

**Missing focus trap in modal** — standard AI output omits this. When modal opens, Tab should cycle only within modal elements. Implement with `useEffect` on mount that sets focus to the modal container.

---

## Deploy checklist

```bash
# 1. Confirm build passes with zero errors
npm run build

# 2. Push to GitHub
git init && git add . && git commit -m "feat: registration flow"
gh repo create registration-flow --public --push

# 3. Deploy to Vercel (auto-detects Vite)
npx vercel --prod

# 4. Add live URL and GitHub link to README
# 5. Run Lighthouse on deployed URL — target >90 all categories
```
