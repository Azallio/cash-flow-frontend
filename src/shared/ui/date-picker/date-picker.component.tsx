import { DatePicker as MantineDatePicker, type DatePickerType, type DatesRangeValue } from '@mantine/dates'
import { SharedLib, type SharedTypes } from '@shared'

type Props = SharedTypes.Ui.PropsWithClassName<{
  type?: DatePickerType
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  value?: DatesRangeValue<string> | string[] | string | null
  onChange?: (value: DatesRangeValue<string> | string[] | string | null) => void
}>

export const DatePicker = (props: Props) => {
  const { className, type, value, onChange, size = 'md', ...restProps } = props

  return (
    <MantineDatePicker
      className={className}
      classNames={SharedLib.Consts.datePickerVariantClassNames}
      type={type}
      locale="ru"
      size={size}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  )
}
