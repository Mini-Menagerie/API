// Controllers for PetUpForAdoption
const PetUpForAdoption = require('../models/PetUpForAdoption');
const Pet = require('../models/Pet');
const PetImage = require('../models/PetImage');

module.exports = {
    getAllData: (req, res) => {
        PetUpForAdoption.find()
        .populate({ path:'idUser'})
        .populate({ path:'idPet'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data PetUpForAdoption',
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
        PetUpForAdoption.create(
            req.body
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
        PetUpForAdoption.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .populate({ path:'idPet'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data PetUpForAdoption',
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
        PetUpForAdoption.findOneAndUpdate({ 
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
        PetUpForAdoption.findOne({
            _id: id
        })
        .then((result) => {
            Pet.findOne({
                _id: result.idPet
            })
            .then((result) => {
                PetImage.deleteOne({
                    idPet: result._id 
                })
                .then(() => {
                    Pet.deleteOne({
                        _id: result._id 
                    })
                    .then(() => {
                        PetUpForAdoption.deleteOne({
                            '_id' : id
                        })
                        .then(result => {
                            res.status(200).send({
                                message: 'success',
                                result
                            })
                        })
                    })
                })
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