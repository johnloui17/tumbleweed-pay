import { type InputHTMLAttributes, forwardRef, memo } from 'react'
import { cn } from '../../utils/cn'
import { Label } from './Label'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

export const FormField = memo(
  forwardRef<HTMLInputElement, FormFieldProps>(
    ({ label, error, className, id, ...props }, ref) => {
      return (
        <div className="space-y-1.5 w-full">
          <Label htmlFor={id}>{label}</Label>
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
