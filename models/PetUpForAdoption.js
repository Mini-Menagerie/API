// Model for PetUpForAdoption
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const petUpForAdoptionSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    idPet: {
        type: Schema.Types.ObjectId,
        ref: 'pet',
        required: true
    },
    fee: {
        type: Number
    },
    status: {
        type: String
    }
}, {timestamps: true})

const PetUpForAdoption = mongoose.model('petUpforAdoption', petUpForAdoptionSchema);

module.exports = PetUpForAdoption;