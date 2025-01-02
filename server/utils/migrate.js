const mongoose = require("mongoose");
const Ad = require("../models/adModel"); // El modelo de la colección principal
const Job = require("../models/jobModel"); // El modelo de trabajos
const RealEstate = require("../models/realEstateModel"); // El modelo de inmuebles
const Vehicle = require("../models/vehicleModel"); // El modelo de vehículos
const Negocios = require("./models/negociosModel"); // El modelo de negocios
const Services = require("./models/serviciosModel"); // El modelo de servicios

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

console.log(`MONGODB_URI: ${process.env.MONGODB_URI}`);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function migrateAds() {
  try {
    const ads = await Ad.find();
    console.log(`Total de adisos a migrar: ${ads.length}`);

    let migratedCount = 0;

    for (let ad of ads) {
      // Verifica si el adiso tiene el campo 'adType'
      if (!ad.adType) {
        console.log(`Anuncio omitido por falta de 'adType': ${ad._id}`);
        continue;
      }

      try {
        // Migrar adiso según el tipo
        switch (ad.adType) {
          case "Empleos":
            await Job.create(ad.toObject());
            break;
          case "Inmuebles":
            await RealEstate.create(ad.toObject());
            break;
          case "Vehicles":
            await Vehicle.create(ad.toObject());
            break;
          case "Negocios":
            await Negocios.create(ad.toObject());
            break;
          case "Servicios":
            await Servicios.create(ad.toObject());
            break;
          default:
            console.log(`Tipo de adiso no reconocido: ${ad.adType}`);
        }

        migratedCount++;
        if (migratedCount % 100 === 0) {
          console.log(
            `Progreso: ${migratedCount}/${ads.length} adisos migrados`
          );
        }
      } catch (migrationError) {
        // Registrar el error y continuar con el siguiente adiso
        console.error(
          `Error migrando el adiso ${ad._id}:`,
          migrationError.message
        );
      }
    }

    console.log("Migración completada");
  } catch (error) {
    console.error("Error durante la migración:", error);
  } finally {
    mongoose.connection.close();
  }
}

migrateAds();
