import type { SelectProps } from '@mantine/core'
import type { ThemeMode } from '@shared/service'

export const selectVariantClassNames: Record<ThemeMode, SelectProps['classNames']> = {
  dark: {
    root: 'font-sf-pro! w-full!',
    input:
      'border-primary! rounded-xl! border-2! w-full! bg-surface! px-3! text-sm! outline-none! shadow-none! h-12! font-sf-pro! font-semibold! text-text!',
    option: 'font-sf-pro! text-sm! font-semibold!',
    dropdown: 'border-2! border-primary! bg-surface! rounded-xl!',
  },
  light: {
    root: 'font-sf-pro! w-full!',
    input:
      'border-primary! rounded-xl! border-2! w-full! bg-white! px-3! text-sm! outline-none! shadow-none! h-12! font-sf-pro! font-semibold! text-text!',
    option: 'font-sf-pro! text-sm! font-semibold! hover:bg-gray-100!',
    dropdown: 'border-2! border-primary! bg-white! rounded-xl!',
  },
}
