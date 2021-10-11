const { CustomerModel } = require('../models/customer')

exports.retrieveCustomers = async (query, options) => {
  try {
    const customers = await CustomerModel.paginate(query, options)
    return customers
  } catch (error) {
    console.log(error)
    throw Error('Error while paginating customers')
  }
}

exports.retrieveCustomer = async (req) => {
  try {
    const customer = await CustomerModel.findById(req.params.customerId).populate('creator').populate('lastModified')
    return customer
  } catch (error) {
    console.log(error)
    throw Error('Error while retrieving customer')
  }
}

exports.findCustomerByEmail = async (req) => {
  try {
    const alreadyExist = await CustomerModel.findOne({ email: req.body.email })
    return alreadyExist
  } catch (error) {
    console.log(error)
    throw Error('Error while finding customer by email')
  }
}

exports.createCustomer = async (req) => {
  try {
    const newCustomer = await CustomerModel.create(req.body)
    return newCustomer
  } catch (error) {
    console.log(error)
    throw Error('Error while creating customer')
  }
}

exports.findByIdAndUpdateCustomer = async (req, params) => {
  try {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(req.params.customerId, req.body, params)
    return updatedCustomer
  } catch (error) {
    console.log(error)
    throw Error('Error while updating customer')
  }
}

exports.findByIdAndDeleteCustomer = async (req) => {
  try {
    const deletedCustomer = await CustomerModel.findByIdAndDelete(req.params.customerId)
    return deletedCustomer
  } catch (error) {
    console.log(error)
    throw Error('Error while deleting customer')
  }
}