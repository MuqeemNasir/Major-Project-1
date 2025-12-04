const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    label: {
        type: String,
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    line1: {
        type: String,
        trim: true,
    },
    line2: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    postalCode: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    isDefault: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address