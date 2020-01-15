const error = require('../errors/errors');
const constants = require('../constants');
const providersService = require('../services/providers');
const logger = require('../logger/logger');

/* 
Contains the controllers for all CRUD operations of collection providers
The controller will only validate responses from the services being these the ones which perform the CRUD operations
Calls the service which queries data of health providers with or without params the last option returning all info within colection 
*/
exports.queryProviderOfServicesInfoByParams = async (req, res, next) => {
    try {
        const providerOfServicesInfo = await providersService.queryProvidersOfServicesInfoFromCollection(req.query);
        if(providerOfServicesInfo.length === 0){
            throw error(constants.NOT_FOUND, 'Err: Provider not found.');
        }
        logger.info(`One or more providers were queried successfully.`);
        res.send(providerOfServicesInfo);
    } catch(err) {
        next(err);
    }
};

// Calls the service which inserts data of health providers into the providers collection
exports.insertProviderOfServicesInfoOnCollection = async (req, res, next) => {
    try {
        const providerOfServicesUpdate = await providersService.insertProviderOfServicesInfoOnCollection(req.body);
        if(providerOfServicesUpdate === false){
            throw error(constants.BAD_REQUEST, 'Err: Provider not created in MongoDB.');
        }
        if(providerOfServicesUpdate.hasOwnProperty('error')){
            throw error(constants.BAD_REQUEST, `Err: ${providerOfServicesUpdate.error}`);
        }
        logger.info(`Provider created: ${req.body.email}`);
        res.send({ message: 'Provider created.'});         
    } catch(err) {
        next(err);
    }
}

/*
Calls the service which updates the data of a health provider within the collection being able to update 
name, email, middleName, along with every other field either one, several fields or all at once
*/
exports.updateProviderOfServicesInfoOnCollection = async (req, res, next) => {
    try {
        const providerOfServicesUpdate = await providersService.updateProviderOfServices(req.body);
        if(providerOfServicesUpdate === false){
            throw error(constants.BAD_REQUEST, 'Err: Provider not updated in MongoDB check that email exists within data.');
        }
        if(providerOfServicesUpdate.hasOwnProperty('error')){
            throw error(constants.NOT_FOUND, `Err: ${providerOfServicesUpdate.error}`);
        }
        logger.info(`Provider updated: ${req.body.email}`);
        res.send({ message: 'Provider updated.'});        
    } catch(err) {
        next(err)
    }
}

// Calls the service which deletes the info of a health provider based on the mail of it
exports.deleteProviderOfServicesByEmail = async (req, res, next) => {
    try {
        const providerDeletedOfServices = await providersService.deleteOfServicesProvider(req.params.mail);
        if(providerDeletedOfServices.hasOwnProperty('err')){
            throw error(constants.NOT_FOUND, 'Err: Provider not found within database for deletion.');
        }
        if(providerDeletedOfServices === false){
            throw error(constants.BAD_REQUEST, 'Err: Provider not deleted in MongoDB.');
        }
        logger.info(`Provider deleted: ${req.params.mail}`);
        res.send({ message: 'Provider deleted.'});        
    } catch(err) {
        next(err)
    }
}
