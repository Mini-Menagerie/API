// Controllers for AdminAccount
const AdminAccount = require('../models/AdminAccount');

module.exports = {
    detailData: (req, res) => {
        const {id} = req.params;
        AdminAccount.findOne({
            '_id': id
        })
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data AdminAccount',
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
        AdminAccount.findOneAndUpdate({ 
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
    }
}