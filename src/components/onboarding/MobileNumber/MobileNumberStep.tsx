import { Button, CountryCodeSelector } from '../../ui'
import { cn } from '../../../utils'
import { useMobileNumberForm } from './useMobileNumberForm'

interface Props {
  onNext: () => void
  onBack: () => void
}

/**
 * MobileNumberStep - The second step of the registration flow.
 * Collects the user's mobile number for verification.
 */
export function MobileNumberStep({ onNext, onBack }: Props) {
  const {
    dialCode,
    setDialCode,
    register,
    handleSubmit,
    errors,
    onSubmit
  } = useMobileNumberForm({ onNext })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col">
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
