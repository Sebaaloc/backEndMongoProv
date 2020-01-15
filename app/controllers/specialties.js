const error = require('../errors/errors');
const constants = require('../constants');
const specialtyService = require('../services/specialties');
const logger = require('../logger/logger');

/* 
Contains the controllers for all CRUD operations of collection specialties
The controller will only validate responses from the services being these the ones which perform the CRUD operations
Calls the service which queries data of specialty of providers with or without params the last option returning all info within colection 
*/
exports.querySpecialtyOfProvider = async (req, res, next) => {
    try {
        const specialtyOfProvider = await specialtyService.querySpecialtyOfProviderByParams(req.query);
        if(specialtyOfProvider.length === 0){
            throw error(constants.NOT_FOUND, 'Err: Specialty of provider not found.');
        }
        logger.info(`One or more specialties of providers were queried successfully.`);
        res.send(specialtyOfProvider);
    } catch(err) {
        next(err);
    }
};

// Calls the service which inserts data of specialty of providers into the providers collection
exports.insertSpecialtyOfProvider = async (req, res, next) => {
    try {
        const specialtyOfProviderInsert = await specialtyService.insertSpecialtyOfProviderOnCollection(req.body);
        if(specialtyOfProviderInsert === false){
            throw error(constants.BAD_REQUEST, 'Err: Specialty not created in MongoDB.');
        }
        if(specialtyOfProviderInsert.hasOwnProperty('error')){
            throw error(constants.BAD_REQUEST, `Err: ${specialtyOfProviderInsert.error}`);
        }
        logger.info(`Specialty created: ${req.body.name}`);
        res.send({ message: 'Specialty created.'});         
    } catch(err) {
        next(err);
    }
}

/*
Calls the service which updates the data of a specialty of a providers within the collection being able to update 
name, email, middleName, along with every other field either one, several fields or all at once
*/
exports.updateSpecialtyOfProvider = async (req, res, next) => {
    try {
        const specialtyUpdate = await specialtyService.updateSpecialty(req.body);
        if(specialtyUpdate === false){
            throw error(constants.BAD_REQUEST, 'Err: Specialty not updated in MongoDB check that name exists within data.');
        }
        if(specialtyUpdate.hasOwnProperty('error')){
            throw error(constants.NOT_FOUND, `Err: ${specialtyUpdate.error}`);
        }
        logger.info(`Specialty updated: ${req.body.name}`);
        res.send({ message: 'Specialty updated.'});        
    } catch(err) {
        next(err)
    }
}

// Calls the service which deletes the info of a specialty of a provider based on the mail of it
exports.deleteSpecialtyOfProvider = async (req, res, next) => {
    try {
        const specialtyDeleted = await specialtyService.deleteSpecialty(req.params.name);
        if(specialtyDeleted.hasOwnProperty('err')){
            throw error(constants.NOT_FOUND, 'Err: Specialty not found within database for deletion.');
        }
        if(specialtyDeleted === false){
            throw error(constants.BAD_REQUEST, 'Err: Specialty not deleted in MongoDB.');
        }
        logger.info(`Specialty deleted: ${req.params.name}`);
        res.send({ message: 'Specialty deleted.'});        
    } catch(err) {
        next(err)
    }
}