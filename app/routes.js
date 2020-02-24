const express = require("express");
const router = express.Router();
const providersController = require('./controllers/providers');
const specialtiesController = require('./controllers/specialties');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./openApiDocumentation');

// Defining the routes for CRUD of providers and specialties with the http verbs GET, POST, PATCH, DELETE
router.get("/providers", providersController.queryProviderOfServicesInfoByParams);
router.post("/providersInsert",  providersController.insertProviderOfServicesInfoOnCollection);
router.patch("/providersUpdate",  providersController.updateProviderOfServicesInfoOnCollection);
router.delete("/providerToDelete/:mail", providersController.deleteProviderOfServicesByEmail);
router.get("/specialties", specialtiesController.querySpecialtyOfProvider);
router.post("/specialtiesInsert",  specialtiesController.insertSpecialtyOfProvider);
router.patch("/specialtiesUpdate",  specialtiesController.updateSpecialtyOfProvider);
router.delete("/specialtiesToDelete/:name", specialtiesController.deleteSpecialtyOfProvider);
router.get('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument.swaggerDocument));

module.exports = router;
