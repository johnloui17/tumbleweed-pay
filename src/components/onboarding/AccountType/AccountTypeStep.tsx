import { memo } from 'react'
import { cn } from '../../../utils'
import { User, Briefcase, Check } from 'lucide-react'
import { useAccountTypeForm } from './useAccountTypeForm'

interface Props {
  onNext: () => void
}

const OPTIONS = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'business', label: 'Business', icon: Briefcase },
] as const

/**
 * AccountTypeStep - The first step of the registration flow.
 * Allows the user to select between a Personal or Business account.
 */
export const AccountTypeStep = memo(function AccountTypeStep({ onNext }: Props) {
  const { 
    currentType, 
    errors, 
    handleSubmit, 
    onSubmit, 
    handleSelectType 
  } = useAccountTypeForm({ onNext })

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div>
        <h2 className="w-full max-w-md text-xl lg:text-2xl font-[400] leading-tight lg:leading-9 tracking-tight text-[#132C4A] mb-8 lg:mb-14">
          To join us tell us <span className="font-semibold">what type of account</span> you are opening
        </h2>

        <div className="space-y-4">
          {OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelectType(opt.id as 'personal' | 'business')}
              className={cn(
                'w-full max-w-lg min-h-[4.75rem] flex items-center gap-4 lg:gap-6 px-4 lg:px-8 py-4 rounded-2xl border transition-all duration-200 outline-none',
                currentType === opt.id
                  ? 'border-[#0054FD] bg-white'
                  : 'border-[#D9E0E6] hover:border-[#CBD5E1] bg-white'
              )}
            >
              <div className={cn(
                'w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center transition-colors',
                currentType === opt.id ? 'text-[#0054FD]' : 'text-[#132C4A]'
              )}>
                <opt.icon size={24} strokeWidth={1.5} />
              </div>
              <div className="flex-1 text-left">
                <p className={cn(
                  'font-medium text-base lg:text-lg transition-colors',
                  currentType === opt.id ? 'text-[#0054FD]' : 'text-[#132C4A]'
                )}>{opt.label}</p>
              </div>
              {currentType === opt.id ? (
                <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#0054FD] flex items-center justify-center">
                  <Check size={16} className="text-white" strokeWidth={3} />
                </div>
              ) : (
                <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full border border-[#D9E0E6]" />
              )}
            </button>
          ))}
          {errors.accountType && (
            <p className="text-sm text-error font-medium pl-2">{errors.accountType.message}</p>
          )}
        </div>
      </div>
    </form>
  )
})
