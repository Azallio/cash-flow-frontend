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
  searchable?: boolean
  clearable?: boolean
}

export const Select = (props: Props) => {
  const { className, classNames, searchable, clearable, ...restProps } = props

  const { mode } = useTheme()

  return (
    <MantineSelect
      checkIconPosition="right"
      clearable={clearable}
      searchable={searchable}
      className={className}
      comboboxProps={{
        transitionProps: {
          transition: 'scale-y',
          duration: 200,
          timingFunction: 'ease',
        },
      }}
      classNames={{ ...selectVariantClassNames[mode], ...classNames }}
      {...restProps}
    />
  )
}
