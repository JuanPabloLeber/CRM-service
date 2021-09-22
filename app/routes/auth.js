const express = require('express')
const authRouter = express.Router()
const { login } = require('../controllers/auth')

authRouter.post('/', login)

exports.authRouter = authRouter
