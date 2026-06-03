import { type SharedTypes } from '@shared'
import clsx from 'clsx'
import { Footer, Header, Main } from './ui'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children: React.ReactNode
}>

export const Layout = (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <div className={clsx(className, 'flex h-full')} {...restProps}>
      <Header />
      <Main className="h-full w-full">{children}</Main>
      <Footer />
    </div>
  )
}
