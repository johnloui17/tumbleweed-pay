import { useRegistrationStore } from '../../../store/registrationStore'

export function useSuccessModalAction() {
  const { setField } = useRegistrationStore()

  const handleDone = () => {
    setField('isCompleted', true)
  }

  return {
    handleDone
  }
}
