# Tumbleweed Pay - Registration Flow

A production-grade, multi-step registration flow built with React 18, TypeScript, and Tailwind CSS. This project follows a strictly organized, type-safe, and test-driven architecture designed for learnability and scalability.

## 🚀 Architecture & Learnability

The project is organized by **Type/Domain**, using standard naming conventions and barrel exports to ensure a low barrier to entry for new developers.

### Directory Structure

```text
src/
├── components/
│   ├── layout/       # Shared structural components (StepLayout, ProgressDots)
│   ├── steps/        # Individual step screens (AccountType, MobileNumber, etc.)
│   └── ui/           # Atomic UI primitives (Button, FormField, OtpInput)
├── hooks/            # Custom React hooks (useMultiStep, useOtpTimer)
├── schemas/          # Zod validation schemas for form steps
├── store/            # Zustand state management (registrationStore)
├── types/            # Shared TypeScript interfaces and types
└── utils/            # Generic helper functions (cn)
```

### Key Technical Choices

- **Vite + React 18**: Modern, high-performance development environment.
- **Tailwind CSS**: Utility-first styling with centralized design tokens in `tailwind.config.ts`.
- **Framer Motion**: Smooth, direction-aware transitions between steps.
- **React Hook Form + Zod**: High-performance form management with robust schema-based validation.
- **Zustand**: Lightweight, predictable state management that persists form data across steps.
- **Playwright**: Comprehensive E2E and visual regression testing.

## 🛠 Development

### Setup
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Testing
- **Unit Tests (Vitest)**: `npm run test`
- **E2E / Visual Tests (Playwright)**: `npx playwright test`

### Production Build
```bash
npm run build
```

## 📖 Learnable Patterns

- **Barrel Exports**: Every directory contains an `index.ts` file. This allows for cleaner imports like `import { Button, FormField } from '../ui'`.
- **Descriptive Naming**: Components and schemas are named after their function (e.g., `OtpVerificationStep.tsx`) rather than their current order, making them easy to reorder or repurpose.
- **Direction-Aware UI**: The `useMultiStep` hook tracks navigation direction, allowing Framer Motion to slide components left or right based on whether the user is moving forward or backward.
