const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

const getCart = async (req, res) => {
    try {
        const { userId } = req.params
        const cart = await Cart.findOne({ user: userId }).populate('items.product')
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' });
        }
        res.status(200).json({ data: { cart } })
    } catch (error) {
        console.error("getCart error: ", error)
        res.status(500).json({ message: "Server error in fetching cart." })
    }
}

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity = 1, size } = req.body
        if (!userId || !productId) {
            return res.status(400).json({ message: 'userId and productId are required.' })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({ message: 'Product not found.' })
        }

        let cart = await Cart.findOne({ user: userId })

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ product: product._id, quantity, size }],
            })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.product.toString() === product._id.toString() && (item.size || "") === (size || "")
            )

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity = Math.max(1, cart.items[itemIndex].quantity + Number(quantity))
            } else {
                cart.items.push({ product: product._id, quantity, size })
            }
        }

        await cart.save()
        const populated = await cart.populate("items.product")
        res.status(201).json({ message: 'Added to cart', data: { cart: populated } })
    } catch (error) {
        console.error("addToCart error: ", error)
        res.status(500).json({ message: 'Server error adding to cart.' })
    }
}

const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity, size } = req.body
        if (!userId || !productId || typeof quantity === "undefined") {
            return res.status(400).json({ message: 'userId, productId and quantity are required.' });
        }
        const cart = await Cart.findOne({ user: userId })

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found.' })
        }

        const itemIndex = cart.items.findIndex(
            item => item.product.toString() === productId.toString() && (item.size || "") === (size || "")
        )

        if (itemIndex === -1) {
            return res.status(400).json({ message: 'Cart item not found.' })
        }

        cart.items[itemIndex].quantity = Math.max(1, Number(quantity))
        await cart.save()
        const populated = await cart.populate('items.product')
        res.status(200).json({ message: 'Quantity Updated.', data: { cart: populated } })

    } catch (error) {
        console.error("updateQuantity error: ", error)
        res.status(500).json({ message: 'Server error in Cart Updating.' })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const { userId, productId } = req.params
        const size = req.query?.size ?? req.params?.size ?? ""

        if (!userId || !productId) {
            return res.status(400).json({ message: 'userId and productId are required.' })
        }

        const updated = await Cart.findOneAndUpdate({ user: userId }, { $pull: { items: { product: productId, size: size || undefined } } }, { new: true }).populate('items.product')
        if (!updated) {
            return res.status(404).json({ message: 'Cart not found.' })
        }
        res.status(200).json({ message: 'Removed from cart.', data: { cart: updated } })
    } catch (error) {
        console.error("removeFromCart error: ", error)
        res.status(500).json({ message: 'Server error in removing cart.' })
    }
}

const clearCart = async (req, res) => {
    try {
        const { userId } = req.params
        await Cart.findOneAndDelete({ user: userId })
        res.status(200).json({ message: 'Cart cleared.' })
    } catch (error) {
        console.error("clearCart error: ", error)
        res.status(500).json({ message: 'Server error in clearing the cart.' })
    }
}

module.exports = { getCart, addToCart, updateQuantity, removeFromCart, clearCart }