import { StrictMode, useEffect } from 'react'
import App from './App.tsx'
import { useThemeStore } from './store/themeStore'

export function Root() {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme])

  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}
