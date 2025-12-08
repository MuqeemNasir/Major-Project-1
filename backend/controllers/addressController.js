const Address = require('../models/address.model')
const User = require('../models/user.model')
const { DEFAULT_USER_ID } = require("../utils/defaultUser")

const addAddress = async (req, res) => {
    try {
        const { ...addressData } = req.body
        let {userId} = req.body
        userId = req.userId || userId || DEFAULT_USER_ID 
        if (!userId) {
            return res.status(400).json({ message: 'User ID is required.' })
        }
        // const newAddress = new Address(addressData)
        // const savedAddress = await newAddress.save()
        const newAddress = await Address.create({...addressData, user: userId})
        
        await User.findByIdAndUpdate(userId, { $push: { addresses: newAddress._id } }, { new: true })
        res.status(201).json({ data: { address: newAddress } })
    } catch (error) {
        console.error("addAddress error: ", error)
        res.status(500).json({ message: 'Server error in adding address.' })
    }
}

const getAddress = async (req, res) => {
    try {
        const userId = req.userId || req.params.userId || DEFAULT_USER_ID
        const user = await User.findById(userId).populate('addresses')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json({ data: { addresses: user.addresses } })
    } catch (error) {
        console.error("getAddress error: ", error)
        res.status(500).json({ message: 'Server error in fetching addresses.' })
    }
}

const getAddressById = async(req, res) => {
    try{
        const {addressId} = req.params
        const address = await Address.findById(addressId)

        if(!address){
            return res.status(404).json({message: "Address not found"})
        }
        res.status(200).json({data: {address}})
    }catch(error){
        console.error("getAddressById error: ", error)
        res.status(500).json({message: "Server error in fetching single address"})
    }
}

const updateAddress = async (req, res) => {
    try {
        const { addressId } = req.params
        const updates = req.body
        const updated = await Address.findByIdAndUpdate(addressId, updates, { new: true })
        if (!updated) {
            return res.status(400).json({ message: 'Address not found.' })
        }
        res.status(200).json({ data: { address: updated } })
    } catch (error) {
        console.error("updateAddress error: ", error)
        res.status(500).json({ message: 'Server error in updating address.' })
    }
}

const deleteAddress = async (req, res) => {
    try {
        const { addressId } = req.params
        let userId = req.userId || req.params.userId || DEFAULT_USER_ID
        await Address.findByIdAndDelete(addressId)
        await User.findByIdAndUpdate(userId, { $pull: { addresses: addressId } })
        res.status(200).json({ message: "Address deleted successfully" })
    } catch (error) {
        console.error("deleteAddress error: ", error)
        res.status(500).json({ message: 'Server error in deleting the address.' })
    }
}

module.exports = { addAddress, getAddress, getAddressById, updateAddress, deleteAddress }