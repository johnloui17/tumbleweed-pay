import { type InputHTMLAttributes, forwardRef, memo } from 'react'
import { cn } from '../../utils/cn'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormField = memo(
  forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, className, id, ...props }, ref) => {
      const renderLabel = () => {
        if (label.endsWith('*')) {
          return (
            <>
              {label.slice(0, -1)}
              <span className="text-error">*</span>
            </>
          )
        }
        return label
      }

      return (
        <div className="space-y-1.5 w-full">
          <label 
            htmlFor={id} 
            className="block text-sm font-medium text-[#94A3B8]"
          >
            {renderLabel()}
          </label>
          <input
            id={id}
            ref={ref}
            className={cn(
              'block w-full px-6 py-4 rounded-2xl border-[1.5px] transition-all duration-150 outline-none text-lg',
              'focus:border-[#0054FD]',
              error ? 'border-error' : 'border-[#D9E0E6]',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : undefined}
            {...props}
          />
          {error && (
            <p 
              id={`${id}-error`} 
              className="text-xs text-error font-medium"
            >
              {error}
            </p>
          )}
        </div>
      )
    }
  )
)

FormField.displayName = 'FormField'
