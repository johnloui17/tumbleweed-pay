import { type ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost'
  loading?: boolean
}

export function Button({ variant = 'primary', loading, children, className, disabled, ...rest }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none'

  const variants = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:scale-[0.97] active:bg-brand-700 px-6 py-3',
    ghost:   'bg-transparent text-muted border border-gray-200 hover:border-gray-300 hover:bg-gray-50 px-6 py-3',
  }

  return (
    <button 
      className={cn(base, variants[variant], className)} 
      disabled={disabled || loading} 
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  )
}
