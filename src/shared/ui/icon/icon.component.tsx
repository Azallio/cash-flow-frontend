import { Suspense, lazy } from 'react'

const Icons = {
  // icon: lazy(() => import('@assets/icons/icon.svg?react')),
  favicon: lazy(() => import('@assets/icons/favicon.svg?react')),
  sun: lazy(() => import('@assets/icons/sun.svg?react')),
  moon: lazy(() => import('@assets/icons/moon.svg?react')),
  analytics: lazy(() => import('@assets/icons/analytics.svg?react')),
  reports: lazy(() => import('@assets/icons/reports.svg?react')),
  squares: lazy(() => import('@assets/icons/squares.svg?react')),
  trash: lazy(() => import('@assets/icons/trash.svg?react')),
  transactions: lazy(() => import('@assets/icons/transactions.svg?react')),
} as const

export type IconName = keyof typeof Icons

type IconProps = React.SVGAttributes<SVGElement> & {
  name: IconName
}

export function Icon(props: IconProps) {
  const { name, ...restProps } = props

  const Icon = Icons[name] as React.FC<React.SVGProps<SVGSVGElement>>

  return (
    <Suspense fallback={null}>
      <Icon role="img" {...restProps} />
    </Suspense>
  )
}
