import { SharedUi, type SharedTypes } from '@shared'
import { navbarLinks } from '@shared/lib/consts/navbar-links.const'
import { useTheme } from '@shared/service'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink } from 'react-router'

type Props = SharedTypes.Ui.PropsWithClassName<{
  // Add your props here
}>

export const Navbar = (props: Props) => {
  const { className, ...restProps } = props
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const { mode } = useTheme()

  const changeActiveLink = (isActive: boolean, href: string) => {
    if (isActive) {
      setActiveLink(href)
    } else if (activeLink === href) {
      setActiveLink(null)
    }
  }

  return (
    <div className={clsx(className, 'flex flex-col gap-6')} {...restProps}>
      {navbarLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) => {
            changeActiveLink(isActive, link.href)
            return clsx(
              'flex items-center gap-2 p-3 text-center text-lg font-semibold',
              isActive && 'bg-primary rounded-2xl',
              link.disabled && 'pointer-events-none opacity-50',
              mode === 'dark' || (isActive ? 'text-white' : 'text-black!'),
            )
          }}
        >
          <SharedUi.Icon
            name={link.icon}
            className={clsx(
              'text-text size-5',
              mode === 'dark' || (activeLink === link.href ? 'text-white' : 'text-black!'),
            )}
          />
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}
