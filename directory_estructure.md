buscadis/
│
├── client/                    # Carpeta del cliente Front-end
│   ├── public/                # Archivos públicos como el favicon y manifest.json
│   ├── src/                   # Código fuente del cliente
│   │   ├── components/        # Componentes de React
│   │   │   ├── AdCard/        # Componente para tarjetas de anuncios
│   │   │   ├── AdForm/        # Formulario para la publicación de anuncios
│   │   │   ├── AdList/        # Lista de anuncios
│   │   │   ├── AdModal/       # Modal para mostrar detalles de anuncios
│   │   │   ├── AuthForm/      # Formularios de autenticación (Login y Registro)
│   │   │   ├── ContentFeed/   # Feed de contenido principal para categorías
│   │   │   ├── Footer/        # Pie de página
│   │   │   ├── Header/        # Cabecera del sitio
│   │   │   ├── NavList/       # Lista de navegación
│   │   │   ├── SearchBar/     # Barra de búsqueda
│   │   │   ├── Sidebar/       # Barra lateral
│   │   │   ├── SocialMedia/   # Botones o enlaces a redes sociales
│   │   │   └── UserProfile/   # Perfil de usuario
│   │   ├── hooks/             # Hooks personalizados
│   │   ├── images/            # Imágenes y iconos
│   │   ├── styles/            # Hojas de estilo
│   │   ├── App.js             # Componente principal de la aplicación
│   │   ├── index.js           # Punto de entrada de React
│   │   └── reportWebVitals.js # Script para medir el rendimiento
│   ├── .env                   # Variables de entorno para el cliente
│   ├── package.json           # Dependencias y scripts del cliente
│   └── README.md              # Documentación del cliente
│
├── server/                    # Carpeta del servidor Back-end
│   ├── controllers/           # Controladores para la lógica del servidor
│   ├── models/                # Modelos de datos de MongoDB
│   ├── routes/                # Rutas del API
│   ├── seeds/                 # Datos iniciales para la base de datos
│   ├── uploads/               # Archivos subidos por los usuarios
│   ├── app.js                 # Aplicación principal del servidor
│   ├── package.json           # Dependencias y scripts del servidor
│   └── README.md              # Documentación del servidor
│
└── .gitignore                 # Archivos y carpetas ignorados por Git
