const express = require('express')
const router = express.Router()

const {getCart, addToCart, updateQuantity, removeFromCart, clearCart} = require('../controllers/cartController')

router.get('/', getCart)
router.post('/', addToCart)
router.post('/update', updateQuantity)
router.delete('/item/:productId', removeFromCart)
router.delete('/clear', clearCart)

module.exports = router
