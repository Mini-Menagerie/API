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

userSchema.plugin(findOrCreate);

const Users = mongoose.model('users', userSchema);

module.exports = Users;