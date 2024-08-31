// adTypes.js
export const adTypes = {
  Empleos: {
      Ventas: [
          "Promotor(a)",
          "Asesor(a)",
          "Vendedor(a)",
          "Preventista",
          "Televentas"
      ],
      Cocina: [
          "Cocinero(a)",
          "Ayudante",
          "Jefe(a)",
          "Lavaplatos",
          "Maestro Pollero",
          "Maestro Chifero",
          "Maestro Cevichero",
          "Pizzero"
      ],
      Atención: [
          "Recepcionista",
          "Mozo(a)",
          "Bartender",
          "Housekeeping",
          "Cajero(a)"
      ],
      Administración: [
          "Asistente",
          "Contador(a)",
          "Administrador(a)",
          "Recepcionista",
          "Recursos Humanos"
      ],
      Transporte: [
          "Chofer",
          "Operador(a)",
          "Repartidor"
      ],
      Turismo: [
          "Guía",
          "Operador(a)",
          "Hospitalidad"
      ],
      Mantenimiento: [
          "General",
          "Especializado"
      ],
      Creativo: [
          "Diseñador(a)",
          "Artista Visual",
          "Audiovisual"
      ],
      Educación: [
          "Instructor(a)",
          "Profesor(a)",
          "Tutor(a)"
      ],
      Producción: [
          "Encargado(a)",
          "Operario(a)"
      ],
      Servicios: [
          "Hogar",
          "Cuidado",
          "Limpieza",
          "Jardinería"
      ],
      Salud: [
          "Dentista",
          "Enfermera(o)",
          "Asistente",
          "Farmacéutico(a)",
          "Psicólogo(a)",
          "Nutricionista",
          "Fisioterapeuta"
      ],
      Logística: [
          "Almacén",
          "Distribución"
      ],
      Oficina: [
          "Secretaria(o)",
          "Administrativo(a)"
      ],
      Industrial: [
          "Mecánico(a)",
          "Electricidad"
      ],
      Tecnología: [
          "Desarrollador(a)",
          "Soporte",
          "Redes",
          "Webmaster"
      ],
      Legal: [
          "Asesor(a)",
          "Administrativo(a)"
      ],
      Finanzas: [
          "Banca",
          "Contador(a)",
          "Inversiones",
          "Auditor(a)"
      ],
      Oficial : [
          "Seguridad",
          "Bombero(a)",
          "Policía"
      ],
      Belleza: [
          "Cosmetóloga",
          "Peluquera",
          "Barbero(a)",
          "Manicurista"
      ],
      Construcción: [
          "Albañil",
          "Ingeniero Civil",
          "Arquitecto",
          "Maestro de Obra"
      ],
      Varios: ["Reparaciones, Consultoría, Entretenimiento, Agricultura, Ganadería, Artesanía, Reciclaje, Eventos"]
  },

    Inmuebles: {
      Habitaciones: ["Alquiler", "Compartidas", "Amobladas", "Estudiantes"],
      Apartamentos: ["Alquiler", "Venta", "Amoblados", "Nuevos"],
      Casas: ["Alquiler", "Venta", "Nuevas", "Amobladas"],
      Terrenos: ["Venta", "Alquiler", "Agrícolas", "Urbanos"],
      Oficinas: ["Alquiler", "Venta", "Coworking", "Amobladas"],
      Locales: ["Alquiler", "Venta", "Traspaso", "Comerciales", "Industriales"],
      Hoteles: ["Venta", "Alquiler", "Boutique", "Resorts"],
      Anticresis: ["Habitaciones", "Apartamentos", "Casas", "Terrenos", "Locales"],
      Otros: ["Garajes", "Depósitos", "Quintas", "Fincas"]
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
      Salud: ["Terapias", "Consultas Médicas", "Fisioterapia", "Nutrición", "Veterinarios"],
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
        "Educación": [
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
  