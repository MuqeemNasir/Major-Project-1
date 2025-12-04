const express = require('express')
const router = express.Router()

const {placeOrder, getOrders, getOrderById} = require('../controllers/orderController')

router.post('/', placeOrder)
router.get('/user/:userId', getOrders)
router.get('/single/:orderId', getOrderById)

module.exports = router