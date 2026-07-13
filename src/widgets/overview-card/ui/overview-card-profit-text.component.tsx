import type { SharedTypes } from '@shared'
import { clsx } from 'clsx'

type ChangePercentProps = SharedTypes.Ui.PropsWithClassName<{
  value: number
  inverted?: boolean
}>

export const ChangePercent = (props: ChangePercentProps) => {
  const { className, value, inverted = false, ...restProps } = props
  const color = (() => {
    if (value === 0) return 'text-gray-400'

    if (value > 0) {
      return inverted ? 'text-red-500' : 'text-green-500'
    }

    return inverted ? 'text-green-500' : 'text-red-500'
  })()

  const text = value === 0 ? '0%' : `${value > 0 ? '+' : ''}${value}%`

  return (
    <span className={clsx('text-sm font-medium', color, className)} {...restProps}>
      {text}
    </span>
  )
}
