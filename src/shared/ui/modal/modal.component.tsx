import { Modal as MantineModal } from '@mantine/core'
import { useTheme } from '@shared/service'

type Props = React.ComponentPropsWithRef<typeof MantineModal>

const modalThemeClassNames = {
  dark: {
    content: 'bg-surface! border! border-border! rounded-2xl!',
    header: 'bg-surface! border-b! border-border! px-6! py-4!',
    title: 'text-text! text-lg! font-semibold! font-sf-pro!',
    body: 'text-text! px-6! py-5!',
    close: 'text-text! hover:bg-bg!',
  },
  light: {
    content: 'bg-white! border! border-border! rounded-2xl!',
    header: 'bg-white! border-b! border-border! px-6! py-4!',
    title: 'text-text! text-lg! font-semibold! font-sf-pro!',
    body: 'text-text! px-6! py-5!',
    close: 'text-text! hover:bg-bg!',
  },
} as const

export const Modal = (props: Props) => {
  const { classNames, overlayProps, ...restProps } = props

  const { mode } = useTheme()

  return (
    <MantineModal
      centered
      classNames={{ ...modalThemeClassNames[mode], ...classNames }}
      overlayProps={{ backgroundOpacity: 0.45, blur: 4, ...overlayProps }}
      {...restProps}
    />
  )
}
