import type { SelectProps } from '@mantine/core'

export const selectVariantClassNames: SelectProps['classNames'] = {
  root: 'font-sf-pro! w-full! bg-white! dark:bg-surface! rounded-xl! border-2! border-primary!',
  input:
    'border-primary! rounded-xl! border-2! w-full! bg-white! dark:bg-surface! px-3! text-sm! outline-none! shadow-none! h-12! font-sf-pro! font-semibold! text-text!',
  option: 'font-sf-pro! text-sm! font-semibold! hover:bg-gray-100! dark:hover:bg-gray-100/50!',
  dropdown: 'border-2! border-primary! bg-white! dark:bg-surface! rounded-xl!',
}
