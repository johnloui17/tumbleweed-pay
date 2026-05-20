import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, type EmailFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button } from '../ui'
import { cn } from '../../utils'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * EmailStep - The fifth step of the registration flow.
 * Collects the user's email address.
 */
export function EmailStep({ onNext, onBack }: Props) {
  const { email, setField } = useRegistrationStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  })

  const onSubmit = (data: EmailFormData) => {
    setField('email', data.email)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          What is your email address?
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">Email Address</label>
            <input
              type="email"
              placeholder="oliver@example.com"
              {...register('email')}
              className={cn(
                "w-full px-6 py-4 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
                errors.email ? "border-error" : "border-[#E2E8F0] focus:border-[#3B6EF7]"
              )}
            />
            {errors.email && (
              <p className="text-sm text-error font-medium pl-2">{errors.email.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-auto pt-10">
        <Button 
          type="button" 
          variant="ghost" 
          className="flex-1 rounded-full py-5 text-[#64748B] border-[#E2E8F0] font-bold text-lg hover:bg-gray-50 transition-colors"
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="submit" 
          className="flex-1 rounded-full py-5 bg-[#3B6EF7] hover:bg-[#2563EB] text-white font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
        >
          Continue
        </Button>
      </div>
    </form>
  )
}
