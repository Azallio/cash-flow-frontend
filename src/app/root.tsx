import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import { ThemeProvider } from '@shared/service/provider/theme-provider.component'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Outlet, Scripts, ScrollRestoration } from 'react-router'
import type { Route } from './+types/root'
import './app.css'

export const links: Route.LinksFunction = () => [{ rel: 'icon', href: '/favicon.png', type: 'image/png' }]

export function Layout(props: React.PropsWithChildren) {
  const { children } = props

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
      },
    },
  })

  return (
    <html suppressHydrationWarning>
      <body>
        <QueryClientProvider client={queryClient}>
          <MantineProvider defaultColorScheme="dark">
            <ThemeProvider defaultMode="dark">{children}</ThemeProvider>
          </MantineProvider>
        </QueryClientProvider>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
