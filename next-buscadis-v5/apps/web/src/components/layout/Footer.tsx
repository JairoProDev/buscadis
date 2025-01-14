export function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Acerca de Buscadis</h3>
            <p className="text-gray-600">
              Plataforma de clasificados online para empleos, inmuebles, 
              vehículos y más.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Enlaces Útiles</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terminos" className="text-gray-600 hover:text-gray-900">
                  Términos y Condiciones
                </a>
              </li>
              <li>
                <a href="/privacidad" className="text-gray-600 hover:text-gray-900">
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a href="/contacto" className="text-gray-600 hover:text-gray-900">
                  Contacto
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Buscadis. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 