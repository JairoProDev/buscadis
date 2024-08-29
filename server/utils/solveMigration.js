const mongoose = require("mongoose");
const Ad = require("../models/adModel"); // El modelo de la colección principal
const Job = require("../models/jobModel"); // El modelo de trabajos
const RealEstate = require("../models/realEstateModel"); // El modelo de inmuebles
const Vehicle = require("../models/vehicleModel"); // El modelo de vehículos
const Negocios = require("../models/businessModel"); // El modelo de negocios
const Services = require("../models/serviceModel"); // El modelo de servicios
const Products = require("../models/productModel"); // El modelo de productos

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, "../../.env") });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateAds() {
  try {
    const ads = await Ad.find();
    console.log(`Total de anuncios a migrar: ${ads.length}`);

    let migratedCount = 0;
    let failedMigrations = [];

    for (let ad of ads) {
      // Determina el modelo de destino según el tipo de anuncio
      let targetModel;
      switch (ad.adType) {
        case "Empleos":
          targetModel = Job;
          break;
        case "Inmuebles":
          targetModel = RealEstate;
          break;
        case "Vehicles":
          targetModel = Vehicle;
          break;
        case "Negocios":
          targetModel = Negocios;
          break;
        case "Servicios":
          targetModel = Services;
          break;
        case "Productos":
          targetModel = Products;
          break;
        default:
          failedMigrations.push(ad._id);
          continue;
      }

      const existingAd = await targetModel.findById(ad._id);
      if (existingAd) {
        continue; // Omitir anuncios ya migrados
      }

      // Conversión de valores en español a inglés, si es necesario
      if (ad.size) {
        const sizeMap = {
          miniatura: "miniature",
          normal: "normal",
          largo: "long",
          grande: "large",
          gigante: "giant"
        };
        ad.size = sizeMap[ad.size] || ad.size;
      }

      try {
        await targetModel.create(ad.toObject()); // Migrar anuncio
        migratedCount++;
        if (migratedCount % 100 === 0) {
          console.log(`Progreso: ${migratedCount}/${ads.length} anuncios migrados`);
        }
      } catch (migrationError) {
        failedMigrations.push(ad._id);
      }
    }

    console.log("Migración completada");
    console.log(`Anuncios que no se migraron correctamente: ${failedMigrations.length}`);
    if (failedMigrations.length > 0) {
      console.log("IDs de anuncios que fallaron:", failedMigrations);
    }
  } catch (error) {
    console.error("Error durante la migración:", error);
  } finally {
    mongoose.connection.close();
  }
}

migrateAds();
