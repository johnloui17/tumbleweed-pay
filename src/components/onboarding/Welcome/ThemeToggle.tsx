import { Moon, Sun } from 'lucide-react'
import { Button } from '../../ui'
import { useThemeStore } from '../../../store/themeStore'
import { motion, AnimatePresence } from 'framer-motion'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-xl border-[#E2E8F0] dark:border-slate-800"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 20, scale: 0.8 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-[#64748B]" />
          ) : (
            <Sun className="w-5 h-5 text-[#94A3B8]" />
          )}
        </motion.div>
      </AnimatePresence>
    </Button>
  )
}
