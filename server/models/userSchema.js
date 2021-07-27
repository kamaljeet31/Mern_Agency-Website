const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  messages: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
})

// JWT TOKEN

userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this.id.toString() }, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({ token: token })
    await this.save()
    return token
    // console.log(token)
  } catch (error) {
    // res.send(error)
    res.send(error)
    console.log(error)
  }
}

// bcrypt hashing
userSchema.pre('save', async function (next) {
  console.log('hi from bcrypt hashing ')
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
    this.cpassword = await bcrypt.hash(this.cpassword, 12)
  }
  next()
})

// store the message

userSchema.methods.addMessage = async function (name, email, phone, message) {
  try {
    this.messages = this.messages.concat({
      name,
      email,
      phone,
      message,
    })
    await this.save()
    return this.messages
  } catch (error) {
    console.log('no message typed')
  }
}

// now create new collection or models

const User = mongoose.model('USER', userSchema)

module.exports = User
