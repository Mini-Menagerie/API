// Model for Users
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema

const userSchema = new Schema({
    avatar: {
        type: String
    },
    fullName: {
        type: String
    },
    noHandphone: {
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
    zip_code: {
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
        type: String
    },
    otherPet: {
        type: String
    },
    hasGivenPet: {
        type: String
    },
    hasChildrenAtHouse: {
        type: String
    },
    willPetBeCaged: {
        type: String
    },
    salary: {
        type: String
    }
}, {timestamps: true})

userSchema.plugin(findOrCreate);

const Users = mongoose.model('users', userSchema);

module.exports = Users;