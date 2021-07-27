const dotenv = require('dotenv')
const express = require('express')
const app = express()
const user = require('./models/userSchema')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

dotenv.config({ path: './config.env' })
require('./db/conn')

app.use(express.json())

const port = process.env.PORT || 5000

// we link the router files to make our route easy
app.use(require('./routers/router'))

app.listen(port, () => {
  console.log(`connection is set at ${port}`)
})
