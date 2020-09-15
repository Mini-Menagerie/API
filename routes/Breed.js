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
} = require('../controllers/Breed')

route.get('/breed', getAllData)
route.post('/breed/register', verifyToken, createData)
route.get('/breed/:id', detailData)
route.put('/breed/:id', verifyToken, updateData)
route.delete('/breed/:id', verifyToken, deleteData)

module.exports = route