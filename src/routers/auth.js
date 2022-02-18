const express = require('express')
const { login } = require('../controllers/login')
const { regsister } = require('../controllers/register')

const router = express.Router()

// router.post("/register", AuthController.register);
router.post('/login', login)
router.post('/register', regsister)

module.exports = router
