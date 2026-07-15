import { type SharedTypes } from '@shared'
import clsx from 'clsx'

import { Header, Main, Sidebar } from './ui'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children: React.ReactNode
}>

export const Layout = (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <div className={clsx(className, 'flex h-full not-md:flex-col')} {...restProps}>
      <Header className="h-max w-full" />
      <Sidebar className="h-full" />
      <Main className="h-full w-full md:p-4">{children}</Main>
    </div>
  )
}
