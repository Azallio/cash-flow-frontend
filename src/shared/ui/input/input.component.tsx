import { TextInput } from '@mantine/core'
import type { SharedTypes } from '@shared'
import { inputVariantClassNames } from '@shared/lib/consts/input-classname'

type Props = SharedTypes.Ui.PropsWithClassName<{
  label?: string
  placeholder?: string
  type?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}>

export const Input = (props: Props) => {
  const { className, label, placeholder, type, value, onChange, ...restProps } = props

  return (
    <TextInput
      classNames={inputVariantClassNames['dark']}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  )
}
