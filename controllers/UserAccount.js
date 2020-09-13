// Controllers for UserAccount
const UserAccount = require('../models/UserAccount');

module.exports = {
    detailData: (req, res) => {
        const {id} = req.params;
        UserAccount.findOne({
            '_id': id
        })
        .populate({ path:'idUser'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data UserAccount',
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
        UserAccount.findOneAndUpdate({ 
            '_id' : id
        },req.body)
        .populate({ path:'idUser'})
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
        UserAccount.deleteOne({
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