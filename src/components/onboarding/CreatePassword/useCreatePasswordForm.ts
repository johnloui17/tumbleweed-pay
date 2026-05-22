import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema, type PasswordFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseCreatePasswordFormProps {
  onNext: () => void
}

export function useCreatePasswordForm({ onNext }: UseCreatePasswordFormProps) {
  const password = useRegistrationStore((state) => state.password)
  const setField = useRegistrationStore((state) => state.setField)
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { 
      password,
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  const onSubmit = (data: PasswordFormData) => {
    setField('password', data.password)
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
