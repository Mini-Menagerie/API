// Route API FormRequest
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    allReqData,
    updateData,
    deleteData
} = require('../controllers/FormRequest')

route.get('/formRequest', getAllData)
route.post('/formRequest/create', createData)
route.get('/formRequest/:id', detailData)
route.get('/formRequest/all/:id', allReqData)
route.put('/formRequest/:id', verifyToken, updateData)
route.delete('/formRequest/:id', verifyToken, deleteData)

module.exports = route