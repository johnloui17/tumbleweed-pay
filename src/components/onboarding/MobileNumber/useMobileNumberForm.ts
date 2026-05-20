import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { mobileSchema, type MobileFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseMobileNumberFormProps {
  onNext: () => void
}

export function useMobileNumberForm({ onNext }: UseMobileNumberFormProps) {
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

  return {
    dialCode,
    setDialCode,
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}
