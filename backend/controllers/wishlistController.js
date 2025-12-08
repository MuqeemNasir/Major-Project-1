const Wishlist = require('../models/wishlist.model')
const Product = require('../models/product.model')
const { DEFAULT_USER_ID } = require('../utils/defaultUser')

const getWishlist = async (req, res) => {
    try {
        const userId = req.userId || req.params.userId || DEFAULT_USER_ID
        const wishlist = await Wishlist.findOne({ user: userId }).populate('products')
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' })
        res.status(200).json({ data: { wishlist } })
    } catch (error) {
        console.error("Error fetching wishlist:", error.message);
        res.status(500).json({ error: "Server error fetching wishlist" });
    }
}

const addToWishlist = async (req, res) => {
    try {
        let { userId, productId } = req.body
        userId = userId || DEFAULT_USER_ID

        if (!userId || !productId) {
            return res.status(400).json({ message: 'userId and productId are required.' })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' })
        }

        let wishlist = await Wishlist.findOne({ user: userId })
        if (!wishlist) {
            wishlist = new Wishlist({ user: userId, products: [product._id] })
        } else {
            const alreadyExists = wishlist.products.some(
                id => id.toString() === product._id.toString()
            )

            if (alreadyExists) {
                return res.status(200).json({ message: 'Already in wishlist' })
            }
            wishlist.products.push(product._id)
        }
        await wishlist.save()
        const populated = await wishlist.populate('products')
        res.status(201).json({ message: 'Added to wishlist', data: {wishlist: populated} })
    } catch (error) {
        console.error('addToWishlist error: ', error)
        res.status(500).json({ message: 'Server error adding to wishlist.' })
    }
}

const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params
        let userId = req.userId || req.params.userId || DEFAULT_USER_ID

        if(!userId || !productId){
            return res.status(400).json({message: 'userId and productId are required.'})
        }
        const updated = await Wishlist.findOneAndUpdate({ user: userId }, { $pull: { products: productId } }, { new: true }).populate('products')
        if(!updated){
            return res.status(404).json({message: 'Wishlist not found for this user.'})
        }
        res.status(200).json({ message: 'Removed from wishlist.' })
    } catch (error) {
        console.error("removeFromWishlist error: ", error)
        res.status(500).json({ message: 'Server error from wishlist.' })
    }
}

module.exports = { getWishlist, addToWishlist, removeFromWishlist }