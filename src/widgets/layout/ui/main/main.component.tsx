type Props = React.PropsWithChildren<{}>

export function Main(props: Props) {
  const { children } = props

  return <main>{children}</main>
}
