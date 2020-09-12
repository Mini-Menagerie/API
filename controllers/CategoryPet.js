// Controllers for CategoryPet
const CategoryPet = require('../models/CategoryPet');

module.exports = {
    getAllData: (req, res) => {
        CategoryPet.find()
        .then(result => {
            res.status(200).send({
                message: 'Get all data categoryPet',
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
        CategoryPet.create(
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
                    message: "success add categoryPet", 
                    result
                })
            }
        })
    },
    detailData: (req, res) => {
        const {id} = req.params;
        CategoryPet.findOne({
            '_id': id
        })
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data categoryPet',
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
        CategoryPet.findOneAndUpdate(
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
        CategoryPet.deleteOne(
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