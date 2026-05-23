import { AnimatePresence, motion } from 'framer-motion'
import { useMultiStep } from './hooks'
import { StepLayout } from './components/layout'
import {
  AccountTypeStep,
  MobileNumberStep,
  OtpVerificationStep,
  PersonalDetailsStep,
  EmailStep,
  CreatePasswordStep,
  SuccessModal,
  WelcomeDashboard
} from './components/onboarding'
import { useState, useCallback, memo } from 'react'
import { useRegistrationStore } from './store/registrationStore'
import { useValidationStore } from './store/validationStore'
import { Button, CookieConsent } from './components/ui'

const variants = {
  enter: (dir: 'forward' | 'backward') => ({
    opacity: 0,
    x: dir === 'forward' ? 30 : -30
  }),
  center: {
    opacity: 1,
    x: 0
  },
  exit: (dir: 'forward' | 'backward') => ({
    opacity: 0,
    x: dir === 'forward' ? -30 : 30
  }),
}

const STEPS = [
  AccountTypeStep,
  MobileNumberStep,
  OtpVerificationStep,
  PersonalDetailsStep,
  EmailStep,
  CreatePasswordStep
]

const Navigation = memo(({ step, back }: { step: number; back: () => void }) => {
  const isValid = useValidationStore((state) => state.isValid)

  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8  dark:border-slate-800/40">
      <div className="w-full sm:w-auto">
        <Button
          type="button"
          variant="ghost"
          onClick={back}
          disabled={step === 1}
          className="w-full"
        >
          Back
        </Button>
      </div>

      <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 relative flex justify-center sm:justify-end">
        <Button
          type="submit"
          form="onboarding-form"
          disabled={!isValid}
          className="mx-auto"
        >
          {step === 6 ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  )
})

/**
 * App - Root component of the Registration Flow.
 * Manages step navigation, animated transitions, and the final success state.
 */
export default function App() {
  const isCompleted = useRegistrationStore((state) => state.isCompleted)
  const { step, direction, next, back } = useMultiStep()
  const [showSuccess, setShowSuccess] = useState(false)
  const setValid = useValidationStore((state) => state.setValid)

  const StepComponent = STEPS[step - 1]

  const handleNext = useCallback(() => {
    if (step === 6) {
      setShowSuccess(true)
    } else {
      next()
    }
  }, [step, next])

  if (isCompleted) {
    return <WelcomeDashboard />
  }

  return (
    <StepLayout currentStep={step}>
      <CookieConsent />
      <div className="flex-1 flex flex-col justify-between h-full">
        <div className="flex-grow flex flex-col justify-start">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex-1 flex flex-col"
            >
              <StepComponent onNext={handleNext} onValidationChange={setValid} />
            </motion.div>
          </AnimatePresence>
        </div>

        <Navigation step={step} back={back} />
      </div>

      <AnimatePresence>
        {showSuccess && <SuccessModal />}
      </AnimatePresence>
    </StepLayout>
  )
}
