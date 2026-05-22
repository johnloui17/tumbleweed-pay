import { memo, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { OtpInput } from '../../ui'
import { useOtpVerificationForm } from './useOtpVerificationForm'

interface Props {
  onNext: () => void
  onValidationChange: (isValid: boolean) => void
}

/**
 * OtpVerificationStep - The third step of the registration flow.
 * Verifies the user's mobile number via a 4-digit code.
 */
export const OtpVerificationStep = memo(function OtpVerificationStep({ onNext, onValidationChange }: Props) {
  const {
    control,
    handleSubmit,
    errors,
    isValid,
    onSubmit,
    seconds,
    canResend,
    resend
  } = useOtpVerificationForm({ onNext })

  useEffect(() => {
    onValidationChange(isValid)
  }, [isValid, onValidationChange])

  return (
    <form id="onboarding-form" onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
      <div className="flex-1 space-y-12">
        <h2 className="text-[28px] text-[#0F172A] font-medium leading-tight">
          OTP Verification
        </h2>

        <div className="space-y-8">
          <p className="text-[#94A3B8] text-sm">An OTP has been sent to your mobile number</p>
          
          <div className="space-y-6">
            <Controller
              name="otp"
              control={control}
              render={({ field }) => (
                <OtpInput
                  value={field.value.split('').concat(Array(4).fill('')).slice(0, 4)}
                  onChange={(val) => field.onChange(val.join(''))}
                  hasError={!!errors.otp}
                />
              )}
            />
            
            <div className="flex justify-start items-center gap-1 text-sm">
              <p className="text-[#64748B]">Did not receive OTP?</p>
              <button
                type="button"
                onClick={resend}
                disabled={!canResend}
                className="text-[#3B6EF7] font-bold disabled:opacity-50 hover:underline"
              >
                {canResend ? 'Resend OTP' : `Resend in ${seconds}s`}
              </button>
            </div>

            {errors.otp && (
              <p className="text-sm text-error font-medium pl-2">{errors.otp.message}</p>
            )}
          </div>
        </div>
      </div>
    </form>
  )
})
