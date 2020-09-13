// Model for UserAccount
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userAccountSchema = new Schema({
    idUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
}, {timestamps: true})

const UserAccount = mongoose.model('userAccount', userAccountSchema);

module.exports = UserAccount;