import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { Button } from '../../ui'
import { useSuccessModalAction } from './useSuccessModalAction'
import { useRegistrationStore } from '../../../store/registrationStore'

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-1.5">
    <span className="text-[#94A3B8] font-medium">{label}</span>
    <span className="text-[#132C4A] font-bold">{value}</span>
  </div>
)

/**
 * SuccessModal - Displays a confirmation after successful registration.
 */
export function SuccessModal() {
  const { handleDone } = useSuccessModalAction()
  const accountType = useRegistrationStore((state) => state.accountType)
  const email = useRegistrationStore((state) => state.email)
  const firstName = useRegistrationStore((state) => state.firstName)
  const lastName = useRegistrationStore((state) => state.lastName)
  const mobile = useRegistrationStore((state) => state.mobile)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[32px] p-8 lg:p-12 shadow-2xl flex flex-col items-center my-auto"
      >
        <div className="w-16 h-16 bg-white border-2 border-[#3B6EF7] rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-[#3B6EF7]" strokeWidth={3} aria-hidden="true" />
        </div>

        <h3 className="text-3xl font-bold text-[#132C4A] mb-2">
          You're all set!
        </h3>
        
        <p className="text-[#64748B] text-lg mb-8">
          Here’s a quick summary of your account details
        </p>

        <div className="w-full bg-[#F8F9FA] rounded-2xl p-6 mb-8 text-sm lg:text-base">
          <SummaryRow label="Account Type" value={accountType || 'Personal'} />
          <SummaryRow label="Email" value={email} />
          <SummaryRow label="Name" value={`${firstName} ${lastName}`} />
          <SummaryRow label="Mobile Number" value={mobile} />
        </div>

        <div className="flex items-center gap-2 mb-10">
          <ShieldCheck className="w-5 h-5 text-[#22C55E]" aria-hidden="true" />
          <p className="text-[#64748B] text-sm">
            Your account is secured with bank-grade security
          </p>
        </div>

        <Button
          onClick={handleDone}
        >
          Go To Dashboard
        </Button>
      </motion.div>
    </div>
  )
}
