const Order = require('../models/order.model')
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Address = require('../models/address.model')


const determineOrderItems = async (userId, itemsFromClient) => {
    if (Array.isArray(itemsFromClient) && itemsFromClient.length > 0) {
        return itemsFromClient
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.product')
    if (!cart || !cart.items || cart.items.length === 0) {
        throw new Error('No items found in cart.')
    }
    return cart.items.map((it) => ({ product: it.product._id, quantity: it.quantity, size: it.size || null }))
}

const finalizeItemsAndCalculateTotal = async (items) => {
    const productIds = items.map((item) => item.product)
    const products = await Product.find({ _id: { $in: productIds } })

    const productMap = {}
    for (const p of products) {
        productMap[p._id.toString()] = p
    }

    const orderItems = []
    let totalAmount = 0


    for (const item of items) {
        const product = productMap[item.product.toString()]
        if (!product) {
            throw new Error(`Product ${item.product} not found.`)
        }

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            size: item.size || null,
            priceAtPurchase: product.price,
        })
        totalAmount += product.price * item.quantity
    }
    return { orderItems, totalAmount }
}

const determineShippingAddress = async (shippingAddressId, shippingAddress) => {
    if (shippingAddress) {
        return shippingAddress
    }

    if (shippingAddressId) {
        const addr = await Address.findById(shippingAddressId)
        if (!addr) {
            throw new Error('Shipping address not found.')
        }
        return addr.toObject()
    }
    throw new Error('Shipping address is required.')
}

const placeOrder = async (req, res) => {
    try {
        const { userId, shippingAddressId, items: itemsFromClient, shippingAddress } = req.body
        if (!userId) {
            return res.status(400).json({ message: 'UserId is required.' })
        }

        const rawItems = await determineOrderItems(userId, itemsFromClient)

        const { orderItems, totalAmount } = await finalizeItemsAndCalculateTotal(rawItems)

        const selectedAddress = await determineShippingAddress(shippingAddressId, shippingAddress)

        const order = await Order.create({
            user: userId,
            items: orderItems,
            shippingAddress: selectedAddress,
            totalAmount,
        })

        await Cart.deleteMany({ user: userId })

        return res.status(201).json({ message: 'Order Placed Successfully!', data: { order } })

    } catch (error) {
        console.error("placeOrder error: ", error)
        return res.status(500).json({ message: 'Server error in placing order.' })
    }
}

const getOrders = async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await Order.find({ user: userId }).populate('items.product').sort({ createdAt: -1 })
        return res.status(200).json({ data: { orders } })
    } catch (error) {
        console.error("getOrders error: ", error)
        return res.status(500).json({ message: 'Server error in fetching orders.' })
    }
}
 
const getOrderById = async (req, res) => {
    try {
        const { orderId } = req.params
        const order = await Order.findById(orderId).populate('items.product')
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' })
        }
        return res.status(200).json({ data: { order } })
    } catch (error) {
        console.error("getOrderById: ", error)
        return res.status(500).json({ message: 'Server error in fetching order by id.' })
    }
}

module.exports = { placeOrder, getOrders, getOrderById }