import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema, type EmailFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseEmailFormProps {
  onNext: () => void
}

export function useEmailForm({ onNext }: UseEmailFormProps) {
  const { email, setField } = useRegistrationStore()
  
  const { register, handleSubmit, formState: { errors } } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email },
  })

  const onSubmit = (data: EmailFormData) => {
    setField('email', data.email)
    onNext()
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}
