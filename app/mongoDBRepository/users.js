const { UserModel } = require('../models/user')

exports.retrieveUsers = async (query, options) => {
  try {
    const users = await UserModel.paginate(query, options)
    return users
  } catch (error) {
    console.log(error)
    throw Error('Error while paginating users')
  }
}

exports.retrieveUser = async (req) => {
  try {
    const user = await UserModel.findById(req.params.userId)
    return user
  } catch (error) {
    console.log(error)
    throw Error('Error while retrieving user')
  }
}

exports.findUserByEmail = async (req) => {
  try {
    const alreadyExist = await UserModel.findOne({ email: req.body.email })
    return alreadyExist
  } catch (error) {
    console.log(error)
    throw Error('Error while finding user by email')
  }
}

exports.createUser = async (req) => {
  try {
    const newUser = await UserModel.create(req.body)
    return newUser
  } catch (error) {
    console.log(error)
    throw Error('Error while creating user')
  }
}

exports.findByIdAndUpdateUser = async (req, params) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(req.params.userId, req.body, params)
    return updatedUser
  } catch (error) {
    console.log(error)
    throw Error('Error while updating user')
  }
}

exports.findByIdAndDeleteUser = async (req) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.userId)
    return deletedUser
  } catch (error) {
    console.log(error)
    throw Error('Error while deleting user')
  }
}