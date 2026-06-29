import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName

export const Sidebar = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <div className={clsx(className, 'flex justify-between')} {...restProps}>
      <div className="bg-surface flex h-screen flex-col gap-4 px-4 py-4">
        <SharedUi.Link to="/" className="flex items-center gap-2">
          <SharedUi.Icon name="favicon" className="size-8" />
          <h1 className="text-3xl font-semibold whitespace-nowrap">Cash Flow</h1>
        </SharedUi.Link>

        <SharedUi.Navbar className="flex gap-6" />
      </div>
      <SharedUi.ThemeToggle className="absolute bottom-4 left-4" />
    </div>
  )
}
