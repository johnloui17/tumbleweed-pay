import { memo, type ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../utils/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full font-[500] text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none hover:shadow-[0_0_15px_rgba(0,84,253,0.4)] active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-[#0054FD] text-white',
        ghost: 'bg-transparent border-[2px] border-[#D9E0E6] text-[#0054FD]',
        outline: 'bg-transparent border-2 border-[#0054FD] text-[#0054FD]',
      },
      size: {
        default: 'w-full sm:w-64 h-12 px-6',
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

export const Button = memo(function Button({ variant, size, loading, children, className, disabled, ...rest }: ButtonProps) {
  return (
    <button 
      className={cn(buttonVariants({ variant, size }), className)} 
      disabled={disabled || loading} 
      {...rest}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
})
