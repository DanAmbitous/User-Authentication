const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/userPrototype')

let usersArray;

async function arrayifiyData() {
  usersArray = ""

  usersArray = await User.find();

  console.log(usersArray)
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
    password: hashedPassword,
    role: 'basic'
  })

  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Update a user
router.patch('/:id', getAUser, async (req, res) => {
  if (req.body.username != null) {
    res.user.username = req.body.username
  }

  if (req.body.role != null) {
    res.user.role = req.body.role
  }

  try {
    const updatedUser = await res.user.save()

    res.json(updatedUser)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

//Login with POST method
router.post('/login', async (req, res) => {
  usersArray = ""
  usersArray = await User.find();

  console.log(usersArray)

  const user = await usersArray.find(user => user.username === req.body.username)

  console.log(user)

  console.log(req.body.username)

  if (user == null) {
    return res.status(400).json({ message: 'Cannot find user' })
  }

  try {
    console.log(req.body.password, user.password)

    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json({ message: 'Success', user })
    } else {
      res.json({ message: 'Not Allowed' })
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Delete all users
router.delete('/', async (req, res) => {
  let usernames = await User.find()
  
  console.log(usernames)

  await User.find().deleteMany()

  res.send(`Deleted the following users ${usernames}`)
})

router.delete('/:id', getAUser, async (req, res) => {
  try {
    let username = res.user.username

    await res.user.remove()

    res.send(`Deleted the user of ${username}`)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


async function getAUser(req, res, next) {
  let user

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