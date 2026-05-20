import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { passwordSchema, type PasswordFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseCreatePasswordFormProps {
  onNext: () => void
}

export function useCreatePasswordForm({ onNext }: UseCreatePasswordFormProps) {
  const { password, setField } = useRegistrationStore()
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { 
      password,
      confirmPassword: ''
    },
  })

  const passwordValue = watch('password', '')
  const confirmPasswordValue = watch('confirmPassword', '')

  const onSubmit = (data: PasswordFormData) => {
    setField('password', data.password)
    onNext()
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    passwordValue,
    confirmPasswordValue
  }
}
