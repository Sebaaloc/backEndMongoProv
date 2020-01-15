const mongoose = require('../dbconnection/dbConnectionMongo');
const specialty = require('../models/specialtie');
const uuidv4 = require('uuid/v4');

// Queries Mongo to find a single specialty of a provider or all of them if there no user inputs
exports.querySpecialtyOfProviderByParams = params => {
    query = {};

    // Creates the query conditions if there are any user inputs
    (params.name) ? (query.name = params.name) : '';
    (params.createdBy) ? (query.createdBy = parseInt(params.createdBy)) : '';
    (params.updatedBy) ? (query.updatedBy  = parseInt(params.updatedBy)) : '';

    const specialtiesInfo = specialty.find(query).select('-_id -__v');;  
    return specialtiesInfo.then(result => result)
    .catch(error => error);
}

// Inserts a specialty of a provider in Mongo
exports.insertSpecialtyOfProviderOnCollection = params => {
    let userInputAllSpecialtyInfo = true;

    // Checks if all data was input by the user
    (params.name) ? '' : userInputAllSpecialtyInfo = false;
    (params.createdBy) ? '' : userInputAllSpecialtyInfo = false;
    (params.createdAt) ? '' : userInputAllSpecialtyInfo = false;
    (params.updatedBy) ? '' : userInputAllSpecialtyInfo = false;
    (params.updatedAt) ? '' : userInputAllSpecialtyInfo = false;

    if(!userInputAllSpecialtyInfo){
        return {
            error: 'Missing input parameters.'
        };
    }

    const specialtyToSave = new specialty({
        name: params.name,
        createdBy: params.createdBy,
        createdAt: params.createdBy,
        updatedBy: params.updatedBy,
        updatedAt: params.updatedAt
    });
    return specialtyToSave.save()
    .then(true)
    .catch(false);
}

// Updates the data of a specialty of a provider
exports.updateSpecialty = async params => {
    
    if(!params.name)
    {
        return false;
    }
   
    let update = {};

    // Creates the update object to change data within a specialty of a provider
    (params.name) ? (query.name = params.name) : '';
    (params.createdBy) ? (update.createdBy = params.createdBy) : '';
    (params.createdAt) ? (update.createdAt = params.createdAt) : '';
    (params.updatedBy) ? (update.updatedBy = params.updatedBy) : '';
    (params.updatedAt) ? (update.updatedAt = params.updatedAt) : '';
    

    return specialty.findOneAndUpdate({ name: params.name }, update)
    .then(result => {
        if(result === null){
            return {
                error: 'Specialty not found.'
            };
        }
        return true;
    })
    .catch(false);
}

// Deletes the data of a specialty of a provider
exports.deleteSpecialty = async name => {
    return await specialty.find({ name: name } ).remove()
    .then(didItDelete => {
        if(didItDelete.deletedCount === 0){
            return {
                err: 'Not found'
            };
        };
        return true;  
    })
    .catch(false);
}