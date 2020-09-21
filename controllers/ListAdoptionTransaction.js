// Controllers for ListAdoptionTransaction
const ListAdoptionTransaction = require('../models/ListAdoptionTransaction');

module.exports = {
    getAllData: (req, res) => {
        ListAdoptionTransaction.find()
        .populate({ path:'idPetUpForAdoption'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data ListAdoptionTransaction',
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
        ListAdoptionTransaction.create(
            req.body,
        )
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
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
        ListAdoptionTransaction.findOne({
            '_id': id
        })
        .populate({ path:'idPetUpForAdoption'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data ListAdoptionTransaction',
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
        ListAdoptionTransaction.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
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
        ListAdoptionTransaction.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
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