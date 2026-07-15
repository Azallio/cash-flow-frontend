import { Select as MantineSelect, type SelectProps, type SelectStylesNames } from '@mantine/core'
import { selectVariantClassNames } from '@shared/lib/consts/select-classname.const'

interface SelectOption {
  value: string
  label: string
}

interface Props {
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

type StaticClassNames = Partial<Record<SelectStylesNames, string | undefined>>

export const Select = (props: Props) => {
  const { className, classNames, searchable, clearable, ...restProps } = props

  const staticSelectVariantClassNames = selectVariantClassNames as StaticClassNames
  const staticClassNames = classNames as StaticClassNames | undefined

  const resolvedClassNames = {
    ...staticSelectVariantClassNames,
    ...staticClassNames,
  }
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
      classNames={resolvedClassNames}
      {...restProps}
    />
  )
}
