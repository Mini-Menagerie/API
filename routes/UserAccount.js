// Route API UserAccount
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    detailData,
    updateData,
    deleteData
} = require('../controllers/UserAccount')

route.get('/userAccount/:id', detailData)
route.put('/userAccount/:id', verifyToken, updateData)
route.delete('/userAccount/:id', verifyToken, deleteData)

module.exports = route