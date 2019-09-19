const router = require('express').Router()
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const constants = require('../../utils/constants')

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user && bcrypt.compareSync(password, user.hash)) {
    const { hash, ...userWithouthHash } = user.toJSON()
    const token = jwt.sign({ sub: user.id }, process.env.BIG_SECRET)
    return {
      ...userWithouthHash,
      token,
    }
  }
})

router.post('/register', async (req, res) => {
    console.log(req.body)
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

router.get('/u/:username', async (req, res) => {
  const { params } = req
  await User.find({ username: params.username }).then(user => {
    res.json({ user: user })
  })
})

router.put('/id/:userId', async (req, res) => {
  const { params } = req
  await User.findByIdAndUpdate(params.userId, (err, user) => {
    if (err) return res.json(err)
    return res.json({ message: `User ${user.username} modified successfully.` })
  })
})

module.exports = router
