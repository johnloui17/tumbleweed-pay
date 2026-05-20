import { motion } from 'framer-motion'
import { useRegistrationStore } from '../../store/registrationStore'
import { Check, ShieldCheck } from 'lucide-react'

export function SuccessModal() {
  const store = useRegistrationStore()

  const maskMobile = (m: string) => m?.replace(/(\d{4})\d{2}(\d{4})/, '$1••$2') || '9711••7290'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[100] backdrop-blur-[2px]"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1,    opacity: 1, y: 0 }}
        exit={{ scale: 0.95,    opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="bg-white rounded-[32px] p-10 w-full max-w-[440px] shadow-2xl mx-4 border-[1.5px] border-[#E2E8F0]"
        role="dialog"
        aria-modal="true"
        aria-label="Account created successfully"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-[#3B6EF7] flex items-center justify-center mx-auto mb-5">
            <Check className="text-[#3B6EF7]" size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-[28px] font-semibold text-[#0F172A] leading-tight">You’re all set!</h2>
          <p className="text-[#94A3B8] text-sm mt-1">Here’s a quick summary of your account details</p>
        </div>

        <div className="bg-[#F8F9FB] rounded-[24px] p-6 space-y-4 mb-6">
          {[
            ['Account type', store.accountType === 'personal' ? 'Personal' : 'Business'],
            ['Email',        'jo••••@example.com'],
            ['Name',         `${store.firstName} ${store.lastName}`],
            ['Mobile Number', maskMobile(store.mobile)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center">
              <span className="text-[#94A3B8] text-sm">{label}</span>
              <span className="text-[#0F172A] text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-[13px] text-[#64748B] mb-8">
          <ShieldCheck className="text-[#3B6EF7]" size={18} />
          <span>Your account is secured with bank-grade security</span>
        </div>

        <button
          className="w-full bg-[#0054FD] hover:bg-[#0044CC] text-white rounded-full py-4 font-semibold text-lg shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all"
          onClick={() => { window.location.reload() }}
        >
          Go To Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}
