import { memo, useEffect } from 'react'
import { PasswordInput } from '../../ui'
import { useCreatePasswordForm } from './useCreatePasswordForm'

interface Props {
  onNext: () => void
  onValidationChange: (isValid: boolean) => void
}

/**
 * CreatePasswordStep - The fifth step of the registration flow.
 * Allows the user to set up a secure password.
 */
export const CreatePasswordStep = memo(function CreatePasswordStep({ onNext, onValidationChange }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit
  } = useCreatePasswordForm({ onNext })

  useEffect(() => {
    onValidationChange(isValid)
  }, [isValid, onValidationChange])

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
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
    </form>
  )
})
