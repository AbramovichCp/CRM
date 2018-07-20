const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

//http://localhost:5000/api/auth/login
router.post('/login', controller.login)
//http://localhost:5000/api/auth/register
router.post('/register', controller.register)

module.exports = router