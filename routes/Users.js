// Route API Users
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    getAllData,
    createData,
    detailData,
    updateData,
    deleteData
} = require('../controllers/Users')

route.get('/users', getAllData)
route.post('/users/register', createData)
route.get('/users/:id', detailData)
route.put('/users/:id', verifyToken, updateData)
route.delete('/users/:id', verifyToken, deleteData)

module.exports = route