// Route API PetUpForAdoption
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/PetUpForAdoption')

route.get('/petUpForAdoption', getAllData)
route.post('/petUpForAdoption/create', verifyToken, createData)
route.get('/petUpForAdoption/:id', detailData)
route.put('/petUpForAdoption/:id', verifyToken, updateData)
route.delete('/petUpForAdoption/:id', verifyToken, deleteData)

module.exports = route