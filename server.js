require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const { router } = require('./app/routes')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use('/app', router)
app.listen(process.env.PORT, () => console.log('Server Started'))
