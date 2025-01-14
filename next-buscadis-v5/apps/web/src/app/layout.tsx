import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { ThemeProvider } from '@/components/theme-provider'
import { Analytics } from '@/components/analytics'
import { SpeedInsights } from '@/components/speed-insights'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export const metadata: Metadata = {
  title: 'Buscadis - Marketplace Premium',
  description: 'La plataforma líder de clasificados premium en Latinoamérica',
  openGraph: {
    title: 'Buscadis - Marketplace Premium',
    description: 'La plataforma líder de clasificados premium en Latinoamérica',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  )
}
