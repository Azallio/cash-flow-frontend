type Props = React.PropsWithChildren<{
  className?: string
}>

export function Main(props: Props) {
  const { children, className } = props

  return <main className={className}>{children}</main>
}
