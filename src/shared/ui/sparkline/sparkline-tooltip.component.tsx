import { SharedLib, type SharedTypes } from '@shared'
import clsx from 'clsx'

type AccentedValues = {
  name: string
  color: string
}

type Props<T> = SharedTypes.Ui.PropsWithClassName<{
  accentedValues: AccentedValues[]
  point: T extends Record<string, number | string>
    ? T & {
        date: string
      }
    : never
  color: string | undefined
}>
export function SparklineTooltip<T>(props: Props<T>) {
  const { className, accentedValues, color, point, ...restProps } = props

  return (
    <div className={clsx('flex w-40! flex-col gap-1 bg-transparent', className)} {...restProps}>
      <div className="text-gray-400">{SharedLib.Utils.formatDate(point.date)}</div>
      {accentedValues.map(({ name, color }) => (
        <div
          key={name}
          className={clsx(
            'flex items-center gap-2 text-sm font-semibold',
            point[name] === 0 && 'opacity-25',
            color,
          )}
        >
          {
            SharedLib.Consts.TransactionTypeNameTranslations[
              name as keyof typeof SharedLib.Consts.TransactionTypeNameTranslations
            ]
          }{' '}
          {point[name]} ₽
        </div>
      ))}
    </div>
  )
}
