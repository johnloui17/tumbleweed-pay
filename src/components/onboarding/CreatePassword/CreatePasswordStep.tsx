import { Button, PasswordInput } from '../../ui'
import { useCreatePasswordForm } from './useCreatePasswordForm'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * CreatePasswordStep - The final step of the registration flow.
 * Allows the user to set a secure password for their new account.
 */
export function CreatePasswordStep({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
  } = useCreatePasswordForm({ onNext })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#132C4A] font-medium leading-tight">
          Create Password for your account
        </h2>

        <div className="space-y-8">
          <PasswordInput
            label="Enter new password"
            placeholder="Enter new password"
            hint="Must be atleast 6 characters"
            error={errors.password?.message}
            {...register('password')}
          />

          <PasswordInput
            label="Confirm password"
            placeholder="Confirm password"
            hint="Both passwords must match"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
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
          Finish
        </Button>
      </div>
    </form>
  )
}
