require('dotenv').config()

const express = require('express')
const app = express()
const PORT = 9898

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL,  { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () =>  console.log('Successfully connected to the database'))

app.use(express.json())

app.use(express.static('public'))

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

app.listen(PORT, () => console.log(`Running server on port ${PORT}`))