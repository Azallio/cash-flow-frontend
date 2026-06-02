import { useTheme } from '@shared/service/hook/use-theme.hook'
import { Icon } from '../icon/icon.component'
import { SharedUi } from '@shared'

export const ThemeToggle = () => {
  const { mode, toggle } = useTheme()

  return (
    <SharedUi.Button
      onClick={toggle}
      className="hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg p-2 transition-colors"
    >
      <Icon name={mode === 'light' ? 'moon' : 'sun'} className="size-5" />
    </SharedUi.Button>
  )
}
  