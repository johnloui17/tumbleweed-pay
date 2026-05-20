import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema, type PasswordFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button, PasswordInput, PasswordStrength } from '../ui'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * CreatePasswordStep - The fifth and final step of the registration flow.
 * Allows the user to set a secure password for their account.
 */
export function CreatePasswordStep({ onNext, onBack }: Props) {
  const { password, setField } = useRegistrationStore()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password, confirmPassword: password },
  })

  const currentPassword = watch('password')

  const onSubmit = (data: PasswordFormData) => {
    setField('password', data.password)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-10">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          Create Password for your account
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">Enter new password</label>
            <PasswordInput
              placeholder="Enter new password"
              {...register('password')}
              error={errors.password?.message}
            />
            {!errors.password && (
              <p className="text-xs text-[#94A3B8] mt-1 pl-2">Must be atleast 6 characters</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">Confirm password</label>
            <PasswordInput
              placeholder="Confirm password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            {!errors.confirmPassword && (
              <p className="text-xs text-[#94A3B8] mt-1 pl-2">Both passwords must match</p>
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
