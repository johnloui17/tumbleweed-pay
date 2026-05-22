import { memo, type ReactNode } from 'react'
import { cn } from '../../utils/cn'

interface LabelProps {
  children: ReactNode
  htmlFor?: string
  className?: string
}

/**
 * Label - Atomic UI component for form labels.
 * Automatically handles required field indicators (ending with '*')
 */
export const Label = memo(function Label({ children, htmlFor, className }: LabelProps) {
  const renderContent = () => {
    if (typeof children === 'string' && children.endsWith('*')) {
      return (
        <>
          {children.slice(0, -1)}
          <span className="text-error ml-0.5">*</span>
        </>
      )
    }
    return children
  }

  return (
    <label 
      htmlFor={htmlFor} 
      className={cn('block text-sm font-medium text-[#94A3B8]', className)}
    >
      {renderContent()}
    </label>
  )
})
