import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, type EmailFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseEmailFormProps {
  onNext: () => void
}

export function useEmailForm({ onNext }: UseEmailFormProps) {
  const email = useRegistrationStore((state) => state.email)
  const setField = useRegistrationStore((state) => state.setField)
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
    mode: 'onChange', // Validate on change for button reactivity
  })

  const onSubmit = (data: EmailFormData) => {
    setField('email', data.email)
    onNext()
  }

  return {
    register,
    handleSubmit,
    errors,
    isValid,
    onSubmit
  }
}
