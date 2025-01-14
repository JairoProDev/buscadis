'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Menu, Bell, User } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-600">Buscadis</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar clasificados..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/publicar" 
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Publicar Anuncio
            </Link>
            <Link href="/notificaciones" className="text-gray-600 hover:text-gray-900">
              <Bell className="h-6 w-6" />
            </Link>
            <Link href="/mi-cuenta" className="text-gray-600 hover:text-gray-900">
              <User className="h-6 w-6" />
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Buscar clasificados..."
                className="px-4 py-2 rounded-lg border border-gray-200"
              />
              <Link 
                href="/publicar"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg text-center"
              >
                Publicar Anuncio
              </Link>
              <Link href="/notificaciones" className="px-4 py-2">
                Notificaciones
              </Link>
              <Link href="/mi-cuenta" className="px-4 py-2">
                Mi Cuenta
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 