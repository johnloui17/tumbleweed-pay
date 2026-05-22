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
  const setField = useRegistrationStore((state) => state.setField)
  
  const { register, handleSubmit, formState: { errors } } = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: { firstName, lastName },
  })

  const onSubmit = (data: NameFormData) => {
    setField('firstName', data.firstName)
    setField('lastName', data.lastName)
    onNext()
  }

  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  }
}
