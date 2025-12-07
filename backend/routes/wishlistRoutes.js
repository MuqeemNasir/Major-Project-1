const express = require('express')
const router = express.Router()

const {getWishlist, addToWishlist, removeFromWishlist} = require('../controllers/wishlistController')

router.param("userId", (req, res, next, userId) => {
    req.userId = userId
    next()
})

router.get('/user/:userId', getWishlist)
router.post('/', addToWishlist)
router.delete('/user/:userId/:productId', removeFromWishlist)

module.exports = router