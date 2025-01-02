const express = require("express");
const router = express.Router();

// Importamos los controladores específicos para cada tipo de adiso
const jobController = require("../controllers/jobController");
const realEstateController = require("../controllers/realEstateController");
const vehicleController = require("../controllers/vehicleController");
const serviceController = require("../controllers/serviceController");
const productController = require("../controllers/productController");
const businessController = require("../controllers/businessController");
const eventController = require("../controllers/eventController");
const tourismController = require("../controllers/tourismController");
const educationController = require("../controllers/educationController");
const petController = require("../controllers/petController");

// Rutas para los adisos de empleo
router.post("/jobs", jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", jobController.getJobById);
router.put("/jobs/:id", jobController.updateJob);
router.delete("/jobs/:id", jobController.deleteJob);

// Rutas para los adisos de bienes raíces
router.post("/realestate", realEstateController.createRealEstate);
router.get("/realestate", realEstateController.getRealEstate);
router.get("/realestate/:id", realEstateController.getRealEstateById);
router.put("/realestate/:id", realEstateController.updateRealEstate);
router.delete("/realestate/:id", realEstateController.deleteRealEstate);

// Rutas para los adisos de vehículos
router.post("/vehicles", vehicleController.createVehicle);
router.get("/vehicles", vehicleController.getVehicles);
router.get("/vehicles/:id", vehicleController.getVehicleById);
router.put("/vehicles/:id", vehicleController.updateVehicle);
router.delete("/vehicles/:id", vehicleController.deleteVehicle);

// Rutas para los adisos de servicios
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.get("/services/:id", serviceController.getServiceById);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// Rutas para los adisos de productos
router.post("/products", productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Rutas para los adisos de negocios
router.post("/businesses", businessController.createBusiness);
router.get("/businesses", businessController.getBusinesses);
router.get("/businesses/:id", businessController.getBusinessById);
router.put("/businesses/:id", businessController.updateBusiness);
router.delete("/businesses/:id", businessController.deleteBusiness);

// Rutas para los adisos de eventos
router.post("/events", eventController.createEvent);
router.get("/events", eventController.getEvents);
router.get("/events/:id", eventController.getEventById);
router.put("/events/:id", eventController.updateEvent);
router.delete("/events/:id", eventController.deleteEvent);

// Rutas para los adisos de turismo
router.post("/tourism", tourismController.createTourism);
router.get("/tourism", tourismController.getTourisms);
router.get("/tourism/:id", tourismController.getTourismById);
router.put("/tourism/:id", tourismController.updateTourism);
router.delete("/tourism/:id", tourismController.deleteTourism);

// Rutas para los adisos de educación
router.post("/education", educationController.createEducation);
router.get("/education", educationController.getEducations);
router.get("/education/:id", educationController.getEducationById);
router.put("/education/:id", educationController.updateEducation);
router.delete("/education/:id", educationController.deleteEducation);

// Rutas para los adisos de mascotas
router.post("/pets", petController.createPet);
router.get("/pets", petController.getPets);
router.get("/pets/:id", petController.getPetById);
router.put("/pets/:id", petController.updatePet);
router.delete("/pets/:id", petController.deletePet);

const { getPostCount } = require("../controllers/postCounterController");

// Ruta para obtener el contador de adisos
router.get("/postCount", getPostCount);

module.exports = router;
