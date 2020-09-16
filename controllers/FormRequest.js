// Controllers for FormRequest
const FormRequest = require('../models/FormRequest');
const Users = require('../models/Users');

module.exports = {
    getAllData: (req, res) => {
        FormRequest.find()
        .populate({ path:'idUser'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data FormRequest',
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
        const {
            reason, 
            status, 
            idUser, 
            work, 
            workDuration, 
            houseStatus, 
            otherPet, 
            hasGivenPet, 
            hasChildrenAtHouse, 
            willPetBeCaged, 
            salary
        } = req.body;
        Users.findOneAndUpdate({ 
            '_id' : idUser
        },{
            work: work,
            workDuration: workDuration,
            houseStatus: houseStatus,
            otherPet: otherPet,
            hasGivenPet: hasGivenPet,
            hasChildrenAtHouse: hasChildrenAtHouse,
            willPetBeCaged: willPetBeCaged,
            salary: salary
        })
        .then((result) => {
            FormRequest.create({
                idUser: result.id,
                reason: reason,
                status: status
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
        })
        .catch((error) => {
            res.status(400).send({
                message: 'error',
                error
            })
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        FormRequest.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data FormRequest',
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
        FormRequest.findOneAndUpdate({ 
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
        FormRequest.deleteOne({
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