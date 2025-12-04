const express = require('express')
const router = express.Router()

const {getWishlist, addToWishlist, removeFromWishlist} = require('../controllers/wishlistController')

router.get('/user/:userId', getWishlist)
router.post('/', addToWishlist)
router.delete('/user/:userId/:productId', removeFromWishlist)

module.exports = router