import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { nameSchema, type NameFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button, FormField } from '../ui'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * PersonalDetailsStep - The fourth step of the registration flow.
 * Collects the user's first and last name.
 */
export function PersonalDetailsStep({ onNext, onBack }: Props) {
  const { firstName, lastName, setField } = useRegistrationStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { firstName, lastName },
  })

  const onSubmit = (data: NameFormData) => {
    setField('firstName', data.firstName)
    setField('lastName', data.lastName)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          What is your name?
        </h2>

        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">First Name</label>
            <input
              placeholder="Oliver"
              {...register('firstName')}
              className={cn(
                "w-full px-6 py-4 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
                errors.firstName ? "border-error" : "border-[#E2E8F0] focus:border-[#3B6EF7]"
              )}
            />
            {errors.firstName && (
              <p className="text-sm text-error font-medium pl-2">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">Last Name</label>
            <input
              placeholder="Last Name"
              {...register('lastName')}
              className={cn(
                "w-full px-6 py-4 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
                errors.lastName ? "border-error" : "border-[#E2E8F0] focus:border-[#3B6EF7]"
              )}
            />
            {errors.lastName && (
              <p className="text-sm text-error font-medium pl-2">{errors.lastName.message}</p>
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
