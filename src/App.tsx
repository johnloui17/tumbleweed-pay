import { AnimatePresence, motion } from 'framer-motion'
import { useMultiStep } from './hooks'
import { StepLayout }   from './components/layout'
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
import { useState, useCallback } from 'react'
import { useRegistrationStore } from './store/registrationStore'
import { Button } from './components/ui'

const variants = {
  enter: (dir: 'forward' | 'backward') => ({ 
    opacity: 0, 
    x: dir === 'forward' ? 32 : -32 
  }),
  center: { 
    opacity: 1, 
    x: 0 
  },
  exit: (dir: 'forward' | 'backward') => ({ 
    opacity: 0, 
    x: dir === 'forward' ? -32 : 32 
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

/**
 * App - Root component of the Registration Flow.
 * Manages step navigation, animated transitions, and the final success state.
 */
export default function App() {
  const isCompleted = useRegistrationStore((state) => state.isCompleted)
  const { step, direction, next, back } = useMultiStep()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isStepValid, setIsStepValid] = useState(false)

  const StepComponent = STEPS[step - 1]

  const handleNext = useCallback(() => {
    if (step === 6) {
      setShowSuccess(true)
    } else {
      next()
    }
  }, [step, next])

  const handleBack = useCallback(() => {
    back()
  }, [back])

  if (isCompleted) {
    return <WelcomeDashboard />
  }

  return (
    <StepLayout currentStep={step}>
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
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex-1 flex flex-col"
            >
              <StepComponent onNext={handleNext} onValidationChange={setIsStepValid} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-[#F1F5F9] dark:border-slate-800/40">
          <div className="w-full sm:w-auto">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="w-full transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,84,253,0.2)] active:scale-[0.98]"
            >
              Back
            </Button>
          </div>
          
          <div className="w-full sm:w-auto flex-grow sm:flex-grow-0 relative flex justify-center sm:justify-end">
            <button
              type="submit"
              form="onboarding-form"
              disabled={!isStepValid}
              className="w-full min-w-[16rem] h-12 rounded-full flex items-center justify-center font-[500] text-sm text-white select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0054FD] disabled:opacity-50 disabled:pointer-events-none cursor-pointer bg-[#0054FD] transition-all duration-200 hover:shadow-[0_0_15px_rgba(0,84,253,0.4)] active:scale-[0.98] mx-auto"
            >
              <span className="flex items-center justify-center gap-2 w-full whitespace-nowrap px-6">
                {step === 6 ? 'Finish' : 'Continue'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && <SuccessModal />}
      </AnimatePresence>
    </StepLayout>
  )
}
