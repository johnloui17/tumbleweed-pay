import { type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-bold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-[#3B6EF7] text-white hover:bg-[#2563EB] shadow-lg shadow-blue-500/20 dark:shadow-blue-900/40',
        ghost: 'bg-transparent text-[#64748B] border-[1.5px] border-[#E2E8F0] hover:bg-gray-50 dark:text-[#94A3B8] dark:border-slate-800 dark:hover:bg-slate-900',
        outline: 'bg-transparent border-2 border-[#3B6EF7] text-[#3B6EF7] hover:bg-[#3B6EF7] hover:text-white',
      },
      size: {
        default: 'px-6 py-5 text-lg',
        sm: 'px-4 py-2 text-sm',
        lg: 'px-8 py-5 text-xl',
        icon: 'p-2',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

interface ButtonProps 
  extends ButtonHTMLAttributes<HTMLButtonElement>, 
    VariantProps<typeof buttonVariants> {
  loading?: boolean
}

export function Button({ variant, size, loading, children, className, disabled, ...rest }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)} 
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
