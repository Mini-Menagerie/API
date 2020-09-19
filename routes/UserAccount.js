// Route API UserAccount
const express = require('express')
const route = express.Router();
const {verifyToken} = require('../helpers/token');

const {
    login,
    createData,
    detailData,
    updateDataEmail,
    updateDataPassword,
    deleteData
} = require('../controllers/UserAccount')

route.post('/userAccount/login', login)
route.post('/userAccount/register', createData)
route.get('/userAccount/:id', detailData)
route.put('/userAccountEmail/:id', verifyToken, updateDataEmail)
route.put('/userAccountPassword/:id', verifyToken, updateDataPassword)
route.delete('/userAccount/:id', verifyToken, deleteData)

module.exports = route