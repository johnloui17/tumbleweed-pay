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
import { useState, useEffect } from 'react'
import { useRegistrationStore } from './store/registrationStore'

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
  const { currentStep, setStep, isCompleted } = useRegistrationStore()
  const { step, direction, next, back } = useMultiStep(currentStep)
  const [showSuccess, setShowSuccess] = useState(false)

  // Sync the hook's step back to the store
  useEffect(() => {
    setStep(step)
  }, [step, setStep])

  if (isCompleted) {
    return <WelcomeDashboard />
  }

  const StepComponent = STEPS[step - 1]

  const handleNext = () => {
    if (step === 6) setShowSuccess(true)
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
          className="h-full"
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
