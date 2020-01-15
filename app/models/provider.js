const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const providerSchema = Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    email: String,
    specialty: {
        _id: String,
        name: String,
        createdBy: Number,
        createdAt: String,
        updatedBy: Number,
        updatedAt: String
    },
    projectedStartDate: String,
    employerId: String,
    providerType: String,
    staffStatus: String,
    assignedTo: Number,
    status: String,
    createdBy: Number,
    createdAt: String,
    updatedBy: Number,
    updatedAt: String
});

module.exports = mongoose.model('provider', providerSchema);