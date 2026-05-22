import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { otpSchema, type OtpFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'
import { useOtpTimer } from '../../../hooks'

interface UseOtpVerificationFormProps {
  onNext: () => void
}

export function useOtpVerificationForm({ onNext }: UseOtpVerificationFormProps) {
  const otp = useRegistrationStore((state) => state.otp)
  const setField = useRegistrationStore((state) => state.setField)
  const { seconds, canResend, resend } = useOtpTimer()
  
  const { control, handleSubmit, formState: { errors } } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: otp || '' },
  })

  const onSubmit = (data: OtpFormData) => {
    setField('otp', data.otp)
    onNext()
  }

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    seconds,
    canResend,
    resend
  }
}
