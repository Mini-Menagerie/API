// Controllers for Users
const Users = require('../models/Users');

module.exports = {
    getAllData: (req, res) => {
        Users.find()
        .then(result => {
            res.status(200).send({
                message: 'Get all data users',
                result
            })
        })
        .catch(error => {
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        })
    },
    createData: (req, res) => {
        Users.create(
            req.body,
        (error, result) => {
            if(error){
                res.send({
                    message: "error",
                    error
                })
            }
            else {
                res.send({
                    message: "success add user", 
                    result
                })
            }
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        Users.findOne({
            '_id': id
        })
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data users',
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
    updateData: (req,res) => {
        const {id} = req.params;
        Users.findOneAndUpdate(
            { _id : id}, 
                req.body
            , (error, result) => {
                if(error){
                    res.status(400).send({
                        message: "error"
                    })
                }
                else {
                    res.status(200).send({
                        message: "success",
                    })
                }
            }
        )
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        Users.deleteOne(
            {
                _id : id
            },
            (error, result) => {
                if(error){
                    res.status(400).send({
                        message: "error"
                    })
                }
                else {
                    res.status(200).send({
                        message: "success"
                    })
                }
            }
        )
    }
}