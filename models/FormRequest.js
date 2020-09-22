// Model for FormRequest
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const formRequestSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    reason: {
        type: String
    },
    status: {
        type: String,
        default: 'PENDING'
    }
}, {timestamps: true})

const FormRequest = mongoose.model('formRequest', formRequestSchema);

module.exports = FormRequest;