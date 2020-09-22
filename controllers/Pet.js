// Controllers for Pet
const Pet = require('../models/Pet');

module.exports = {
    createData: (req, res) => {
        Pet.create(
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
    getAllData: (req, res) => {
        Pet.find()
        .populate({ path:'idCategoryPet'})
        .populate({ path:'idBreed'})
        .populate({ path:'idUser'})
        .then(result => {
            res.status(200).send({
                message: 'Get all data Pet',
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
    detailData: (req, res) => {
        const {id} = req.params;
        Pet.findOne({
            '_id': id
        })
        .populate({ path:'idCategoryPet'})
        .populate({ path:'idBreed'})
        .then(result => {
            res.status(200).send({
                message: 'Get all detail data Pet',
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
        Pet.findOneAndUpdate({ 
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
    findByGender : async (req, res) => {
        try {
            const result = await Pet.find({
                gender: {
                    $regex: req.query.gender,
                }
            }).populate('idCategoryPet')
            if(result){
                res.status(200).json({
                    data: result
                })
            } else {
                res.status(400).json({
                    data: 'not found'
                })
            }
        }
        catch(error){
            console.log(error);
        }
    },
    findByLocation : async (req, res) => {
        try {
            const result = await Pet.find({
                location: {
                    $regex: req.query.location,
                    $options: 'i',
                }
            }).populate('idCategoryPet')
            if(result){
                res.status(200).json({
                    data: result
                })
            } else {
                res.status(400).json({
                    data: 'not found'
                })
            }
        }
        catch(error){
            console.log(error);
        }
    },
    findDetailPet : async(req, res) => {
        try {
            let result = await Pet.find({})
            .populate('idCategoryPet')
            .populate('idBreed')

            let detailPet = await result.map(item => {
                var pet = {
                    id: item._id,
                    category: item.idCategoryPet.categoryName,
                    breed: item.idBreed.breedName,
                    petName : item.petName,
                    gender: item.gender,
                    age:item.age,
                    weight: item.weight,
                    size: item.size,
                    location: item.location,
                    about: item.about,
                    image: item.image
                }
                return pet
            })
            res.status(200).json({
                detailPet
            })
        }
        catch(error){
            console.log(error);
        }
    }
}