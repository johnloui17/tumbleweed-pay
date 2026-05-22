import { memo, useEffect } from 'react'
import { CountryCodeSelector } from '../../ui'
import { cn } from '../../../utils'
import { useMobileNumberForm } from './useMobileNumberForm'

interface Props {
  onNext: () => void
  onValidationChange: (isValid: boolean) => void
}

/**
 * MobileNumberStep - The second step of the registration flow.
 * Collects the user's mobile number for verification.
 */
export const MobileNumberStep = memo(function MobileNumberStep({ onNext, onValidationChange }: Props) {
  const {
    dialCode,
    setDialCode,
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit
  } = useMobileNumberForm({ onNext })

  useEffect(() => {
    onValidationChange(isValid)
  }, [isValid, onValidationChange])

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          OTP Verification
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#94A3B8] text-sm font-medium">
              Mobile Number<span className="text-error">*</span>
            </label>
            <div className="flex gap-2 sm:gap-4">
              <CountryCodeSelector 
                value={dialCode} 
                onChange={setDialCode} 
              />
              <input
                type="tel"
                placeholder="8343989239"
                {...register('mobile')}
                className={cn(
                  "flex-1 w-full min-w-0 px-4 sm:px-6 py-4 rounded-2xl border-[1.5px] text-base sm:text-lg outline-none transition-all",
                  "focus:border-[#0054FD]",
                  errors.mobile ? "border-error" : "border-[#D9E0E6]"
                )}
              />
            </div>
            {errors.mobile && (
              <p className="text-sm text-error font-medium pl-2">{errors.mobile.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  )
})
