// Route API FormRequest
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/FormRequest')

route.get('/formRequest', getAllData)
route.post('/formRequest/register', verifyToken, createData)
route.get('/formRequest/:id', detailData)
route.put('/formRequest/:id', verifyToken, updateData)
route.delete('/formRequest/:id', verifyToken, deleteData)

module.exports = route