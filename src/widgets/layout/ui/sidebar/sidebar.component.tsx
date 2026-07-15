import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName

export const Sidebar = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <div className={clsx(className, 'flex justify-between w-1/5 not-md:hidden')} {...restProps}>
      <div className="bg-surface flex flex-col gap-4 px-4 py-4 w-full">
        <SharedUi.Link to="/" className="flex items-center gap-2">
          <SharedUi.Icon name="favicon" className="size-8" />
          <h1 className="whitespace-nowrap">Cash Flow</h1>
        </SharedUi.Link>

        <SharedUi.Navbar className="flex gap-6" />
      </div>
      <SharedUi.ThemeToggle className="absolute bottom-4 left-4" />
    </div>
  )
}
