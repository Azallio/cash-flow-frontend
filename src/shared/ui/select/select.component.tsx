import { Select as MantineSelect, type SelectProps } from '@mantine/core'
import { selectVariantClassNames } from '@shared/lib/consts/select-classname.const'
import { useTheme } from '@shared/service'

type SelectOption = {
  value: string
  label: string
}

type Props = {
  className?: string
  classNames?: SelectProps['classNames']
  data: SelectOption[]
  value?: string | null
  onChange?: SelectProps['onChange']
  placeholder?: string
  required?: boolean
  disabled?: boolean
  allowDeselect?: boolean
  label?: string
}

export const Select = (props: Props) => {
  const { className, classNames, ...restProps } = props

  const { mode } = useTheme()

  return (
    <MantineSelect
      className={className}
      classNames={{ ...selectVariantClassNames[mode], ...classNames }}
      {...restProps}
    />
  )
}
