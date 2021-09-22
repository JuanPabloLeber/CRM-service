const express = require('express')
const router = express.Router()

const { authRouter } = require('./auth')
const { usersRouter } = require('./users')
const { customersRouter } = require('./customers')
const { verifyToken, checkAdmin } = require('../../utils/auth')

router
  .use('/user', verifyToken, checkAdmin, usersRouter)
  .use('/auth', authRouter)
  .use('/customer', verifyToken, customersRouter)

exports.router = router
