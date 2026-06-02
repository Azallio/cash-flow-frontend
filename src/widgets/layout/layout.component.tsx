import type { SharedTypes } from '@shared'
import { Footer, Header, Main } from './ui'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children: React.ReactNode
}>

export const Layout = (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <div className={className} {...restProps}>
      <Header />
      <Main >{children}</Main>
      <Footer />
    </div>
  )
}
