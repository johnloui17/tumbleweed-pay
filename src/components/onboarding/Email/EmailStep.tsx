import { memo } from 'react'
import { FormField } from '../../ui'
import { useEmailForm } from './useEmailForm'

interface Props {
  onNext: () => void
}

/**
 * EmailStep - Collects the user's email address.
 */
export const EmailStep = memo(function EmailStep({ onNext }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useEmailForm({ onNext })

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          Email Address
        </h2>

        <div className="space-y-6">
          <FormField
            label="Email Address*"
            type="email"
            placeholder="e.g. john@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
      </div>
    </form>
  )
})
