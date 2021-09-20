const express = require('express')
const router = express.Router()

const { authRouter } = require('./auth')
const { usersRouter } = require('./users')

router
  .use('/user', usersRouter)
  .use('/auth', authRouter)

exports.router = router
