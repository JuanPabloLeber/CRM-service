const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  photo: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lastModified: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

customerSchema.plugin(mongoosePaginate)

const CustomerModel = mongoose.model('Customer', customerSchema)

exports.CustomerModel = CustomerModel
