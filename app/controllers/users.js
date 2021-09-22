const { UserModel } = require('../models/user')
const { CustomerModel } = require('../models/customer')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALTROUNDS)

exports.listUsers = async (req, res) => {
  try {
    const users = await UserModel.find({})
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.createUser = async (req, res) => {
  try {
    const alreadyExist = await UserModel.findOne({ email: req.body.email })
    if (alreadyExist === null) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await UserModel.create(req.body)
      res.status(200).json(newUser)
    } else {
      res.status(409).json({ msg: 'User already registered' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)
    }
    if (req.body.email) {
      const alreadyExist = await UserModel.findOne({ email: req.body.email })
      if (alreadyExist !== null) {
        return res.status(409).json({ msg: 'Email already in use' })
      }
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    res.status(200).json(updatedUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
    if (deletedUser !== null) {
      res.status(200).json({ msg: 'User deleted' })
    } else {
      res.status(404).json({ msg: 'User not found' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listCustomers = async (req, res) => {
  try {
    const users = await CustomerModel.find({}).populate('creator').populate('lastModified')
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listCustomer = async (req, res) => {
  try {
    const user = await CustomerModel.findById(req.params.userId).populate('creator').populate('lastModified')
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
      res.status(200).json(newUser)
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
      res.status(200).json(updatedCustomer)
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
