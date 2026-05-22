import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShieldCheck, 
  Wallet, 
  ArrowRight, 
  Search, 
  Settings, 
  Bell,
  X,
  Moon 
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button, Tooltip } from '../../ui'
import { useRegistrationStore } from '../../../store/registrationStore'
import { useThemeStore } from '../../../store/themeStore'
import { WelcomeIllustration } from './WelcomeIllustration'
import { ThemeToggle } from './ThemeToggle'
import { cn } from '../../../utils'

type WalkthroughStep = 'idle' | 'theme' | 'bell' | 'settings' | 'profile' | 'focusing'

/**
 * WelcomeDashboard - An interactive dashboard preview shown after successful registration.
 * Provides a warm welcome and clear next steps for the new user.
 */
export function WelcomeDashboard() {
  const firstName = useRegistrationStore((state) => state.firstName)
  const reset = useRegistrationStore((state) => state.reset)
  const { toggleTheme } = useThemeStore()
  const [showThemeBanner, setShowThemeBanner] = useState(false)
  const [walkthroughStep, setWalkthroughStep] = useState<WalkthroughStep>('idle')

  useEffect(() => {
    // Show theme banner if not dismissed
    const dismissed = localStorage.getItem('themeBannerDismissed')
    if (!dismissed) {
      setShowThemeBanner(true)
    }

    const timers: NodeJS.Timeout[] = []

    // Walkthrough sequence
    timers.push(setTimeout(() => setWalkthroughStep('theme'), 500))
    timers.push(setTimeout(() => toggleTheme(), 1500))
    timers.push(setTimeout(() => toggleTheme(), 3500))
    
    // Navbar tooltips one by one
    timers.push(setTimeout(() => setWalkthroughStep('bell'), 4500))
    timers.push(setTimeout(() => setWalkthroughStep('settings'), 6000))
    timers.push(setTimeout(() => setWalkthroughStep('profile'), 7500))
    
    // Final focus on logout
    timers.push(setTimeout(() => setWalkthroughStep('focusing'), 9000))

    return () => timers.forEach(clearTimeout)
  }, [toggleTheme])

  const dismissBanner = () => {
    setShowThemeBanner(false)
    localStorage.setItem('themeBannerDismissed', 'true')
  }

  const handleLogout = () => {
    reset()
    window.location.href = '/'
  }

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

  const isDimmed = !['idle', 'focusing'].includes(walkthroughStep)

  return (
    <div className="min-h-screen bg-[#F6F7F9] dark:bg-slate-950 flex flex-col transition-colors duration-300">
      <AnimatePresence>
        {showThemeBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#3B6EF7] text-white px-6 py-3 flex items-center justify-between z-50"
          >
            <div className="flex items-center gap-2">
              <Moon className="w-5 h-5" />
              <p className="text-sm font-medium">Try out our new Dark Mode for a better experience!</p>
            </div>
            <button onClick={dismissBanner} className="text-white/80 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-[#E2E8F0] dark:border-slate-800 px-6 lg:px-20 py-4 flex justify-between items-center z-10 relative">
        <motion.div 
          animate={{ opacity: isDimmed ? 0.3 : 1 }}
          className="flex items-center gap-2"
        >
          <div className="w-8 h-8 bg-[#3B6EF7] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <span className="text-[#132C4A] dark:text-white font-bold text-xl">Tumbleweed Pay</span>
        </motion.div>

        <div className="flex items-center gap-4 text-[#94A3B8] relative z-20">
          <motion.div animate={{ opacity: ['idle', 'theme', 'focusing'].includes(walkthroughStep) ? 1 : 0.3 }}>
            <ThemeToggle />
          </motion.div>
          
          <motion.div animate={{ opacity: ['idle', 'bell', 'focusing'].includes(walkthroughStep) ? 1 : 0.3 }}>
            <Tooltip content="Notifications" isOpen={walkthroughStep === 'bell'}>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl border-[#E2E8F0] dark:border-slate-800">
                <Bell className="w-5 h-5" />
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div animate={{ opacity: ['idle', 'settings', 'focusing'].includes(walkthroughStep) ? 1 : 0.3 }}>
            <Tooltip content="Settings" isOpen={walkthroughStep === 'settings'}>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl border-[#E2E8F0] dark:border-slate-800">
                <Settings className="w-5 h-5" />
              </Button>
            </Tooltip>
          </motion.div>

          <motion.div animate={{ opacity: ['idle', 'profile', 'focusing'].includes(walkthroughStep) ? 1 : 0.3 }}>
            <Tooltip content="Account Profile" isOpen={walkthroughStep === 'profile'}>
              <div className="w-10 h-10 bg-brand-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-brand-500 dark:text-brand-400 font-bold text-sm cursor-pointer border border-[#E2E8F0] dark:border-slate-800">
                {firstName?.[0] || 'U'}
              </div>
            </Tooltip>
          </motion.div>
        </div>
      </header>

      <main className="flex-1 px-6 lg:px-20 py-10 lg:py-16 overflow-y-auto">
        <motion.div 
          animate={{ opacity: isDimmed ? 0.3 : 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-3xl lg:text-5xl font-bold text-[#132C4A] dark:text-white mb-4">
                Welcome to Tumbleweed Pay, {firstName}! 👋
              </h1>
              <p className="text-[#64748B] dark:text-[#94A3B8] text-lg lg:text-xl">
                Your account is ready. Let's get you started with a few simple steps.
              </p>
            </motion.div>
            
            <WelcomeIllustration className="w-full max-w-sm lg:w-[400px] flex-shrink-0" />
          </div>

          <div className="grid gap-6 mb-12">
            {nextSteps.map((step, i) => (
              <Tooltip key={i} className="w-full">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-[#E2E8F0] dark:border-slate-800 flex items-center gap-6 hover:shadow-md dark:hover:border-[#3B6EF7]/50 transition-all group cursor-pointer w-full"
                >
                  <div className="w-12 h-12 bg-[#F8F9FA] dark:bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-[#132C4A] dark:text-white font-bold text-lg mb-1">{step.title}</h3>
                    <p className="text-[#64748B] dark:text-[#94A3B8] text-sm">{step.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      step.status === 'Action required' ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400' :
                      step.status === 'Pending' ? 'bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400' :
                      'bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {step.status}
                    </span>
                    <ArrowRight className="w-5 h-5 text-[#94A3B8] group-hover:text-[#3B6EF7] transition-colors" />
                  </div>
                </motion.div>
              </Tooltip>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Tooltip>
              <Button
                className="px-8 py-5 bg-[#3B6EF7] hover:bg-[#2563EB] text-white font-bold text-lg rounded-full shadow-lg shadow-blue-500/20 flex-1 sm:flex-none"
              >
                Start Exploring
              </Button>
            </Tooltip>
            
            <motion.div
              className={cn(
                "flex-1 sm:flex-none rounded-full transition-all duration-500",
                walkthroughStep === 'focusing' && "gradient-border-loop shadow-lg shadow-blue-500/20"
              )}
              animate={walkthroughStep === 'focusing' ? { 
                scale: [1, 1.03, 1],
              } : { 
                scale: 1, 
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={cn(
                  "w-full px-8 py-5 text-[#64748B] dark:text-[#94A3B8] hover:bg-white dark:hover:bg-slate-800 font-bold text-lg rounded-full",
                  walkthroughStep === 'focusing' && "bg-white dark:bg-slate-900" 
                )}
              >
                Log Out
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
