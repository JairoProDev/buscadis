import './globals.css'
import type { Metadata } from 'next'
import { Header } from '@/components/Header'

export const metadata: Metadata = {
  title: 'Buscadis - La mejor plataforma de clasificados',
  description: 'Encuentra y publica clasificados de forma rápida y segura',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50">
        <Header />
        {children}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Sobre Buscadis</h3>
                <ul className="space-y-2">
                  <li>Quiénes somos</li>
                  <li>Contacto</li>
                  <li>Blog</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
                <ul className="space-y-2">
                  <li>Centro de ayuda</li>
                  <li>Reglas de publicación</li>
                  <li>Seguridad</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>Términos y condiciones</li>
                  <li>Política de privacidad</li>
                  <li>Cookies</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
                <div className="flex space-x-4">
                  {/* Aquí irían los iconos de redes sociales */}
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
