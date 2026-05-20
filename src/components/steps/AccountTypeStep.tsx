import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountTypeSchema, type AccountTypeFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button } from '../ui'
import { cn } from '../../utils'
import { User, Briefcase, CheckCircle2 } from 'lucide-react'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * AccountTypeStep - The first step of the registration flow.
 * Allows the user to select between a Personal or Business account.
 */
export function AccountTypeStep({ onNext, onBack }: Props) {
  const { accountType, setField } = useRegistrationStore()
  
  const { handleSubmit, setValue, watch, formState: { errors } } = useForm<AccountTypeFormData>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: { accountType: accountType || undefined },
  })

  const currentType = watch('accountType')

  const onSubmit = (data: AccountTypeFormData) => {
    setField('accountType', data.accountType)
    onNext()
  }

  const options = [
    { id: 'personal', label: 'Personal', icon: User },
    { id: 'business', label: 'Business', icon: Briefcase },
  ] as const

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col min-h-[500px]">
      <div>
        <h2 className="w-full max-w-md text-xl lg:text-2xl font-[400] leading-tight lg:leading-9 tracking-tight text-[#132C4A] mb-8 lg:mb-14">
          To join us tell us <span className="font-bold">what type of account</span> you are opening
        </h2>

        <div className="space-y-4">
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setValue('accountType', opt.id, { shouldValidate: true })}
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
              <div className="flex-1">
                <p className={cn(
                  'font-medium text-base lg:text-lg transition-colors',
                  currentType === opt.id ? 'text-[#0054FD]' : 'text-[#132C4A]'
                )}>{opt.label}</p>
              </div>
              {currentType === opt.id ? (
                <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-[#0054FD] flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-white fill-current" />
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

      <div className="flex flex-col sm:flex-row gap-4 mt-auto lg:mt-32 xl:mt-48 pt-8">
        <Button 
          type="button" 
          variant="ghost" 
          className="w-full sm:w-64 h-12 rounded-full border-[2px] border-[#D9E0E6] text-[#0054FD] font-[500] text-sm hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="w-full sm:w-64 h-12 rounded-full bg-[#0054FD] hover:bg-[#0044CC] text-white font-[500] text-sm transition-all"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}

