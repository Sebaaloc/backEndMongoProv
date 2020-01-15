const mongoose = require('../dbconnection/dbConnectionMongo');
const provider = require('../models/provider');
const uuidv4 = require('uuid/v4');

// Queries Mongo to find a single health provider or all of them if there no user inputs
exports.queryProvidersOfServicesInfoFromCollection = params => {
    let query = {};

    // Creates the query conditions if there are any user inputs
    (params.name) ? (query.firstName = params.name) : '';
    (params.mname) ? (query.middleName = params.mname) : '';
    (params.mail) ? (query.email  = params.mail) : '';

    return provider.find(query).select('-_id -__v')
    .then(result => result)
    .catch(error => error);
}

// Inserts a health provider in Mongo
exports.insertProviderOfServicesInfoOnCollection = params => {

    // Checks if all data was input by the user
    const isPostDataOk = existsAllDataForProvider(params);
    if(!isPostDataOk){
        return {
            error: 'Missing input parameters.'
        };
    }
    const providerToSave = new provider({
        firstName: params.firstName,
        lastName: params.lastName,
        middleName: params.middleName,
        email: params.email,
        specialty: {
            _id: uuidv4(),
            name: params.specialty.name,
            createdBy: params.specialty.createdBy,
            createdAt: params.specialty.createdAt,
            updatedBy: params.specialty.updatedBy,
            updatedAt: params.specialty.updatedAt
        },
        projectedStartDate: params.projectedStartDate,
        employerId: params.employerId,
        providerType: params.providerType,
        staffStatus: params.staffStatus,
        assignedTo: params.assignedTo,
        status: params.status,
        createdBy: params.createdBy,
        createdAt: params.createdAt,
        updatedBy: params.updatedBy,
        updatedAt: params.updatedAt
    });
    return providerToSave.save()
    .then(true)
    .catch(false);
}

const existsAllDataForProvider = params => {
    if(!params.hasOwnProperty('firstName') || !params.hasOwnProperty('lastName') || !params.hasOwnProperty('middleName') || !params.hasOwnProperty('email') 
    || !params.hasOwnProperty('projectedStartDate') || !params.hasOwnProperty('employerId') || !params.hasOwnProperty('providerType') || !params.hasOwnProperty('staffStatus')
    || !params.hasOwnProperty('assignedTo') || !params.hasOwnProperty('status') || !params.hasOwnProperty('createdBy') || !params.hasOwnProperty('createdAt')
    || !params.hasOwnProperty('updatedBy') || !params.hasOwnProperty('updatedAt')){
        return false;
    }
    return true;
}

// Updates the data of a health provider
exports.updateProviderOfServices = async params => {
    
    if(!params.email)
    {
        return false;
    }
   
    let query = {};

    (params.specialty) ? (query.specialty = params.specialty) : '';
    (params.firstName) ? (query.firstName = params.firstName) : '';
    (params.middleName) ? (query.middleName = params.middleName) : '';
    (params.lastName) ? (query.lastName  = params.lastName) : '';
    (params.email) ? (query.email = params.email) : '';
    (params.projectedStartDate) ? (query.projectedStartDate = params.projectedStartDate) : '';
    (params.employerId) ? (query.employerId = params.employerId) : '';
    (params.providerType) ? (query.providerType = params.providerType) : '';
    (params.assignedTo) ? (query.assignedTo = params.assignedTo) : '';
    (params.staffStatus) ? (query.staffStatus = params.staffStatus) : '';
    (params.status) ? (query.status = params.status) : '';
    (params.createdBy) ? (query.createdBy = params.createdBy) : '';
    (params.createdAt) ? (query.createdAt = params.createdAt) : '';
    (params.updatedBy) ? (query.updatedBy = params.updatedBy) : '';
    (params.updatedAt) ? (query.updatedAt = params.updatedAt) : '';

    return provider.findOneAndUpdate({ email: params.email }, query)
    .then(result => {
        if(result === null){
            return {
                error: 'Provider not found.'
            };
        }
        return true;
    })
    .catch(false);
}

// Deletes the data of a health provider
exports.deleteOfServicesProvider = async mail => {
    return await provider.find({ email: mail } ).remove()
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
