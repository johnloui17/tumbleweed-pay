import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { accountTypeSchema, type AccountTypeFormData } from '../../../schemas'
import { useRegistrationStore } from '../../../store/registrationStore'

interface UseAccountTypeFormProps {
  onNext: () => void
}

export function useAccountTypeForm({ onNext }: UseAccountTypeFormProps) {
  const accountType = useRegistrationStore((state) => state.accountType)
  const setField = useRegistrationStore((state) => state.setField)

  const { handleSubmit, setValue, watch, formState: { errors, isValid } } = useForm<AccountTypeFormData>({
    resolver: zodResolver(accountTypeSchema),
    defaultValues: { accountType: accountType || undefined },
    mode: 'onChange'
  })

  const currentType = watch('accountType')

  const onSubmit = (data: AccountTypeFormData) => {
    setField('accountType', data.accountType)
    onNext()
  }

  const handleSelectType = (id: 'personal' | 'business') => {
    setValue('accountType', id, { shouldValidate: true })
  }

  return {
    currentType,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
    handleSelectType,
  }
}
