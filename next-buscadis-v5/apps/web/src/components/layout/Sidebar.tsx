'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuItems = [
  {
    label: 'Mis Clasificados',
    href: '/mis-clasificados',
    icon: '📦'
  },
  {
    label: 'Publicar Nuevo',
    href: '/publicar',
    icon: '➕'
  },
  {
    label: 'Favoritos',
    href: '/favoritos',
    icon: '⭐'
  },
  {
    label: 'Mensajes',
    href: '/mensajes',
    icon: '💬'
  },
  {
    label: 'Mi Cuenta',
    href: '/cuenta',
    icon: '👤'
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700',
              'hover:bg-gray-100 transition-colors',
              pathname === item.href && 'bg-primary/10 text-primary font-medium'
            )}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
} 