import { MantineProvider } from '@mantine/core'
import { useEffect, useState } from 'react'

import { ThemeContext, type ThemeMode } from '../context/theme.context'

type Props = React.PropsWithChildren<{
  defaultMode?: ThemeMode
}>

export const ThemeProvider = (props: Props) => {
  const { children, defaultMode } = props
  const [mode, setMode] = useState<ThemeMode>(defaultMode ?? 'dark')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const saved = localStorage.getItem('theme-mode') as ThemeMode | null
    if (saved) {
      setMode(saved)
    } else {
      const prefersLight = !window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersLight ? 'light' : 'dark')
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement

    root.setAttribute('data-theme', mode)

    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    localStorage.setItem('theme-mode', mode)
  }, [mode])

  const toggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <MantineProvider forceColorScheme={mode}>{children}</MantineProvider>
    </ThemeContext.Provider>
  )
}
