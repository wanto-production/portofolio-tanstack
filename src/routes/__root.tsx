import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { FormDevtoolsPlugin } from '@tanstack/react-form-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ThemeProvider } from '@/providers/theme-provider'
import { Header } from '@/components/header'

import appCss from '../styles.css?url'
import { lazy, Suspense } from 'react'

const LazyFooter = lazy(() => import("@/components/footer"))

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'keywords', content: ["portofolio", "portofolio ikhwan", "portofolio ikhwan satrio", "ikhwan,ikhwan satrio", "young dev portofolio"].join(',')
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          {children}
          <Suspense>
            <LazyFooter />
          </Suspense>
        </ThemeProvider>
        <TanStackDevtools
          config={{
            position: 'bottom-left',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            FormDevtoolsPlugin()
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
