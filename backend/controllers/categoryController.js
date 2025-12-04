const Category = require('../models/category.model')

const addCategory = async(req, res) => {
    try{
        const newCategory = new Category(req.body)
        const saved = await newCategory.save()
        res.status(201).json({message: 'Category added successfully', data: {category: saved}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getCategories = async(req, res) => {
    try{
        const categories = await Category.find()
        if(categories.length === 0){
            return res.status(404).json({data: {categories}})
        }
        res.status(200).json({data: {categories}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getCategoryById = async(req, res) => {
    try{
        const {categoryId} = req.params
        const category = await Category.findById(categoryId)
        if(!category){
           return res.status(404).json({message: 'Category not found.'})
        }
        res.status(200).json({data: {category}})
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = {addCategory, getCategories, getCategoryById}