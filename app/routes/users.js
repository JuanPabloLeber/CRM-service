const express = require('express')
const usersRouter = express.Router()
const { verifyToken, checkAdmin } = require('../../utils/auth')

const {
  listUsers,
  listUser,
  createUser,
  updateUser,
  deleteUser,
  listCustomers,
  listCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/users.js')

usersRouter.get('/', verifyToken, checkAdmin, listUsers)
usersRouter.get('/customers', verifyToken, listCustomers)
usersRouter.get('/:userId', verifyToken, checkAdmin, listUser)
usersRouter.get('/customers/:customerId', verifyToken, listCustomer)

usersRouter.post('/', verifyToken, checkAdmin, createUser)
usersRouter.post('/customers/', verifyToken, createCustomer)

usersRouter.put('/customers/:customerId', verifyToken, updateCustomer)
usersRouter.put('/:userId', verifyToken, checkAdmin, updateUser)

usersRouter.delete('/customers/:customerId', verifyToken, deleteCustomer)
usersRouter.delete('/:userId', verifyToken, checkAdmin, deleteUser)

exports.usersRouter = usersRouter
