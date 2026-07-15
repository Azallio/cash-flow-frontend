import { Modal as MantineModal } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'

type Props = React.ComponentPropsWithRef<typeof MantineModal>

const modalThemeClassNames = {
  content: 'bg-white! dark:bg-surface! border! border-border! rounded-2xl!',
  header: 'bg-white! dark:bg-surface! border-b! border-border! px-6! py-4!',
  title: 'text-text! text-lg! font-semibold! font-sf-pro!',
  body: 'text-text! px-6! py-5!',
  close: 'text-text! hover:bg-bg!',
} as const

export const Modal = (props: Props) => {
  const { classNames, overlayProps, ...restProps } = props

  const resolvedClassNames = typeof classNames === 'function' ? undefined : classNames

  const isMobile = useMediaQuery('(max-width: 48em)')

  return (
    <MantineModal
      centered
      fullScreen={isMobile}
      className="not-md:size-full!"
      classNames={{ ...modalThemeClassNames, ...resolvedClassNames }}
      overlayProps={{ backgroundOpacity: 0.45, blur: 4, ...overlayProps }}
      {...restProps}
    />
  )
}
