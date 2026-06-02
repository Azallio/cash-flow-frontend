import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  // Add your props here
}>

export const Header = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <div className={clsx(className, 'flex items-center justify-between px-16 py-4')} {...restProps}>
      <h1 className="text-3xl font-bold">Cash Flow App</h1>
      <SharedUi.ThemeToggle />
    </div>
  )
}
