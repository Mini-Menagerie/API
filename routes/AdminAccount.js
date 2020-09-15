// Route API AdminAccount
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    detailData,
    updateData
} = require('../controllers/AdminAccount')

route.get('/adminAccount/:id', detailData)
route.put('/adminAccount/:id', verifyToken, updateData)

module.exports = route