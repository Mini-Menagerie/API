// Route API Pet
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    findByGender,
    findByLocation,
    findDetailPet
} = require('../controllers/Pet')

route.get('/pet', getAllData)
route.post('/pet/create', verifyToken, createData)
route.get('/pet/:id', detailData)
route.put('/pet/:id', verifyToken, updateData)
route.get('/petgender/', findByGender)
route.get('/petlocation/', findByLocation)
route.get('/petdetail/', findDetailPet)


module.exports = route