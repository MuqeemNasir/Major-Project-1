const User = require('../models/user.model')
const { DEFAULT_USER_ID } = require('../utils/defaultUser')

const createUser = async (req, res) => {
    try {
        const { name, email, phone } = req.body
        const existing = await User.findOne({ email })
        if (existing) {
            return res.status(400).json({ message: 'Email already exists' })
        }
        if (!name || !email) {
            return res.status(400).json({ message: 'Name and email are required' })
        }

        const user = await User.create({ name, email, phone })
        res.status(201).json({ data: { user } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    try {
        const userId = req.userId || req.params.userId || DEFAULT_USER_ID
        const existingUser = await User.findById(userId).populate('addresses')
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' })
        }
        res.status(200).json({ data: { existingUser } })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createUser, getUser }