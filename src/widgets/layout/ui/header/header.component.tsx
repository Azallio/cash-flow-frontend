import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  // Add your props here
}>

export const Header = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <div className={clsx(className, 'flex justify-between pr-8')} {...restProps}>
      <div className="bg-surface flex h-screen flex-col gap-4 px-4 py-4">
        <SharedUi.Link to="/" className="flex items-center gap-4">
          <SharedUi.Icon name="favicon" className="size-10" />
          <h1 className="text-5xl font-bold whitespace-nowrap">Cash Flow</h1>
        </SharedUi.Link>

        <SharedUi.Navbar className="flex gap-6" />
      </div>
      <SharedUi.ThemeToggle className="absolute right-4 self-start pt-10" />
    </div>
  )
}
