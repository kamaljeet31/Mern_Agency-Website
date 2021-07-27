const express = require('express')
const auth = require('../middleware/auth')

const User = require('../models/userSchema')
require('../db/conn')
const bcrypt = require('bcryptjs')

const router = express.Router()
const jwt = require('jsonwebtoken')

// router.get('/', auth, (req, res) => {
//   res.send('hello world from server router js')
// })

// about us ka page
router.get('/about', auth, (req, res) => {
  res.send(req.rootUser)
})

// Logout us ka page
router.get('/logout', (req, res) => {
  console.log('hello my logout page')
  res.clearCookie('jwtoken', { path: '/' })
  res.status(200).send('user logout')
})

// get userdata for contact Us and Home page
router.get('/getdata', auth, (req, res) => {
  res.send(req.rootUser)
})

// contact Us ka page
router.post('/contact', auth, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body

    if (!name || !email || !phone || !message) {
      console.log('please type message in field')
      return res.status(422).json({
        error: 'plzz filled the contact form',
      })
    }
    const userContact = await User.findOne({ _id: req.userID })

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      )

      await userContact.save()
      res.status(201).json({ message: 'user Contact successfully' })
    }
  } catch (error) {
    console.log(error)
  }
})

// create Login
router.post('/login', async (req, res) => {
  try {
    let token
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'plz fill the data' })
    }

    const userLogin = await User.findOne({ email })

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password)

      token = await userLogin.generateAuthToken()
      console.log('router.js ka token ' + token)

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      })

      if (!isMatch) {
        res.status(400).json({ error: 'invalid credentials' })
      }
      res.json({ message: 'user sign successfully' })
    } else {
      res.status(400).json({ error: 'invalid credentials' })
    }
  } catch (error) {
    console.log(error)
  }
})

// with async await
router.post('/register', async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: 'Please fill the data in sign up fields' })
  }
  try {
    const userExist = await User.findOne({ email: email })

    if (userExist) {
      return res.status(422).json({ error: 'email  already present' })
    } else if (password != cpassword) {
      return res.status(422).json({ error: 'password not matching' })
    } else {
      const user = new User({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      })
      //
      await user.save()
      res.status(201).json({ message: 'user reg success' })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router

// using promises

// router.post('/register', (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: 'fill it' })
//   }

//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: 'email  already present' })
//       }
//       const user = new User({ name, email, phone, work, password, cpassword })
//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: 'user reg success' })
//         })
//         .catch((err) => res.status(500).json({ error: 'register failed' }))
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
