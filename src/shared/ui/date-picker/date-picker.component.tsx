import { DatePicker as MantineDatePicker, type DatePickerType, type DatesRangeValue } from '@mantine/dates'
import { SharedLib, type SharedTypes } from '@shared'

type DatePickerValue<T extends DatePickerType> = T extends 'range'
  ? DatesRangeValue<string>
  : T extends 'multiple'
    ? string[]
    : string | null

type Props<T extends DatePickerType = 'default'> = SharedTypes.Ui.PropsWithClassName<{
  type?: T
  value?: DatePickerValue<T>
  onChange?: (value: DatePickerValue<T>) => void
}>

export const DatePicker = <T extends DatePickerType = 'default'>(props: Props<T>) => {
  const { className, type, value, onChange, ...restProps } = props

  return (
    <MantineDatePicker
      className={className}
      classNames={SharedLib.Consts.datePickerVariantClassNames}
      type={type}
      locale="ru"
      size="xl"
      value={value}
      onChange={onChange}
      {...restProps}
    />
  )
}
