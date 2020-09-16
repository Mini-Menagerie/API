// Route API Users
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    createData,
    detailData,
    updateData
} = require('../controllers/Users')

route.post('/users/register', createData)
route.get('/users/:id', detailData)
route.put('/users/:id', verifyToken, updateData)

module.exports = route