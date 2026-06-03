import { type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  children?: React.ReactNode
}>

export const ContentBlock = (props: Props) => {
  const { className, children, ...restProps } = props

  return (
    <div className={clsx(className, 'bg-surface rounded-lg p-4 shadow-md')} {...restProps}>
      {children}
    </div>
  )
}
