import { SharedUi, type SharedTypes } from '@shared'
import { navbarLinks } from '@shared/lib/consts/navbar-links.const'
import clsx from 'clsx'
import { NavLink } from 'react-router'

type Props = SharedTypes.Ui.PropsWithClassName<{
  // Add your props here
}>

export const Navbar = (props: Props) => {
  const { className, ...restProps } = props

  return (
    <div className={clsx(className, 'flex flex-col gap-6')} {...restProps}>
      {navbarLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-2 p-3 text-center text-lg font-semibold',
              isActive && 'text-text bg-primary rounded-2xl',
              link.disabled && 'pointer-events-none opacity-50',
            )
          }
        >
          <SharedUi.Icon name={link.icon} className="text-text size-5" />
          {link.label}
        </NavLink>
      ))}
    </div>
  )
}
