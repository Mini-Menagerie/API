// Route API Breed
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/ListAdoptionTransaction')

route.get('/listAdoptionTransaction', getAllData)
route.post('/listAdoptionTransaction/create', verifyToken, createData)
route.get('/listAdoptionTransaction/:id', detailData)
route.put('/listAdoptionTransaction/:id', verifyToken, updateData)
route.delete('/listAdoptionTransaction/:id', verifyToken, deleteData)

module.exports = route