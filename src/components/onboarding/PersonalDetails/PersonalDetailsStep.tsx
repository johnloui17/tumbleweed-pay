import { memo, useEffect } from 'react'
import { FormField } from '../../ui'
import { usePersonalDetailsForm } from './usePersonalDetailsForm'

interface Props {
  onNext: () => void
  onValidationChange: (isValid: boolean) => void
}

/**
 * PersonalDetailsStep - The fourth step of the registration flow.
 * Collects the user's basic personal information.
 */
export const PersonalDetailsStep = memo(function PersonalDetailsStep({ onNext, onValidationChange }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit
  } = usePersonalDetailsForm({ onNext })

  useEffect(() => {
    onValidationChange(isValid)
  }, [isValid, onValidationChange])

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          What is your name?
        </h2>

        <div className="space-y-6">
          <FormField
            label="First Name"
            placeholder="e.g. John"
            error={errors.firstName?.message}
            {...register('firstName')}
          />
          <FormField
            label="Last Name"
            placeholder="e.g. Doe"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
      </div>
    </form>
  )
})
