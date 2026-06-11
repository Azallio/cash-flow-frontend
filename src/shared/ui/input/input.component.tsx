import { TextInput } from '@mantine/core'
import type { SharedTypes } from '@shared'
import { inputVariantClassNames } from '@shared/lib/consts/input-classname.const'

type Props = SharedTypes.Ui.PropsWithClassName<{
  label?: string
  placeholder?: string
  type?: string
  value?: string
  defaultValue?: string
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}>

export const Input = (props: Props) => {
  const { className, label, placeholder, type, value, defaultValue, onChange, required, ...restProps } = props

  return (
    <TextInput
      classNames={
        (inputVariantClassNames['dark'],
        { input: inputVariantClassNames['dark'].input + (type === 'date' && ' uppercase') })
      }
      defaultValue={defaultValue}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      {...restProps}
    />
  )
}
