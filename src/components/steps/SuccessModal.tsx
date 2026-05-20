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
      className="absolute inset-0 bg-black/40 flex items-center justify-center z-50 rounded-3xl backdrop-blur-[2px]"
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
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full bg-[#3B6EF7]/10 flex items-center justify-center mx-auto mb-6">
            <Check className="text-[#3B6EF7]" size={32} strokeWidth={3} />
          </div>
          <h2 className="text-[28px] font-medium text-[#0F172A] leading-tight">You're all set!</h2>
          <p className="text-[#94A3B8] text-sm mt-2">Here's a quick summary of your account details</p>
        </div>

        <div className="space-y-4 mb-10">
          {[
            ['Account type', store.accountType === 'personal' ? 'Personal' : 'Business'],
            ['Email',        'jo••••@example.com'], // Hardcoded as per design
            ['Name',         `${store.firstName} ${store.lastName}`],
            ['Mobile Number', maskMobile(store.mobile)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center py-1">
              <span className="text-[#94A3B8] text-sm font-medium">{label}</span>
              <span className="text-[#0F172A] text-sm font-semibold">{value}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-[#64748B] bg-[#F8F9FC] border border-[#E2E8F0] rounded-2xl p-4 mb-10">
          <ShieldCheck className="text-[#3B6EF7]" size={20} />
          <span className="leading-relaxed">Your account is secured with bank-grade security protocols</span>
        </div>

        <button
          className="w-full bg-[#3B6EF7] hover:bg-[#2563EB] text-white rounded-full py-5 font-bold text-lg shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
          onClick={() => { window.location.reload() }}
        >
          Go to Dashboard
        </button>
      </motion.div>
    </motion.div>
  )
}
