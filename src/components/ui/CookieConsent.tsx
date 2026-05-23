import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, AlertTriangle, X } from 'lucide-react'
import { Button } from './Button'

/**
 * CookieConsent - Manages browser cookie checks and user consent.
 * Shows a critical warning if cookies are disabled, or a banner for consent.
 */
export function CookieConsent() {
  const [cookiesEnabled, setCookiesEnabled] = useState(true)
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if cookies are enabled in the browser
    const isEnabled = navigator.cookieEnabled
    setCookiesEnabled(isEnabled)

    // If enabled, check if user has already given consent
    if (isEnabled) {
      const consent = localStorage.getItem('cookie-consent')
      if (!consent) {
        // Delay slightly for a better UX
        const timer = setTimeout(() => setShowConsent(true), 1500)
        return () => clearTimeout(timer)
      }
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setShowConsent(false)
  }

  // 1. Critical Error: Cookies are disabled in browser
  if (!cookiesEnabled) {
    return (
      <div className="fixed inset-x-0 top-0 z-[100] bg-red-600 text-white px-6 py-4 flex items-center justify-center gap-3 shadow-lg">
        <AlertTriangle className="w-6 h-6 flex-shrink-0" />
        <p className="font-bold text-sm lg:text-base">
          Cookies are disabled. Tumbleweed Pay requires cookies to function properly. Please enable them in your browser settings.
        </p>
      </div>
    )
  }

  // 2. Standard Consent Banner
  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 inset-x-6 lg:left-auto lg:right-8 lg:w-[400px] z-[90]"
        >
          <div className="bg-white dark:bg-slate-900 rounded-[24px] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-[#E2E8F0] dark:border-slate-800">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-brand-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center flex-shrink-0 text-brand-500">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-[#132C4A] dark:text-white font-bold text-lg mb-1">We value your privacy</h4>
                <p className="text-[#64748B] dark:text-[#94A3B8] text-sm leading-relaxed">
                  We use cookies to improve your registration experience and ensure the security of your account.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={handleAccept}

                className="w-12 h-12 p-0 flex items-center justify-center rounded-2xl border-[#E2E8F0] dark:border-slate-800"
                aria-label="Dismiss"
              >

                Accept Cookies
              </Button>
              <Button
                onClick={() => setShowConsent(false)}
                className="flex-1 py-3 text-sm"
              >
                <X className="w-5 h-5 text-[#94A3B8]" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
