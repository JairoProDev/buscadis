// adTypes.js
export const adTypes = {
    Empleos: {
      "Restaurantes y Bares": [
        "Mozo/Moza",
        "Pizzero/Ayudante Pizzero",
        "Ayudante de Cocina",
        "Maestro Parrillero/Especialista en Fast Food",
        "Cajero/Cajera",
        "Cocinero",
        "Bartender",
      ],
      "Hoteles y Alojamiento": [
        "Recepcionista",
        "Personal de Housekeeping",
        "Personal de Cafetería",
        "Mantenimiento",
        "Atención al Cliente",
      ],
      Ventas: [
        "Vendedor(a)",
        "Promotor(a) de Ventas",
        "Ejecutivo de Ventas",
        "Asistente de Ventas",
      ],
      Marketing: [
        "Especialista en Marketing Digital",
        "Diseñador Gráfico",
        "Publicidad Turística",
        "Community Manager",
      ],
      Administración: [
        "Asistente Administrativo",
        "Secretario(a)",
        "Recepcionista Administrativa",
        "Personal de Atención al Cliente",
      ],
      Finanzas: [
        "Contador",
        "Técnico Contable",
        "Asistente Contable",
        "Auditor",
        "Gestor de Recuperaciones",
      ],
      Construcción: [
        "Albañil",
        "Ingeniero Civil",
        "Arquitecto",
        "Maestro de Obra",
      ],
      Logística: [
        "Chofer de Distribución",
        "Almacenero",
        "Auxiliar de Almacén",
        "Coordinador Logístico",
      ],
      Educación: ["Profesor(a)", "Asistente Educativo", "Instructor(a)", "Tutor(a)"],
      Salud: [
        "Médico(a)",
        "Enfermero(a)",
        "Asistente Dental",
        "Técnico en Enfermería",
        "Psicólogo(a)",
      ],
      "Desarrollo de Software": [
        "Desarrollador Frontend",
        "Desarrollador Backend",
        "Desarrollador Full Stack",
      ],
      "Soporte Técnico": [
        "Técnico en Informática",
        "Soporte Técnico",
        "Administrador de Sistemas",
      ],
      "Limpieza y Mantenimiento": [
        "Personal de Limpieza",
        "Mantenimiento",
        "Jardinería",
      ],
      Seguridad: ["Guardia de Seguridad", "Personal de Seguridad"],
      Transporte: ["Chofer", "Conductor"],
      Movilidad: ["Motorizado", "Repartidor"],
      "Diseño Gráfico": [
        "Diseñador Gráfico",
        "Diseñador Web",
        "Ilustrador",
      ],
      "Artes y Oficios": ["Artista", "Artesano"],
      Otros: []
    },
    Inmuebles: {
      Habitaciones: ["Alquiler", "Compartidas", "Amobladas", "Estudiantes"],
      Apartamentos: ["Alquiler", "Venta", "Amoblados", "Nuevos"],
      Casas: ["Alquiler", "Venta", "Nuevas", "Amobladas"],
      Terrenos: ["Venta", "Alquiler", "Agrícolas", "Urbanos"],
      Oficinas: ["Alquiler", "Venta", "Coworking", "Amobladas"],
      Locales: ["Alquiler", "Venta", "Comerciales", "Industriales"],
      Hoteles: ["Venta", "Alquiler", "Boutique", "Resorts"],
      Anticresis: ["Habitaciones", "Apartamentos", "Casas"],
      Otros: ["Garajes", "Depósitos"]
    },
    Vehicles: {
      Autos: ["Sedan", "SUV", "Deportivo", "Convertible"],
      Camionetas: ["Pick-Up", "4x4", "Doble Cabina"],
      Motos: ["Scooter", "Deportiva", "Touring", "Cross"],
      Bicicletas: ["Montaña", "Ruta", "Eléctricas", "BMX"],
      Combis: ["Pasajeros", "Carga", "Turismo"],
      Buses: ["Urbanos", "Interprovinciales", "Turismo"],
      Maquinaria: ["Construcción", "Agrícola", "Industrial"],
      Otros: ["Repuestos", "Accesorios"]
    },
    Servicios: {
      Educación: ["Tutorías", "Clases Particulares", "Cursos en Línea", "Capacitación Empresarial"],
      Reparaciones: ["Electricista", "Plomero", "Carpintero", "Reparación de Electrodomésticos"],
      Salud: ["Terapias", "Consultas Médicas", "Fisioterapia", "Nutrición"],
      Domésticos: ["Limpieza", "Niñeras", "Cuidado de Adultos Mayores"],
      Técnicos: ["Reparación de Computadoras", "Reparación de Celulares", "Instalación de Software"],
      Eventos: ["Catering", "Organización de Eventos", "Alquiler de Equipos", "Decoración"],
      Otros: ["Asesorías", "Trámites", "Mensajería"]
    },
    Productos: {
      Tecnología: ["Computadoras", "Móviles", "Accesorios", "Componentes"],
      "Ropa y Accesorios": ["Ropa de Hombre", "Ropa de Mujer", "Ropa de Niños", "Accesorios"],
      Hogar: ["Muebles", "Electrodomésticos", "Decoración", "Herramientas"],
      Deportes: ["Equipamiento Deportivo", "Ropa Deportiva", "Suplementos", "Bicicletas"],
      Libros: ["Ficción", "No Ficción", "Textos Escolares", "E-Books"],
      "Juegos y Juguetes": ["Videojuegos", "Juguetes", "Juegos de Mesa", "Consolas"],
      Otros: ["Arte", "Música", "Coleccionables"]
    },
    Otros: {
      Eventos: ["Conciertos", "Exposiciones", "Conferencias", "Festivales"],
      Mascotas: ["Perros", "Gatos", "Aves", "Otros Animales"],
      "Objetos Perdidos": ["Documentos", "Electrónicos", "Joyas", "Ropa"],
      Otros: ["Servicios Varios", "Productos Varios", "Oportunidades de Negocio"]
    },
    Negocios: {
        "Tiendas de Ropa": [
          "Ropa de Mujer",
          "Ropa de Hombre",
          "Ropa de Niños",
          "Accesorios"
        ],
        "Restaurantes y Cafeterías": [
          "Restaurantes",
          "Cafeterías",
          "Comida Rápida",
          "Bares"
        ],
        "Tecnología y Electrónica": [
          "Tiendas de Electrónica",
          "Reparación de Electrónicos",
          "Venta de Software",
          "Consultoría Tecnológica"
        ],
        "Salud y Belleza": [
          "Salones de Belleza",
          "Gimnasios",
          "Clínicas",
          "Spas"
        ],
        "Supermercados y Mercados": [
          "Supermercados",
          "Minimarkets",
          "Mercados",
          "Tiendas de Conveniencia"
        ],
        "Servicios Profesionales": [
          "Consultorías",
          "Asesorías Legales",
          "Contabilidad",
          "Recursos Humanos"
        ],
        "Automotriz": [
          "Venta de Autos",
          "Talleres de Reparación",
          "Venta de Repuestos",
          "Lavado de Autos"
        ],
        "Hogar y Jardín": [
          "Mueblerías",
          "Tiendas de Decoración",
          "Viveros",
          "Reparaciones del Hogar"
        ],
        "Entretenimiento": [
          "Cines",
          "Teatros",
          "Centros de Diversión",
          "Clubes Nocturnos"
        ],
        "Educación y Capacitación": [
          "Institutos",
          "Academias",
          "Centros de Idiomas",
          "Capacitación Empresarial"
        ],
        "Moda y Accesorios": [
          "Joyerías",
          "Tiendas de Relojes",
          "Tiendas de Bolsos",
          "Boutiques"
        ],
        "Comercio al por Mayor": [
          "Distribuidores",
          "Importadores",
          "Exportadores",
          "Mayoristas"
        ],
        "Otros Negocios": [
          "Negocios Variados",
          "Oportunidades de Franquicia",
          "Negocios en Venta"
        ]
      }
  };
  