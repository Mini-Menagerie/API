// Controllers for Breed
const Breed = require('../models/Breed');

module.exports = {
    getAllData: (req, res) => {
        Breed.find()
        .populate({ path:'idCategoryPet'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data Breed',
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
        Breed.create(
            req.body,
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
        Breed.findOne({
            '_id': id
        })
        .populate({ path:'idCategoryPet'})
        .then(result => {
            if(result == null ) {
                res.status(200).send({
                    message: 'Data not found',
                    result
                })
            }else {
                res.status(200).send({
                    message: 'Get all detail data CategoryPet',
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
    updateData: (req,res) => {
        const {id} = req.params;
        Breed.findOneAndUpdate({ 
            '_id' : id
        },req.body)
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
    deleteData : (req, res) => {
        const {id} = req.params;
        Breed.deleteOne({
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