import type { ReactNode } from 'react'

interface StepLayoutProps {
  children: ReactNode
  currentStep: number
}

export function StepLayout({ children, currentStep }: StepLayoutProps) {
  // Only show progress bar for steps 2-6
  const showProgress = currentStep > 1 && currentStep <= 6
  const progressPercent = ((currentStep - 1) / 5) * 100

  return (
    <div className="min-h-screen lg:h-screen w-full bg-white flex justify-center lg:overflow-hidden">
      <main className="w-full min-h-screen lg:h-full bg-[#F6F7F9] relative flex flex-col lg:grid lg:grid-cols-[47.5%_52.5%] lg:overflow-hidden">
        {/* Background Grid Pattern Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FAEFE6" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Illustration Panel */}
        <section className="relative flex flex-col items-start pt-8 pb-4 lg:pb-20 lg:pl-20 lg:pt-24 z-10 lg:h-full lg:overflow-hidden">
          <div className="w-full max-w-lg flex-shrink-0 px-6 lg:px-0">
            <p className="text-[#132C4A] text-xl lg:text-2xl font-[300] leading-tight lg:leading-8 mb-3 lg:mb-4">Let’s get started</p>
            <h1 className="text-[#132C4A] text-3xl lg:text-5xl font-[700] leading-tight lg:leading-none mb-4 lg:mb-6">
              Create your account
            </h1>
            <p className="text-[#132C4A] text-sm lg:text-base font-[400] leading-tight lg:leading-5">
              Follow the steps to create your account
            </p>
          </div>

          <div className="hidden lg:flex w-full flex-grow items-center justify-end  mt-4 lg:mt-0">
            <img
              src="/image.svg"
              alt="Registration illustration"
              className="w-full max-w-2xl h-auto max-h-full object-contain object-right translate-y-20"
            />
          </div>
        </section>

        {/* Form Panel */}
        <section className="relative flex-1 flex items-center justify-center p-4 lg:p-0 lg:pr-8 lg:pt-20 lg:pb-8 lg:items-start lg:justify-start z-20 lg:h-full lg:overflow-hidden">
          <div className="bg-white rounded-2xl shadow-[-16px_4px_35px_rgba(0,0,0,0.03)] w-full max-w-3xl flex flex-col overflow-hidden lg:h-[calc(100vh-theme(spacing.28))] lg:max-h-[895px]">            {/* Progress Bar */}
            {showProgress && (
              <div className="h-1.5 w-full bg-[#E2E8F0] flex-shrink-0">
                <div
                  className="h-full bg-[#0054FD] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}

            <div className="px-6 py-8 lg:px-16 lg:pt-11 lg:pb-14 flex-1 flex flex-col overflow-y-auto lg:overflow-hidden">
              {children}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
