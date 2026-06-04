import { useEffect, useState } from 'react'
import { ThemeContext, type ThemeMode } from '../context/theme.context'

type Props = React.PropsWithChildren<{
  defaultMode?: ThemeMode
}>

export const ThemeProvider = (props: Props) => {
  const { children, defaultMode } = props
  const [mode, setMode] = useState<ThemeMode>(defaultMode ?? 'dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Инициализируем тему только на клиенте
    if (typeof window === 'undefined') return

    // Проверяем сохранённую тему в localStorage
    const saved = localStorage.getItem('theme-mode') as ThemeMode | null
    if (saved) {
      setMode(saved)
    } else {
      // Если нет сохранённой темы, проверяем системные настройки
      const prefersLight = !window.matchMedia('(prefers-color-scheme: dark)').matches
      setMode(prefersLight ? 'light' : 'dark')
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return

    // Применяем тему к документу
    const root = document.documentElement
    root.setAttribute('data-theme', mode)

    // Применяем класс для Tailwind (если используется)
    if (mode === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }

    // Сохраняем выбор пользователя
    localStorage.setItem('theme-mode', mode)
  }, [mode, mounted])

  const toggle = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return <ThemeContext.Provider value={{ mode, toggle }}>{children}</ThemeContext.Provider>
}
