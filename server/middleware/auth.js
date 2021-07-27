const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')
// const cookieParser = require('cookie-parser')
// router.use(cookieParser())

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken
    if (!token) {
      console.log('token not found', token)
    }
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
    console.log(verifyToken)

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      'tokens.token': token,
    })
    if (!rootUser) {
      throw new Error('user not Found')
    }
    console.log(User)
    req.token = token
    req.rootUser = rootUser
    req.userID = rootUser._id

    next()
  } catch (error) {
    res.status(401).send('unauthorized  no token provided')
    console.log(error)
  }
}
module.exports = auth
