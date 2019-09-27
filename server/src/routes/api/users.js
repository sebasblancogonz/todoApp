const router = require('express').Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const constants = require('../../utils/constants')

router.post('/login', async (req, res, next) => {
  let errors = {}
  const { username, password } = req.body.user
  await User.findOne({ username }).then(user => {
    if (!user) {
      errors.user = 'User not found'
      return res.status(404).json(errors)
    }
    bcrypt.compare(password, user.hash).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          username: user.username,
        }
        jwt.sign(
          payload,
          process.env.BIG_SECRET,
          {
            expiresIn: 3600,
          },
          (err, token) => {
            if (err) console.error('There is some error in token', err)
            else {
              res.json({
                success: true,
                token,
              })
            }
          }
        )
      } else {
        errors.password = 'Incorrect password'
        return res.json(400).json(errors)
      }
    })
  })
})

router.post('/register', async (req, res) => {
  const userParam = req.body.user
  const { username } = userParam

  if (await User.findOne({ username })) {
    return res.json('Username "' + username + '" is already taken')
  }

  const user = new User(userParam)

  if (userParam.password) {
    user.hash = bcrypt.hashSync(userParam.password, 10)
  }

  await user.save(user).then((user, err) => {
    return res.json({ status: constants.STATUS_OK, userSaved: user })
  })
})

router.get('/', async (req, res) => {
  await User.find()
    .select('-hash')
    .then(users => res.json(users))
})

router.get('/:userId', async (req, res) => {
  const userId = req.params.userId
  await User.findById(userId, (err, user) => {
    if(err) res.sendStatus(500).json({message: 'Something went wrong', error: err})
    return res.json(user)
  })
})

router.post('/u/:username', async (req, res) => {
  const { params } = req
  await User.find({ username: params.username }).then(user => {
    res.json({ user: user })
  })
})

router.post('/id/:userId', async (req, res) => {
  const { params } = req
  await User.findByIdAndUpdate(params.userId, (err, user) => {
    if (err) return res.json(err)
    return res.json({ message: `User ${user.username} modified successfully.` })
  })
})

module.exports = router
