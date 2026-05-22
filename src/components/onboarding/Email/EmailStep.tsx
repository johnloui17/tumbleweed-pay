import { Button, FormField } from '../../ui'
import { useEmailForm } from './useEmailForm'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * EmailStep - Collects the user's email address.
 */
export function EmailStep({ onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useEmailForm({ onNext })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
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

      <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-10">
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
