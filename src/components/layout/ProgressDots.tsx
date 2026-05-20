import { cn } from '../../utils/cn'

interface ProgressDotsProps {
  currentStep: number
  totalSteps?: number
}

export function ProgressDots({ currentStep, totalSteps = 6 }: ProgressDotsProps) {
  return (
    <div className="flex gap-2">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'w-2 h-2 rounded-full transition-all duration-300',
            i + 1 === currentStep ? 'bg-brand-500 w-6' : 'bg-brand-200'
          )}
        />
      ))}
    </div>
  )
}
