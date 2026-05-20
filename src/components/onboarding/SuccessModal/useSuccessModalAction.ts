import { useRegistrationStore } from '../../../store/registrationStore'

export function useSuccessModalAction() {
  const { reset } = useRegistrationStore()

  const handleDone = () => {
    reset()
    window.location.reload() // Just for demo purposes to restart the flow
  }

  return {
    handleDone
  }
}
