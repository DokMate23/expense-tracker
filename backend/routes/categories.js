const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    if (!categories || categories.length === 0) {
      return res.status(404).json({ ok: false, error: 'No categories found' })
    }
    
    return res.status(200).json({ ok: true, data: categories })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}

const createCategory = async (req, res) => {
  try {
    const { name } = req.body
    
    if (!name) {
      return res.status(400).json({ ok: false, error: 'Category name is required' })
    }
    
    const category = new Category({
      name,
      createdAt: new Date()
    })
    
    await category.save()
    return res.status(201).json({ ok: true, data: category })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}


router.post('/', createCategory)
router.get('/', getCategories)
module.exports = router;