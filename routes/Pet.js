// Route API Pet
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData
} = require('../controllers/Pet')

route.get('/pet', getAllData)
route.post('/pet/register', verifyToken, createData)
route.get('/pet/:id', detailData)
route.put('/pet/:id', verifyToken, updateData)

module.exports = route