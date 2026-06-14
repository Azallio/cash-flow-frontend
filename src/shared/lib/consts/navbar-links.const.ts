import type { IconName } from '@shared/ui/icon/icon.component'

type NavbarLink = {
  label: string
  href: string
  disabled?: boolean
  icon: IconName
}

export const NavbarLinks: NavbarLink[] = [
  { label: 'Обзор', href: '/', icon: 'squares' },
  { label: 'Транзакции', href: '/transactions', icon: 'transactions' },
  { label: 'Аналитика', href: '/analytics', disabled: true, icon: 'analytics' },
  { label: 'Отчеты', href: '/reports', disabled: true, icon: 'reports' },
]
