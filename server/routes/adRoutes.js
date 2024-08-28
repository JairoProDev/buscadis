const express = require("express");
const router = express.Router();

// Importamos los controladores específicos para cada tipo de anuncio
const jobController = require("../controllers/jobController");
const realEstateController = require("../controllers/realEstateController");
const vehicleController = require("../controllers/vehicleController");
const serviceController = require("../controllers/serviceController");
const productController = require("../controllers/productController");
const businessController = require("../controllers/businessController");
const otherController = require("../controllers/otherController");

// Rutas para los anuncios de empleo
router.post("/jobs", jobController.createJob);
router.get("/jobs", jobController.getJobs);
router.get("/jobs/:id", jobController.getJobById);
router.put("/jobs/:id", jobController.updateJob);
router.delete("/jobs/:id", jobController.deleteJob);

// Rutas para los anuncios de bienes raíces
router.post("/realestate", realEstateController.createRealEstate);
router.get("/realestate", realEstateController.getRealEstates);
router.get("/realestate/:id", realEstateController.getRealEstateById);
router.put("/realestate/:id", realEstateController.updateRealEstate);
router.delete("/realestate/:id", realEstateController.deleteRealEstate);

// Rutas para los anuncios de vehículos
router.post("/vehicles", vehicleController.createVehicle);
router.get("/vehicles", vehicleController.getVehicles);
router.get("/vehicles/:id", vehicleController.getVehicleById);
router.put("/vehicles/:id", vehicleController.updateVehicle);
router.delete("/vehicles/:id", vehicleController.deleteVehicle);

// Rutas para los anuncios de servicios
router.post("/services", serviceController.createService);
router.get("/services", serviceController.getServices);
router.get("/services/:id", serviceController.getServiceById);
router.put("/services/:id", serviceController.updateService);
router.delete("/services/:id", serviceController.deleteService);

// Rutas para los anuncios de productos
router.post("/products", productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// Rutas para los anuncios de negocios
router.post("/businesses", businessController.createBusiness);
router.get("/businesses", businessController.getBusinesses);
router.get("/businesses/:id", businessController.getBusinessById);
router.put("/businesses/:id", businessController.updateBusiness);
router.delete("/businesses/:id", businessController.deleteBusiness);

// Rutas para los anuncios de otros
router.post("/others", otherController.createOther);
router.get("/others", otherController.getOthers);
router.get("/others/:id", otherController.getOtherById);
router.put("/others/:id", otherController.updateOther);
router.delete("/others/:id", otherController.deleteOther);

module.exports = router;
