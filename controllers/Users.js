// Controllers for Users
const Users = require('../models/Users');

module.exports = {
    detailData: (req, res) => {
        const {id} = req.params;
        Users.findOne({
            '_id': id
        })
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data users',
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
<<<<<<< HEAD
        console.log(req.body)
        console.log(id)
=======
        for (let key in req.body) {
            if (req.body[key] === "") {
                delete req.body[key];
            }
       }
>>>>>>> 5565e29f7cdb2e68fbbb08ada69dcd82475b4f39
        Users.findOneAndUpdate(
            
            { '_id' : id}, 
                {...req.body}
        )
        .then(result => {
            res.status(200).send({
                message: 'success',
                result
            })
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({
                message: 'error',
                error
            })
        })
    }
}