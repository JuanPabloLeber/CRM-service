const express = require('express')
const customersRouter = express.Router()

const {
  listCustomers,
  listCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customers.js')

customersRouter.get('/', listCustomers)
customersRouter.get('/:customerId', listCustomer)

customersRouter.post('/', createCustomer)

customersRouter.put('/:customerId', updateCustomer)

customersRouter.delete('/:customerId', deleteCustomer)

exports.customersRouter = customersRouter
