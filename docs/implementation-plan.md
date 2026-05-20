# Implementation Plan: Multi-Step Registration Flow

## Objective
Implement a production-grade multi-step account registration flow in React 18 + TypeScript using a strictly **Test-Driven Development (TDD)** approach. The application will use Tailwind CSS for styling, Framer Motion for step transitions, React Hook Form + Zod for validation, and Zustand for state management. Testing will be handled via **Vitest + React Testing Library** (Unit/Integration) and **Playwright** (Browser Automation/E2E).

## Repository Structure
The project will follow this file structure, building on the initialized Vite React-TS template:
```text
src/
├── assets/                  # Illustrations and SVGs
├── components/
│   ├── layout/              # StepLayout.tsx, ProgressDots.tsx
│   ├── steps/               # Step1 to Step5 and SuccessModal.tsx
│   └── ui/                  # Reusable form components and buttons
├── hooks/                   # useMultiStep.ts, useOtpTimer.ts
├── schemas/                 # Zod validation schemas for each step
├── store/                   # Zustand registrationStore.ts
├── types/                   # Shared TypeScript interfaces
├── utils/                   # Helper functions (cn.ts, mockOtp.ts, etc.)
├── App.tsx                  # Main application routing and transition logic
├── main.tsx                 # Entry point
└── index.css                # Tailwind base and font imports
tests/
├── unit/                    # Vitest unit tests (mirrors src structure)
└── e2e/                     # Playwright browser automation tests
```

## Phase 0: TDD Environment Setup
**Goal:** Configure the testing frameworks before writing application code.
1.  **Unit Testing:** Install and configure `vitest`, `jsdom`, and `@testing-library/react`. Setup `vitest.config.ts`.
2.  **Browser Automation:** Install and configure Playwright (`@playwright/test`). Setup `playwright.config.ts`.

## Phase 1: Foundation (State, Schemas & Utils)
**Goal:** Setup the core types, styling configuration, state management, and validation schemas using TDD.

**Implementation Steps:**
1.  **TDD Unit Tests:** Write tests for `passwordStrength.ts` (scoring logic), `registrationStore.ts` (state mutations), and Zod schemas (valid/invalid inputs).
2.  **Types & Config:** Create `registration.types.ts`, configure `tailwind.config.ts`, and set up `index.css`.
3.  **Utilities & State:** Implement `cn.ts`, `passwordStrength.ts`, `mockOtp.ts`, and `registrationStore.ts` to make the unit tests pass.
4.  **Schemas:** Implement Zod schemas (`accountType`, `mobile`, `otp`, `name`, `password`) ensuring all schema tests pass.

## Phase 2: Hooks and UI Primitives
**Goal:** Build reusable React hooks and atomic UI components, driven by component and hook unit tests.

**Implementation Steps:**
1.  **TDD Unit Tests:** 
    *   Write tests for `useMultiStep` (forward/backward logic) and `useOtpTimer` (countdown/resend logic).
    *   Write React Testing Library (RTL) tests for `Button`, `FormField`, `PasswordInput`, and `PasswordStrength`.
    *   Write strictly focused RTL tests for `OtpInput` (auto-advance, backspace handling, paste distribution).
2.  **Hooks:** Implement `useMultiStep.ts` and `useOtpTimer.ts` until tests pass.
3.  **UI Components:** Implement `Button.tsx`, `FormField.tsx`, `OtpInput.tsx`, `PasswordInput.tsx`, and `PasswordStrength.tsx` until all component tests and accessibility checks pass.

## Phase 3: Layout and Step Screens
**Goal:** Construct the layout shell and implement the individual registration steps, verifying form bindings.

**Implementation Steps:**
1.  **TDD Unit Tests:** Write RTL tests for each step (`Step1` to `Step5`), mocking the store and verifying `react-hook-form` validation triggers on blur/submit.
2.  **TDD Browser Automation:** Write initial Playwright tests to load each step in isolation and verify base rendering and DOM attributes.
3.  **Layout Components:** Implement `ProgressDots.tsx` and `StepLayout.tsx`.
4.  **Step Screens:** Implement Step 1 through Step 5 components, binding them to Zod schemas and Zustand store, until all local step unit tests pass.

## Phase 4: App Wiring, Modal, & Full Flow E2E
**Goal:** Assemble the steps with animated transitions, finalize the success modal, and automate the entire user journey in the browser, including visual regression testing.

**Implementation Steps:**
1.  **TDD Unit Tests:** Write RTL tests for `SuccessModal` verifying the focus trap, data masking, and accessible roles.
2.  **TDD Browser Automation:** Write comprehensive E2E Playwright tests covering:
    *   The happy-path registration flow (Step 1 -> Step 5 -> Modal).
    *   Validation blocking (trying to proceed without valid data).
    *   Cross-step state persistence (navigating forward and backward).
3.  **Visual Regression Testing:**
    *   Configure Playwright for screenshot comparison (`expect(page).toHaveScreenshot()`).
    *   Implement tests that capture snapshots of each registration step (Step 1 to Step 5) and the Success Modal.
    *   Establish baseline snapshots once the UI matches the original design from `Assignment Screens •_Login flow.pdf`.
4.  **Success Modal:** Implement `SuccessModal.tsx` ensuring focus trap tests pass.
5.  **App Assembly:** Update `src/App.tsx` with `AnimatePresence` and routing logic.
6.  **E2E & Visual Validation:** Run the Playwright suite to verify behavioral and visual consistency.

## Phase 5: Deployment
**Goal:** Build the application for production, verify tests pass in CI-like state, and deploy it to a hosting platform.

**Implementation Steps:**
1.  **CI Validation:** Run all Vitest and Playwright tests locally to mimic a pre-deployment check (`npm run test && npx playwright test`).
2.  **Build:** Run the production build command (`npm run build`) to ensure the project compiles cleanly.
3.  **Deploy:** Use the Vercel CLI (`npx vercel --prod`) to deploy the application.
4.  **Update README:** Document the TDD approach, Playwright/Vitest run instructions, and add the live deployed URL to the `README.md`.

## Verification & Testing summary
- **Unit/Integration:** 100% passing Vitest + RTL suite covering all utils, stores, hooks, and components.
- **E2E Automation:** 100% passing Playwright suite verifying the entire multi-step form in a headless browser.
- **Accessibility & Types:** Zero strict-mode TypeScript errors and passing A11y tests inside E2E automation.