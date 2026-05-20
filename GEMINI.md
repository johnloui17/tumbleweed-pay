# Tumbleweed Pay - Registration Flow

A production-grade, multi-step registration flow built with React 19, TypeScript, and Tailwind CSS. This project follows a strictly organized, type-safe, and test-driven architecture designed for learnability and scalability.

## 🚀 Architecture & Overview

The project is organized by **Type/Domain**, using standard naming conventions and barrel exports.

### Directory Structure

- `src/components/layout/`: Shared structural components (e.g., `StepLayout`, `ProgressDots`).
- `src/components/steps/`: Individual step screens (e.g., `AccountType`, `MobileNumber`).
- `src/components/ui/`: Atomic UI primitives (e.g., `Button`, `FormField`, `OtpInput`).
- `src/hooks/`: Custom React hooks (e.g., `useMultiStep`, `useOtpTimer`).
- `src/schemas/`: Zod validation schemas for form steps.
- `src/store/`: Zustand state management (`registrationStore`).
- `src/types/`: Shared TypeScript interfaces and types.
- `src/utils/`: Generic helper functions (e.g., `cn`, `passwordStrength`).
- `tests/unit/`: Vitest unit tests (mirrors `src` structure).
- `tests/e2e/`: Playwright browser automation and visual regression tests.

### Key Technical Choices

- **Vite + React 19**: Modern development environment.
- **Tailwind CSS**: Utility-first styling with centralized design tokens.
- **Framer Motion**: Direction-aware transitions between steps.
- **React Hook Form + Zod**: High-performance form management and validation.
- **Zustand**: Lightweight state management for multi-step persistence.
- **Playwright**: E2E and visual regression testing.
- **Vitest**: Unit and integration testing.

## 🛠 Building and Running

### Development
- **Install dependencies:** `npm install`
- **Start development server:** `npm run dev`
- **Lint code:** `npm run lint`

### Testing
- **Unit Tests (Vitest):** `npm run test`
- **Unit Tests (UI):** `npm run test:ui`
- **E2E / Visual Tests (Playwright):** `npm run test:e2e`
- **Show E2E Report:** `npm run test:e2e:report`

### Production
- **Build project:** `npm run build`
- **Preview build:** `npm run preview`

## 📖 Development Conventions

- **Design Fidelity:** The final website must be **pixel-perfect** against the designs in the `docs/design/` folder. Developers must strictly adhere to the layouts, spacing, colors, and typography specified in the design documentation (e.g., `ui-01-styles.md`) and visual references.
- **Test-Driven Development (TDD):** The project emphasizes a TDD approach. New features or fixes should ideally be accompanied by tests.
- **Barrel Exports:** Every directory contains an `index.ts` file for clean imports (e.g., `import { Button } from '../ui'`).
- **Descriptive Naming:** Components and schemas are named after their function rather than their order.
- **Type Safety:** Strict TypeScript usage is expected across the codebase.
- **Atomic UI:** Prefer using or extending components in `src/components/ui/` for consistency.
- **Direction-Aware UI:** Use the `useMultiStep` hook for navigation to maintain correct animation directions.
