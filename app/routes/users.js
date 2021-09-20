const express = require('express')
const usersRouter = express.Router()

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

usersRouter.get('/', listUsers)
usersRouter.get('/:userId', listUser)
usersRouter.get('/customers', listCustomers)
usersRouter.get('/customers/:customerId', listCustomer)

usersRouter.post('/', createUser)
usersRouter.post('/customers', createCustomer)

usersRouter.put('/:userId', updateUser)
usersRouter.put('/customers/:customerId', updateCustomer)

usersRouter.delete('/:userId', deleteUser)
usersRouter.delete('/customer/:customerId', deleteCustomer)

exports.usersRouter = usersRouter
