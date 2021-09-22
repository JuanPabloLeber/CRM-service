const { CustomerModel } = require('../models/customer')

exports.listCustomers = async (req, res) => {
  try {
    const options = {
      populate: ['creator', 'lastModified'],
      limit: parseInt(req.query.limit, 10) || 10,
      page: parseInt(req.query.page, 10) || 1
    }
    const users = await CustomerModel.paginate({}, options)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listCustomer = async (req, res) => {
  try {
    const user = await CustomerModel.findById(req.params.customerId).populate('creator').populate('lastModified')
    if (user) {
      res.status(200).json(user)
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
    const alreadyExist = await CustomerModel.findOne({ email: req.body.email })
    if (alreadyExist === null) {
      req.body.creator = creator
      req.body.lastModified = creator
      const newUser = await CustomerModel.create(req.body)
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
      const alreadyExist = await CustomerModel.findOne({ email: req.body.email })
      if (alreadyExist !== null) {
        return res.status(409).json({ msg: 'Email already in use' })
      }
    } else {
      delete req.body.creator
      const lastModified = req.userData.id
      req.body.lastModified = lastModified
      const updatedCustomer = await CustomerModel.findByIdAndUpdate(req.params.customerId, req.body, { new: true })
      res.status(200).json({ msg: 'Customer updated' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.customerId)
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
