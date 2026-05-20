import { useState, forwardRef } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '../../utils'

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, className, ...props }, ref) => {
    const [show, setShow] = useState(false)

    return (
      <div className="relative">
        <input
          {...props}
          ref={ref}
          type={show ? 'text' : 'password'}
          className={cn(
            "w-full px-6 py-4 pr-14 rounded-2xl border-[1.5px] text-lg outline-none transition-all",
            error ? "border-error" : "border-[#E2E8F0] focus:border-[#3B6EF7]",
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
        {error && (
          <p className="text-sm text-error font-medium mt-1 pl-2">{error}</p>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = 'PasswordInput'
