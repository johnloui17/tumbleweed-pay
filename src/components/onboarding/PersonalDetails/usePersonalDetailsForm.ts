import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { nameSchema, type NameFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UsePersonalDetailsFormProps {
  onNext: () => void
}

export function usePersonalDetailsForm({ onNext }: UsePersonalDetailsFormProps) {
  const firstName = useRegistrationStore((state) => state.firstName)
  const lastName = useRegistrationStore((state) => state.lastName)
  const setFields = useRegistrationStore((state) => state.setFields)
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { firstName, lastName },
    mode: 'onChange'
  })

  const onSubmit = (data: NameFormData) => {
    setFields({ firstName: data.firstName, lastName: data.lastName })
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
