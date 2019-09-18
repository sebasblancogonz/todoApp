const router = require('express').Router()
const User = require('../../models/User')
const constants = require('../../utils/constants')

router.post('/', async (req, res) => {
    const { username, name, lastname, birth, bio } = req.body.user
    
    const user = new User({
        username,
        name,
        lastname,
        birth,
        bio,
    })
    
    await user.save((err, user) => {
        if (err) return res.json(err)
        return res.json({ status: constants.STATUS_OK, userSaved: user })
    })
})

router.get('/', async (req, res) => {
    await User.find((err, users) => {
        if (err) return res.json(err)
        if (users.length === 0) return res.json({ message: "There are no users created." })
        return res.json({ users: users })
    })
})

router.get('/:username', async (req, res) => {
    const { params } = req
    await User.find({ username: params.username}, (err, user) => {
        if (err) return res.json(err)
        return res.json({ user: user })
    })
})

router.put('/:userId', async (req, res) => {
    const { params } = req
    await User.findByIdAndUpdate(params.userId, (err, user) => {
        if (err) return res.json(err)
        return res.json({ message: `User ${user.username} modified successfully.`})
    })
})

module.exports = router