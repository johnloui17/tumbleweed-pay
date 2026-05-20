import { motion } from 'framer-motion'
import { 
  ShieldCheck, 
  Wallet, 
  ArrowRight, 
  Search, 
  Settings, 
  Bell 
} from 'lucide-react'
import { Button } from '../../ui'
import { useRegistrationStore } from '../../../store/registrationStore'

/**
 * WelcomeDashboard - An interactive dashboard preview shown after successful registration.
 * Provides a warm welcome and clear next steps for the new user.
 */
export function WelcomeDashboard() {
  const { firstName, reset } = useRegistrationStore()

  const nextSteps = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-500" />,
      title: 'Verify your identity',
      description: 'Upload your ID to unlock all platform features.',
      status: 'Action required'
    },
    {
      icon: <Wallet className="w-6 h-6 text-green-500" />,
      title: 'Connect your bank',
      description: 'Link your account to start sending and receiving payments.',
      status: 'Pending'
    },
    {
      icon: <Search className="w-6 h-6 text-purple-500" />,
      title: 'Explore features',
      description: 'Take a quick tour of our digital payment tools.',
      status: 'Optional'
    }
  ]

  return (
    <div className="min-h-screen bg-[#F6F7F9] flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 lg:px-20 py-4 flex justify-between items-center z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#3B6EF7] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-[#132C4A] font-bold text-xl">Tumbleweed Pay</span>
        </div>
        <div className="flex items-center gap-4 text-[#94A3B8]">
          <Bell className="w-5 h-5 cursor-pointer hover:text-[#3B6EF7]" />
          <Settings className="w-5 h-5 cursor-pointer hover:text-[#3B6EF7]" />
          <div className="w-8 h-8 bg-brand-100 rounded-full flex items-center justify-center text-brand-500 font-bold text-xs">
            {firstName?.[0] || 'U'}
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-20 py-10 lg:py-16 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-[#132C4A] mb-4">
              Welcome to Tumbleweed Pay, {firstName}! 👋
            </h1>
            <p className="text-[#64748B] text-lg lg:text-xl">
              Your account is ready. Let's get you started with a few simple steps.
            </p>
          </div>

          <div className="grid gap-6 mb-12">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-[#E2E8F0] flex items-center gap-6 hover:shadow-md transition-shadow group cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#F8F9FA] rounded-xl flex items-center justify-center flex-shrink-0">
                  {step.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-[#132C4A] font-bold text-lg mb-1">{step.title}</h3>
                  <p className="text-[#64748B] text-sm">{step.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    step.status === 'Action required' ? 'bg-red-50 text-red-500' :
                    step.status === 'Pending' ? 'bg-orange-50 text-orange-500' :
                    'bg-slate-50 text-slate-500'
                  }`}>
                    {step.status}
                  </span>
                  <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B6EF7] transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="px-8 py-5 bg-[#3B6EF7] hover:bg-[#2563EB] text-white font-bold text-lg rounded-full shadow-lg shadow-blue-500/20 flex-1 sm:flex-none"
            >
              Start Exploring
            </Button>
            <Button
              variant="ghost"
              onClick={reset}
              className="px-8 py-5 text-[#64748B] hover:bg-white font-bold text-lg rounded-full flex-1 sm:flex-none"
            >
              Log Out
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
