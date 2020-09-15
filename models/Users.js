// Model for Users
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    fullName: {
        type: String,
    },
    noHandhpone: {
        type: String
    },
    country: {
        type: String
    },
    province: {
        type: String
    },
    state: {
        type: String
    },
    detailAddress: {
        type: String
    },
    work: {
        type: String
    },
    workDuration: {
        type: String
    },
    houseStatus: {
        type: Boolean
    },
    otherPet: {
        type: Boolean
    },
    hasGivenPet: {
        type: Boolean
    },
    hasChildrenAtHouse: {
        type: Boolean
    },
    willPetBeCaged: {
        type: Boolean
    },
    salary: {
        type: Number
    }
}, {timestamps: true})

const Users = mongoose.model('users', userSchema);

module.exports = Users;