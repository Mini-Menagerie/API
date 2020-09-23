// Model for Users
const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema

const userSchema = new Schema({
    avatar: {
        type: String,
        default: 'https://www.popularitas.com/wp-content/uploads/2018/04/user-hero-blue.png'
    },
    fullName: {
        type: String
    },
    noHandphone: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    province: {
        type: String,
        default: ''
    },
    state: {
        type: String,
        default: ''
    },
    zip_code: {
        type: String,
        default: ''
    },
    detailAddress: {
        type: String,
        default: ''
    },
    work: {
        type: String,
        default: ''
    },
    workDuration: {
        type: String,
        default: ''
    },
    houseStatus: {
        type: String,
        default: ''
    },
    otherPet: {
        type: String,
        default: ''
    },
    hasGivenPet: {
        type: String,
        default: ''
    },
    hasChildrenAtHouse: {
        type: String,
        default: ''
    },
    willPetBeCaged: {
        type: String,
        default: ''
    },
    salary: {
        type: String,
        default: ''
    }
}, {timestamps: true})

userSchema.plugin(findOrCreate);

const Users = mongoose.model('users', userSchema);

module.exports = Users;