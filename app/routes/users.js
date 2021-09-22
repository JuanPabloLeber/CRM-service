const express = require('express')
const usersRouter = express.Router()

const {
  listUsers,
  listUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/users.js')

usersRouter.get('/', listUsers)
usersRouter.get('/:userId', listUser)

usersRouter.post('/', createUser)

usersRouter.put('/:userId', updateUser)

usersRouter.delete('/:userId', deleteUser)

exports.usersRouter = usersRouter
