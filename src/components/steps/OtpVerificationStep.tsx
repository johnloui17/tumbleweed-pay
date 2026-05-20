import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, type OtpFormData } from '../../schemas'
import { useRegistrationStore } from '../../store/registrationStore'
import { Button, OtpInput } from '../ui'
import { useOtpTimer } from '../../hooks'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * OtpVerificationStep - The third step of the registration flow.
 * Verifies the user's mobile number via a 4-digit code.
 */
export function OtpVerificationStep({ onNext, onBack }: Props) {
  const { otp, setField } = useRegistrationStore()
  const { seconds, canResend, resend } = useOtpTimer()
  
  const { control, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: otp || '' },
  })

  const onSubmit = (data: OtpFormData) => {
    setField('otp', data.otp)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
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
            
            <div className="flex justify-end items-center gap-1 text-sm">
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
