import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mobileSchema, type MobileFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button, FormField, CountryCodeSelector } from '../ui'
import { cn } from '../../utils'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * MobileNumberStep - The second step of the registration flow.
 * Collects the user's mobile number for verification.
 */
export function MobileNumberStep({ onNext, onBack }: Props) {
  const { mobile, setField } = useRegistrationStore()
  const [dialCode, setDialCode] = useState('+1')
  
  const { register, handleSubmit, formState: { errors } } = useForm<MobileFormData>({
    resolver: zodResolver(mobileSchema),
    defaultValues: { mobile },
  })

  const onSubmit = (data: MobileFormData) => {
    // We could prepend dialCode here if the backend expects the full number
    setField('mobile', data.mobile)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          OTP Verification
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">Mobile Number*</label>
            <div className="flex gap-4">
              <CountryCodeSelector 
                value={dialCode} 
                onChange={setDialCode} 
              />
              <input
                type="tel"
                placeholder="8343989239"
                {...register('mobile')}
                className={cn(
                  "flex-1 px-6 py-4 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
                  errors.mobile ? "border-error" : "border-[#E2E8F0] focus:border-[#3B6EF7]"
                )}
              />
            </div>
            {errors.mobile && (
              <p className="text-sm text-error font-medium pl-2">{errors.mobile.message}</p>
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
