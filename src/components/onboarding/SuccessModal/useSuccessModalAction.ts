import { useRegistrationStore } from '../../../store/registrationStore'

export function useSuccessModalAction() {
  const setField = useRegistrationStore((state) => state.setField)

  const handleDone = () => {
    setField('isCompleted', true)
  }

  return {
    handleDone
  }
}
