// Controllers for TransactionDetails
const TransactionDetails = require('../models/TransactionDetails');

module.exports = {
    getAllData: (req, res) => {
        TransactionDetails.find()
        .populate('idTransaction')
        .populate('idProduct')
        .then(result => {
            res.status(200).send({
                message: 'Get all data TransactionDetails',
                result
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).send({
                message: 'Internal server error',
                error
            })
        })
    },
    createData: (req, res) => {
        TransactionDetails.create(
            req.body
        )
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
    detailData: (req, res) => {
        const {id} = req.params;
        TransactionDetails.findOne({
            '_id': id
        })
        .populate('idTransaction')
        .populate('idProduct')
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data TransactionDetails',
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
        TransactionDetails.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .then(result => {
            res.status(200).send({
                message: 'Success',
            })
        })
        .catch(error => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    deleteData : (req, res) => {
        const {id} = req.params;
        TransactionDetails.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'Success',
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