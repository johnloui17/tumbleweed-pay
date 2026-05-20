import { type InputHTMLAttributes, forwardRef } from 'react'
import { cn } from '../../utils/cn'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="space-y-1.5 w-full">
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={cn(
            'block w-full px-4 py-3 rounded-xl border transition-all duration-150 outline-none',
            'focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500',
            error ? 'border-error' : 'border-gray-200 hover:border-gray-300',
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

FormField.displayName = 'FormField'
