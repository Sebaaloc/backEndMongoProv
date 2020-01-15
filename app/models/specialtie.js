const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const specialtieSchema = Schema({
    name: String,
    createdBy: Number,
    createdAt: String,
    updatedBy: Number,
    updatedAt: String
});

module.exports = mongoose.model('specialtie', specialtieSchema);