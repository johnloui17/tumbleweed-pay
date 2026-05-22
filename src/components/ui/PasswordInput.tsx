import { useState, forwardRef, memo } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../utils'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const PasswordInput = memo(
  forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ label, error, hint, className, ...props }, ref) => {
      const [show, setShow] = useState(false)

      const renderLabel = () => {
        if (label && label.endsWith('*')) {
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
        <div className="space-y-2">
          {label && <label className="text-[#94A3B8] text-sm font-medium">{renderLabel()}</label>}
          <div className="relative">
            <input
              {...props}
              ref={ref}
              type={show ? 'text' : 'password'}
              className={cn(
                "w-full px-6 py-4 pr-14 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
                "focus:border-[#0054FD]",
                error ? "border-error" : "border-[#D9E0E6]",
                className
              )}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-[#94A3B8] hover:text-[#3B6EF7] transition-colors"
              tabIndex={-1}
            >
              {show ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>
          {error ? (
            <p className="text-sm text-error font-medium pl-2">{error}</p>
          ) : hint ? (
            <p className="text-sm text-[#94A3B8] font-medium pl-2">{hint}</p>
          ) : null}
        </div>
      )
    }
  )
)

PasswordInput.displayName = 'PasswordInput'
