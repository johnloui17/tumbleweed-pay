import { useState, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../utils'

interface TooltipProps {
  children: ReactNode
  content?: string
  className?: string
  isOpen?: boolean
}

export function Tooltip({ children, content = 'Feature coming soon', className, isOpen = false }: TooltipProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isVisible = isHovered || isOpen

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-lg whitespace-nowrap z-[100] shadow-xl pointer-events-none dark:bg-[#3B6EF7]"
          >
            {content}
            {/* Arrow */}
            <div className="absolute bottom-full right-3 border-[6px] border-transparent border-b-slate-900 dark:border-b-[#3B6EF7]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
