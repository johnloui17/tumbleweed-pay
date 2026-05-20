import { cn } from '../../utils/cn'
import { RULES, calculatePasswordStrength } from '../../utils/passwordStrength'

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Strong', 'Very strong']
const STRENGTH_COLORS = ['', 'bg-red-400', 'bg-amber-400', 'bg-brand-400', 'bg-success']

interface Props { password: string }

export function PasswordStrength({ password }: Props) {
  const score = calculatePasswordStrength(password)

  return (
    <div className="space-y-3 mt-2">
      {/* Strength bar */}
      <div className="flex gap-1.5" aria-label={`Password strength: ${STRENGTH_LABELS[score]}`}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors duration-300',
              i <= score ? STRENGTH_COLORS[score] : 'bg-gray-200',
            )}
          />
        ))}
      </div>
      {score > 0 && (
        <p className={cn('text-xs font-medium', score >= 3 ? 'text-success' : 'text-amber-500')}>
          {STRENGTH_LABELS[score]}
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
