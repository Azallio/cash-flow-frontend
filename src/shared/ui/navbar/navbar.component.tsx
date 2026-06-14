import { SharedLib, SharedUi, type SharedTypes } from '@shared'
import { useTheme } from '@shared/service'
import clsx from 'clsx'
import { NavLink } from 'react-router'

type Props = SharedTypes.Ui.PropsWithClassName

export const Navbar = (props: Props) => {
  const { className, ...restProps } = props
  const { mode } = useTheme()

  return (
    <div className={clsx(className, 'flex flex-col gap-6')} {...restProps}>
      {SharedLib.Consts.NavbarLinks.map((link) => (
        <NavLink
          key={link.href}
          to={link.href}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-2 p-3 text-center text-lg font-semibold',
              isActive && 'bg-primary rounded-2xl',
              link.disabled && 'pointer-events-none opacity-50',
              mode === 'dark' ? 'text-white' : isActive ? 'text-white' : 'text-black',
            )
          }
        >
          {({ isActive }) => (
            <>
              <SharedUi.Icon
                name={link.icon}
                className={clsx(
                  'size-5',
                  mode === 'dark' ? 'text-white' : isActive ? 'text-white' : 'text-black',
                )}
              />
              {link.label}
            </>
          )}
        </NavLink>
      ))}
    </div>
  )
}
