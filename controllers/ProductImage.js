// Controllers for Breed
const ProductImage = require('../models/ProductImage');

module.exports = {
    getAllData: (req, res) => {
        ProductImage.find()
        .populate('idProduct')
        .then(result => {
            res.status(200).send({
                message: 'Get all data ProductImage',
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
        const {idProduct, urlImage} = req.body;
        ProductImage.create({
            idProduct: idProduct,
            urlImage: urlImage
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
    },
    detailData: (req, res) => {
        const {id} = req.params;
        ProductImage.findOne({
            '_id': id
        })
        .populate({ path:'idProduct'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data ProductImage',
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
        ProductImage.findOneAndUpdate({ 
            '_id' : id
        },req,body)
        .then(result => {
            res.status(200).send({
                message: 'Success',
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
        ProductImage.deleteOne({
            '_id' : id
        })
        .then(result => {
            res.status(200).send({
                message: 'Success',
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