// Controllers for UserAccount
const UserAccount = require('../models/UserAccount');
const Users = require('../models/Users');
const bcrypt = require("bcrypt");

module.exports = {
    createData: (req, res) => {
        const {fullName, email, password} = req.body;
        Users.create({
            fullName: fullName
        })
        .then(result => {
            bcrypt.hash(password, 10, (error, hashedPassword) => {
                if(error) {
                    res.status(400).send({
                        message: 'error',
                        error
                    })
                }else {
                    UserAccount.create({
                        idUser: result.id,
                        email: email,
                        password: hashedPassword
                    })
                    .then(() => {
                        res.status(200).send({
                            message: 'success',
                        })
                    })
                    .catch(error => {
                        res.status(400).send({
                            message: 'error',
                            error
                        })
                    })
                }
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        UserAccount.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data UserAccount',
                result
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Data not found',
                error
            })
        })
    },
    updateDataEmail: (req,res) => {
        const {id} = req.params;
        const {email} = req.body;
        UserAccount.findOneAndUpdate({ 
            '_id' : id
        }, {email: email})
        .then(result => {
            res.status(200).send({
                message: 'success',
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    updateDataPassword: (req,res) => {
        const {id} = req.params;
        const {passwordLama, passwordBaru} = req.body;
        UserAccount.findOne({
            '_id': id
        })
        .then(result => {
            bcrypt.hash(passwordLama, 10, (error, hashedPassword) => {
                if(error) {
                    res.status(400).send({
                        message: 'error',
                        error
                    })
                }else {
                    if(hashedPassword == result.password) {
                        UserAccount.findOneAndUpdate({ 
                            '_id' : id
                        },{
                            password: passwordBaru
                        })
                        .then(() => {
                            res.status(200).send({
                                message: 'success',
                            })
                        })
                        .catch(error => {
                            res.status(400).send({
                                message: 'error',
                                error
                            })
                        })
                    }else {
                        res.status(400).send({
                            message: 'Password inmatch'
                        })
                    }
                }
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'Data not found',
                error
            })
        })
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        UserAccount.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'success',
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    }
}