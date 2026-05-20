import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { Button } from '../../ui'
import { useSuccessModalAction } from './useSuccessModalAction'

/**
 * SuccessModal - Displays a confirmation after successful registration.
 */
export function SuccessModal() {
  const { handleDone } = useSuccessModalAction()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[32px] p-8 lg:p-12 shadow-2xl flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 lg:w-24 lg:h-24 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-10 h-10 lg:w-12 lg:h-12 text-green-500" />
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-[#0F172A] mb-4">
          Registration Successful!
        </h3>
        
        <p className="text-[#64748B] text-lg mb-10">
          Your account has been created successfully. You can now start using Tumbleweed Pay.
        </p>

        <Button
          onClick={handleDone}
          className="w-full py-5 bg-[#3B6EF7] hover:bg-[#2563EB] text-white font-bold text-lg rounded-full shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
        >
          Done
        </Button>
      </motion.div>
    </div>
  )
}
