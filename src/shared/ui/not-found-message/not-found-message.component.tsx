import { SharedUi, type SharedTypes } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName<{
  title?: string
}>

export const NotFoundMessage = (props: Props) => {
  const { className, title, ...restProps } = props

  return (
    <div className={clsx(className)} {...restProps}>
      <SharedUi.ContentBlock className="flex flex-col items-center gap-4 bg-primary/10! text-primary w-max mx-auto">
        {title && <h2 className="text-lg font-semibold">{title}</h2>}
      </SharedUi.ContentBlock>
    </div>
  )
}
