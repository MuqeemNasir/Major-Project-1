    const express = require('express')
    const router = express.Router()

    const {addAddress, getAddress, getAddressById, updateAddress, deleteAddress} = require('../controllers/addressController')

    router.post('/', addAddress)
    router.get('/:userId', getAddress)
    router.get('/single/:addressId', getAddressById)
    router.post('/:addressId', updateAddress)
    router.delete('/:userId/:addressId', deleteAddress)

    module.exports = router