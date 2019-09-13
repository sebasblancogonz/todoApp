const router = require('express').Router()

router.use('/todos', require('./todo'))
router.use('/users', require('./user'))

module.exports = router