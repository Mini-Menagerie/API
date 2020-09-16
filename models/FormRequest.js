// Model for FormRequest
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const formRequestSchema = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const FormRequest = mongoose.model('formRequest', formRequestSchema);

module.exports = FormRequest;