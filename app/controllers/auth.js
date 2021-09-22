const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

const { UserModel } = require('../models/user')

exports.login = async (req, res) => {
  const email = req.body.email
  const password = req.body.password

  try {
    const user = await UserModel.findOne({ email: email })

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ msg: 'Invalid user or password' })
    }

    const userData = {
      id: user._id,
      email: user.email
    }

    const token = jwt.sign(userData, secret, { expiresIn: '1h' })

    res.status(200).json({ token: token, ...userData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'Error in Server' })
  }
}
