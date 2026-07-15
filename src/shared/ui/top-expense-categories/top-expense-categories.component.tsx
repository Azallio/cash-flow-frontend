import { type SharedTypes, SharedUi } from '@shared'
import clsx from 'clsx'

type Props = SharedTypes.Ui.PropsWithClassName

export const TopExpenseCategories = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <SharedUi.ContentBlock className={clsx(className, 'flex h-full w-full flex-col gap-4')} {...restProps}>
      {/* Your component content */}
    </SharedUi.ContentBlock>
  )
}
