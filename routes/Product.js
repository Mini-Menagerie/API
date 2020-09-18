// Route API Product
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/Product')

route.get('/product', getAllData)
route.post('/product/create', verifyToken, createData)
route.get('/product/:id', detailData)
route.put('/product/:id', verifyToken, updateData)
route.delete('/product/:id', verifyToken, deleteData)

module.exports = route