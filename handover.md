# Session Handover: Tumbleweed Pay Registration Flow

## Context & Goals
We are building a production-grade, **pixel-perfect multi-step registration flow** using React, TypeScript, and Tailwind CSS. The primary goal is to match the provided design specs (`docs/design/*.jpg`) exactly while maintaining a "learnable" architecture for other developers.

## Current State
- **Step 1 (Account Type):** Fully aligned to `Role UI-01.jpg`.
- **Step 2 (Mobile Number):** Fully aligned to `Role UI-02.jpg` (includes country selector and updated spacing).
- **Step 3 (OTP Verification):** Aligned to `Role UI-03.jpg`.
- **Step 4 (Personal Details):** Aligned to `Role UI-04.jpg`.
- **Step 5 (Create Password):** Aligned to `Role UI-05.jpg`.
- **Architecture:** 
  - **Zustand:** Global state management in `src/store/registrationStore.ts`.
  - **Framer Motion:** Direction-aware transitions between steps.
  - **Layout:** Split-screen (`StepLayout.tsx`) with topographic background (`#F8F9FC`) and progress bar.
  - **Styles:** Brand Blue (`#3B6EF7`), Pill-shaped buttons (`rounded-full`), and refined typography (`text-[28px]` for headings, `text-lg` for inputs/buttons).
- **Testing:** Playwright visual regression tests are established for all 6 states (5 steps + success modal). Currently 6/6 passing, but need to re-verify after the latest font-size refinements.

## Key Constraints (Mandates)
- **Pixel Perfection:** Every margin, font size, and border radius must match the JPGs.
- **Buttons:** Always pill-shaped (`rounded-full`), `py-5`, bold `text-lg`.
- **Headings:** Headings must be *inside* the form card, not the layout.
- **File Structure:** Folder-by-type with barrel exports (`index.ts`). No numeric prefixes in component names (e.g., `AccountTypeStep`).

## Pending Tasks
1. **Success Modal:** Final alignment check against `Role UI-06.jpg`.
2. **Font Consistency:** Review all steps to ensure font sizes (28px for headings, 18px/lg for inputs) are consistently applied as per the latest "proper font size" request.
3. **Visual Regression:** Run `npx playwright test --update-snapshots` once the UI is final to establish the new golden baseline.

## Key Files
- `src/components/layout/StepLayout.tsx` (Split-screen container)
- `src/components/steps/` (Step-specific logic and UI)
- `src/components/ui/` (Shared components like `Button`, `PasswordInput`)
- `tests/e2e/visual.spec.ts` (Visual regression suite)
