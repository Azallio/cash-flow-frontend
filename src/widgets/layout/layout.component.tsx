import { type SharedTypes } from '@shared'
import clsx from 'clsx'
import { Main, Sidebar } from './ui'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children: React.ReactNode
}>

export const Layout = (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <div className={clsx(className, 'flex h-full')} {...restProps}>
      <Sidebar />
      <Main className="h-full w-full p-4">{children}</Main>
    </div>
  )
}
