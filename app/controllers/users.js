const usersRepository = require('../mongoDBRepository/users')
const bcrypt = require('bcrypt')
const saltRounds = parseInt(process.env.SALTROUNDS)

exports.listUsers = async (req, res) => {
  try {
    const options = {
      limit: parseInt(req.query.limit, 10) || 10,
      page: parseInt(req.query.page, 10) || 1
    }
    const users = await usersRepository.retrieveUsers({}, options)
    res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.listUser = async (req, res) => {
  try {
    const user = await usersRepository.retrieveUser(req)
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
    const alreadyExist = await usersRepository.findUserByEmail(req)
    if (alreadyExist === null) {
      req.body.password = await bcrypt.hash(req.body.password, saltRounds)
      const newUser = await usersRepository.createUser(req)
      res.status(200).json({ msg: 'User created' })
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
      const alreadyExist = await usersRepository.findUserByEmail(req)
      if (alreadyExist !== null) {
        return res.status(409).json({ msg: 'Email already in use' })
      }
    }
    const updatedUser = await usersRepository.findByIdAndUpdateUser(req, { new: true })
    res.status(200).json({ msg: 'User updated' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in server' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await usersRepository.findByIdAndDeleteUser(req)
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
