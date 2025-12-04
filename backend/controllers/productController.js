const Product = require('../models/product.model')

const addProducts = async(req, res) => {
    try{
        const newProduct = new Product(req.body)
        const savedProduct = await newProduct.save()
        res.status(201).json({message: 'Product added successfully', data: {product: savedProduct}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getProducts = async(req, res) => {
    try{
        const products = await Product.find()
        if(products === 0){
            return res.status(404).json({message: 'Products not found.'})
        }
        res.status(200).json({data: {products}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getProductById = async(req, res) => {
    try{
        const {productId} = req.params
        const product = await Product.findById(productId)
        if(!product){
            return res.status(404).json({message: 'Product not found.'})
        }
        res.status(200).json({data: {product}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {addProducts, getProducts, getProductById}