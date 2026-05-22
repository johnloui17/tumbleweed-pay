import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils'

export interface CountryCode {
  code: string
  flag: string
  name: string
  dialCode: string
}

const COUNTRIES: CountryCode[] = [
  { code: 'US', flag: '🇺🇸', name: 'United States', dialCode: '+1' },
  { code: 'GB', flag: '🇬🇧', name: 'United Kingdom', dialCode: '+44' },
  { code: 'IN', flag: '🇮🇳', name: 'India', dialCode: '+91' },
  { code: 'AE', flag: '🇦🇪', name: 'United Arab Emirates', dialCode: '+971' },
  { code: 'SG', flag: '🇸🇬', name: 'Singapore', dialCode: '+65' },
  { code: 'AU', flag: '🇦🇺', name: 'Australia', dialCode: '+61' },
]

interface Props {
  value: string
  onChange: (dialCode: string) => void
}

export function CountryCodeSelector({ value, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  
  const selectedCountry = COUNTRIES.find(c => c.dialCode === value) || COUNTRIES[0]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-4 rounded-2xl border-[1.5px] border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all min-w-[90px] sm:min-w-[110px]",
          isOpen && "border-[#3B6EF7] ring-1 ring-[#3B6EF7]/10"
        )}
      >
        <span className="text-xl">{selectedCountry.flag}</span>
        <span className="text-[#0F172A] font-medium">{selectedCountry.dialCode}</span>
        <ChevronDown 
          size={16} 
          className={cn("text-[#94A3B8] transition-transform duration-200", isOpen && "rotate-180")} 
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl z-[60] overflow-hidden animate-fade-up">
          <div className="max-h-64 overflow-y-auto py-2">
            {COUNTRIES.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.dialCode)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F8F9FC] transition-colors text-left",
                  value === country.dialCode && "bg-[#F8F9FC]"
                )}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="flex-1 text-[#0F172A] text-sm font-medium">{country.name}</span>
                <span className="text-[#94A3B8] text-sm">{country.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
