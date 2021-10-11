const customersRepository = require('../mongoDBRepository/customers')

exports.listCustomers = async (req, res) => {
  try {
    const options = {
      populate: ['creator', 'lastModified'],
      limit: parseInt(req.query.limit, 10) || 10,
      page: parseInt(req.query.page, 10) || 1
    }
    const customers = await customersRepository.retrieveCustomers({}, options)
    res.status(200).json(customers)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listCustomer = async (req, res) => {
  try {
    const customer = await customersRepository.retrieveCustomer(req)
    if (customer) {
      res.status(200).json(customer)
    } else {
      res.status(404).json({ msg: 'Customer not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.createCustomer = async (req, res) => {
  try {
    const creator = req.userData.id
    const alreadyExist = await customersRepository.findCustomerByEmail(req)
    if (alreadyExist === null) {
      req.body.creator = creator
      req.body.lastModified = creator
      const newCustomer = await customersRepository.createCustomer(req)
      res.status(200).json({ msg: 'Customer created' })
    } else {
      res.status(409).json({ msg: 'Customer already registered' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.updateCustomer = async (req, res) => {
  try {
    if (req.body.email) {
      const alreadyExist = await customersRepository.findCustomerByEmail(req)
      if (alreadyExist !== null) {
        return res.status(409).json({ msg: 'Email already in use' })
      }
    } else {
      delete req.body.creator
      const lastModified = req.userData.id
      req.body.lastModified = lastModified
      const updatedCustomer = await customersRepository.findByIdAndUpdateCustomer(req, { new: true })
      res.status(200).json({ msg: 'Customer updated' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await customersRepository.findByIdAndDeleteCustomer(req)
    if (deletedCustomer !== null) {
      res.status(200).json({ msg: 'Customer deleted' })
    } else {
      res.status(404).json({ msg: 'Customer not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}
