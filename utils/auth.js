const jwt = require('jsonwebtoken')
const usersRepository = require('../app/mongoDBRepository/users')
const secret = process.env.SECRET

exports.verifyToken = async (req, res, next) => {
  try {
    const bearerHeader = req.headers.authorization

    if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1]
      jwt.verify(token, secret, (error, userData) => {
        if (error) return res.status(403).json({ msg: 'Token not valid' })
        req.userData = userData
        next()
      })
    } else {
      res.status(403).json({ msg: 'Token not valid' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}

exports.checkAdmin = async (req, res, next) => {
  try {
    const dataBaseUser = await usersRepository.findUserById
    if (dataBaseUser) {
      if (dataBaseUser.role === 'admin') {
        next()
      }
    } else {
      res.status(403).json({ msg: 'Access not allowed' })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}
