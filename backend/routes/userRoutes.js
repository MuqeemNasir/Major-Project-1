const express = require('express')
const router = express.Router()

const { createUser, getUser} = require('../controllers/userController')

router.param("userId", (req, res, next, userId) => {
    req.userId = userId
    next()
})

router.post('/', createUser)
router.get('/:userId', getUser)

module.exports = router