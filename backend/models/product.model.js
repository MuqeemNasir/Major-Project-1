const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    artist: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, default: 0 },
    rating: { type: Number, default: 0 },
    imageUrls: [{ type: String, trim: true }],
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, default: 1 },
    sizes: [{ type: String }],
    medium: { type: String },
    year: { type: Number },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
}, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product