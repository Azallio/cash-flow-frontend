import { SharedUi, type SharedTypes } from '@shared'
import { useTheme } from '@shared/service/hook/use-theme.hook'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName

export const ThemeToggle = (props: Props) => {
  const { className, ...restProps } = props

  const { mode, toggle } = useTheme()

  return (
    <SharedUi.Button
      onClick={toggle}
      className={clsx(
        'hover:bg-primary-100 dark:hover:bg-primary-900 rounded-lg p-2 transition-colors',
        className,
      )}
      {...restProps}
    >
      <SharedUi.Icon name={mode === 'light' ? 'moon' : 'sun'} className="size-6" />
    </SharedUi.Button>
  )
}
