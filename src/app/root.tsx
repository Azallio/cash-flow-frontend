import { MantineProvider } from '@mantine/core'
import { queryClient } from '@shared/api'
import { AuthProvider } from '@shared/service/provider/auth-provider.component'
import { ThemeProvider } from '@shared/service/provider/theme-provider.component'
import { QueryClientProvider } from '@tanstack/react-query'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [{ rel: 'icon', href: '/favicon.png', type: 'image/png' }]

export function Layout(props: React.PropsWithChildren) {
  const { children } = props

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cash Flow App</title>
        <Meta />
        <Links />
      </head>

      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider defaultColorScheme="dark">
            <ThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </ThemeProvider>

            <ScrollRestoration />
            <Scripts />
          </MantineProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
