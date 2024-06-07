BUSCADIS/
│
├── client/                    # Carpeta del cliente Front-end
│   ├── public/                # Archivos públicos como el favicon y manifest.json
│   │   ├── images/            # Imágenes estáticas para el sitio
│   │   │   ├── favicon.ico
│   │   │   ├── logo-color.ico
│   │   │   ├── logo192.png
│   │   │   ├── logo512.png
│   │   │   ├── PublicAdis-logo.png
│   │   │   └── ...
│   │   ├── detectAdblockers.js
│   │   ├── index.html
│   │   ├── manifest.json
│   │   ├── robots.txt
│   │   └── ...
│   ├── src/                   # Código fuente del cliente
│   │   ├── components/        # Componentes de React
│   │   │   ├── AdCard/        # Componente para tarjetas de anuncios
│   │   │   │   ├── AdCard.js
│   │   │   │   └── AdCard.css
│   │   │   ├── AdForm/        # Formulario para la publicación de anuncios
│   │   │   │   ├── AdForm.js
│   │   │   │   ├── AdForm.css
│   │   │   │   └── AdFormLogic.js
│   │   │   ├── AdList/        # Lista de anuncios
│   │   │   │   ├── AdList.js
│   │   │   │   └── AdList.css
│   │   │   ├── AdModal/       # Modal para mostrar detalles de anuncios
│   │   │   │   ├── AdModal.js
│   │   │   │   └── AdModal.css
│   │   │   ├── AuthForm/      # Formularios de autenticación (Login y Registro)
│   │   │   │   ├── LoginForm.js
│   │   │   │   ├── RegisterForm.js
│   │   │   │   └── AuthForm.css
│   │   │   ├── Header/        # Cabecera del sitio
│   │   │   │   ├── Header.js
│   │   │   │   └── Header.css
│   │   │   ├── NavList/       # Lista de navegación
│   │   │   │   ├── NavList.js
│   │   │   │   └── NavList.css
│   │   │   ├── Sidebar/       # Barra lateral
│   │   │   │   ├── Sidebar.js
│   │   │   │   └── Sidebar.css
│   │   │   ├── SocialMedia/   # Botones o enlaces a redes sociales
│   │   │   │   ├── SocialMedia.js
│   │   │   │   └── SocialMedia.css
│   │   │   └── UserProfile/   # Perfil de usuario
│   │   │       ├── UserProfile.js
│   │   │       └── UserProfile.css
│   │   ├── hooks/             # Hooks personalizados
│   │   │   ├── useAds.js
│   │   │   ├── useAuth.js
│   │   │   ├── useSearch.js
│   │   │   └── ...
│   │   ├── images/            # Imágenes y iconos
│   │   │   ├── cursor-lupa.png
│   │   │   ├── jobs.png
│   │   │   ├── playstore.png
│   │   │   └── ...
│   │   ├── styles/            # Hojas de estilo
│   │   │   ├── root.css
│   │   │   ├── body.css
│   │   │   ├── navbar.css
│   │   │   └── ...
│   │   ├── App.js             # Componente principal de la aplicación
│   │   ├── index.js           # Punto de entrada de React
│   │   └── reportWebVitals.js # Script para medir el rendimiento
│   ├── package.json           # Dependencias y scripts del cliente
│   ├── .env                   # Variables de entorno para el cliente
│   └── README.md              # Documentación del cliente
│
└── .gitignore                 # Archivos y carpetas ignorados por Git
│
├── server/                    # Carpeta del servidor Back-end
│   ├── .vscode/               # Configuraciones específicas de VSCode
│   │   └── settings.json      # Configuraciones del editor
│   ├── controllers/           # Controladores para la lógica de servidor
│   │   ├── adController.js    # Controlador para anuncios
│   │   └── userController.js  # Controlador para usuarios
│   ├── middlewares/           # Middlewares de express
│   │   ├── authenticateToken.js  # Middleware para autenticación de tokens
│   │   └── customMiddleware.js   # Middleware personalizado
│   ├── models/                # Modelos de Mongoose
│   │   ├── adModel.js         # Modelo para anuncios
│   │   ├── jobDetails.js      # Modelo para detalles de empleos
│   │   ├── productDetails.js  # Modelo para detalles de productos
│   │   ├── propertyDetails.js # Modelo para detalles de propiedades
│   │   ├── serviceDetails.js  # Modelo para detalles de servicios
│   │   ├── User.js            # Modelo para usuarios
│   │   ├── vehicleDetails.js  # Modelo para detalles de vehículos
│   │   └── VisitorCount.js    # Modelo para el contador de visitantes
│   ├── routes/                # Rutas API
│   │   ├── adRoutes.js        # Rutas para anuncios
│   │   ├── authRoutes.js      # Rutas para autenticación
│   │   └── imageRoutes.js     # Rutas para manejo de imágenes
│   ├── seeds/                 # Datos de inicio para la base de datos
│   ├── uploads/               # Archivos subidos por los usuarios
│   ├── app.js                 # Aplicación principal del servidor
│   ├── package-lock.json      # Control de versiones de paquetes para npm
│   ├── package.json           # Configuración de dependencias de npm
│   ├── .env                   # Variables de entorno
│   ├── .gitignore             # Especifica archivos no rastreados por git
│   ├── directory_structure.md # Documentación de la estructura del directorio
│   ├── Procfile               # Configuración para despliegues en Heroku
│   └── sitemap.xml            # Mapa del sitio para motores de búsqueda
│
└── README.md                  # Documentación principal del servidor
