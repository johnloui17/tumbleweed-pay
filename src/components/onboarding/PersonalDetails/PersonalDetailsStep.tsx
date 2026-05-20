import { Button, FormField } from '../../ui'
import { usePersonalDetailsForm } from './usePersonalDetailsForm'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * PersonalDetailsStep - The fourth step of the registration flow.
 * Collects the user's basic personal information.
 */
export function PersonalDetailsStep({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit
  } = usePersonalDetailsForm({ onNext })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
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
