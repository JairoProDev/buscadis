import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="bg-white border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Buscadis"
            width={32}
            height={32}
            priority
          />
          <span className="text-xl font-bold">Buscadis</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/publicar">
              Publicar Anuncio
            </Link>
          </Button>
        </div>
      </nav>
    </header>
  );
} 