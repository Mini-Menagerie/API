// Controllers for Users
const Users = require('../models/Users');

module.exports = {
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
                message: 'Error',
                error
            })
        })
    },
    updateData: (req,res) => {
        const {id} = req.params;
        Users.findOneAndUpdate(
            { '_id' : id}, 
                req.body
        )
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({
                message: 'error',
                error
            })
        })
    }
}