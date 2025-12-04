const express = require('express')
const router = express.Router()

const {getCart, addToCart, updateQuantity, removeFromCart, clearCart} = require('../controllers/cartController')

router.get('/user/:userId', getCart)
router.post('/', addToCart)
router.post('/update', updateQuantity)
router.delete('/user/:userId/item/:productId', removeFromCart)
router.delete('/clear/:userId', clearCart)

module.exports = router
