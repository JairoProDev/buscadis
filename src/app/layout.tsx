import { Analytics } from '@vercel/analytics/react'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'BuscaDis - Marketplace Premium de Anuncios Clasificados',
    template: '%s | BuscaDis'
  },
  description: 'Marketplace premium de anuncios clasificados. Encuentra las mejores oportunidades y publica tus anuncios con calidad garantizada.',
  keywords: [
    'anuncios clasificados',
    'marketplace premium',
    'compra venta',
    'servicios profesionales',
    'anuncios verificados',
    'comercio seguro'
  ],
  authors: [
    {
      name: 'BuscaDis',
      url: 'https://buscadis.com'
    }
  ],
  creator: 'BuscaDis',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://buscadis.com',
    title: 'BuscaDis - Marketplace Premium de Anuncios Clasificados',
    description: 'Marketplace premium de anuncios clasificados. Encuentra las mejores oportunidades y publica tus anuncios con calidad garantizada.',
    siteName: 'BuscaDis'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuscaDis - Marketplace Premium de Anuncios Clasificados',
    description: 'Marketplace premium de anuncios clasificados. Encuentra las mejores oportunidades y publica tus anuncios con calidad garantizada.',
    creator: '@buscadis'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 