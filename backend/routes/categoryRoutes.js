const express = require('express')
const router = express.Router()

const {addCategory, getCategories, getCategoryById} = require('../controllers/categoryController')

router.post('/', addCategory)
router.get('/', getCategories)
router.get('/:categoryId', getCategoryById)

module.exports = router