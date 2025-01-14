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
    <html lang="es" className={GeistSans.variable}>
      <body className="min-h-screen bg-gray-50">
        <Header />
        {children}
      </body>
    </html>
  )
}
