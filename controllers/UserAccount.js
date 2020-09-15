// Controllers for UserAccount
const UserAccount = require('../models/UserAccount');
const Users = require('../models/Users');
const bcrypt = require("bcrypt");
const {createToken} = require('../helpers/token');

module.exports = {
    login: async(req, res) => {
        const {email, password} = req.body;
        const user = await UserAccount.findOne({
            'email': email
        }).populate({ path:'idUser'})
        if(user) {
            const comparePass = await bcrypt.compare(password, user.password);
            if(!comparePass){
                res.status(400).json({
                    message: 'password tidak benar'
                })
            } else {
                const dataUser = {
                    id: user._id,
                    fullName: user.idUser.fullName,
                    email: user.email
                }
                // user login => kasih token
                const token = createToken(dataUser)
                res.status(200).json({
                    message: "Selamat datang",
                    token,
                    user: dataUser
                })
            }
        }else {
            res.status(400).send({
                message: 'Email not found',
            })
        }
    },
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
            if(result == null ) {
                res.status(200).send({
                    message: 'Data not found',
                    result
                })
            }else {
                res.status(200).send({
                    message: 'Get all detail data UserAccount',
                    result
                })
            }
        })
        .catch(error => {
            res.status(400).send({
                message: 'Error',
                error
            })
        })
    },
    createPassword: (req,res) => {
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
    updateDataPassword: async (req,res) => {
        const {id} = req.params;
        const {passwordLama, passwordBaru} = req.body;
        const user = await UserAccount.findOne({
            '_id': id
        })
        if(user){
            const comparePass = await bcrypt.compare(passwordLama, user.password);
            if(!comparePass){
                res.status(400).json({
                    message: 'password tidak benar'
                })
            } else {
                bcrypt.hash(passwordBaru, 10, (error, hashedPassword) => {
                    if(error) {
                        res.status(400).send({
                            message: 'error',
                            error
                        })
                    }else {
                        UserAccount.findOneAndUpdate({ 
                            '_id' : id
                        },{
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
            }
        }
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        UserAccount.findOne({
            '_id': id
        })
        .then((result) => {
            Users.deleteOne({
                '_id' : result.idUser
            })
            .then(() => {
                UserAccount.deleteOne({
                    '_id' : id
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
            })
            .catch(error => {
                res.status(400).send({
                    message: 'error',
                    error
                })
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    }
}