const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userPrototype')

let usersArray;

async function arrayifiyData() {
  usersArray = await User.find();
}

arrayifiyData()

//Get all users
router.get('/', async (req, res) => {
  try {
   const users = await User.find()

    res.json(users)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get one user
router.get('/:id', getAUser, (req, res) => {
  res.send(res.user)
})

//Create a user
router.post('/', async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const user = new User({
    username: req.body.username,
    password: hashedPassword
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Login with POST method
router.post('/login', async (req, res) => {
  const user = usersArray.find(user => user.username === req.body.username)

  console.log(user)

  console.log(req.body.username)

  if (user == null) {
    return res.status(400).send('Cannot find user')
  }

  try {
    console.log(req.body.password, user.password)

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Delete all users
router.delete('/', async (req, res) => {
  await User.find().deleteMany()

  res.send('Deleted Users')
})

async function getAUser(req, res, next) {
  try {
    user = await User.findById(req.params.id)

    if (user == null) {
      return res.status(404).json({message: `Cannot find the book by the id of ${req.params.id}`})
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }

  res.user = user

  next()
}

module.exports = router