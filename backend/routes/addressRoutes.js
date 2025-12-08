    const express = require('express')
    const router = express.Router()

    const {addAddress, getAddress, getAddressById, updateAddress, deleteAddress} = require('../controllers/addressController')

    router.param("userId", (req, res, next, userId) => {
    req.userId = userId
    next()
})

    router.post('/', addAddress)
    router.get('/', getAddress)
    router.get('/single/:addressId', getAddressById)
    router.post('/:addressId', updateAddress)
    router.delete('/:addressId', deleteAddress)

    module.exports = router