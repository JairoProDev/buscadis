const mongoose = require('mongoose');

// Reemplaza esta URL con tu propia cadena de conexión
const uri = 'mongodb+srv://JairoProDev:isOgCEALmpQsfA86@cluster0.cykdeq5.mongodb.net/testDB';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function () {
  console.log("Conectado a MongoDB");

  try {
    // Actualizar la colección de empleos
    await updateAdTypeForCollection('jobs', 'Empleos');

    // Actualizar la colección de bienes raíces
    await updateAdTypeForCollection('realestate', 'Inmuebles');

    // Actualizar la colección de vehículos
    await updateAdTypeForCollection('vehicles', 'Vehicles');

    // Agrega más llamadas si tienes más colecciones

    console.log("Actualización completada");
  } catch (error) {
    console.error("Error al actualizar los documentos:", error);
  } finally {
    mongoose.connection.close();
  }
});

async function updateAdTypeForCollection(collectionName, adTypeValue) {
  const collection = db.collection(collectionName);
  const result = await collection.updateMany(
    { adType: { $exists: false } }, // Solo actualizar documentos que no tienen el campo adType
    { $set: { adType: adTypeValue } }
  );
  console.log(`Documentos actualizados en ${collectionName}:`, result.modifiedCount);
}
