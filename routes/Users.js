// Route API Users
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/Users')

route.get('/users', getAllData)
route.get('/users/:id', detailData)
route.put('/users/:id', verifyToken, updateData)
route.delete('/users/:id', verifyToken, deleteData)

module.exports = route