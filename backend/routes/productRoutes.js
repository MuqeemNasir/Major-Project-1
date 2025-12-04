const express = require('express')
const router = express.Router()

const {addProducts, getProducts, getProductById} = require('../controllers/productController')

router.post('/', addProducts)
router.get('/', getProducts)
router.get('/:productId', getProductById)

module.exports = router 
