// Controllers for FormRequest
const FormRequest = require('../models/FormRequest');

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
    createData: async (req, res) => {
        try {
            let form = FormRequest.create(
                req.body,
            )
            if(form){
                res.status(200).json({
                    message: 'success',
                    form
                })
            } else {
                console.log('error')
                res.status(400).json({
                    message: 'failed'
                })
            }

        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "internal server error",
                error
            })
        }
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
    allReqData: (req, res) => {
        const {id} = req.params;
        FormRequest.find()
        .populate({ 
            path:'idUser',
            match: {
                _id: id
            }
        })
        .then(result => {
            const filterReq = result.filter((item) => {
                return item.idUser !== null;
            });
            console.log(filterReq)


            res.status(200).send({
                message: 'Get all data based by id',
                filterReq: filterReq
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
        FormRequest.deleteOne({
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