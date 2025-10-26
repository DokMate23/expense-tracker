const express = require('express')
const router = express.Router()
const Expense = require('../models/Expenses')
const { sendEmail } = require('../services/emailServices')

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('categoryId', 'name')
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ ok: false, error: 'No expenses found' })
    }

    return res.status(200).json({ ok: true, data: expenses })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}

const EXPENSE_LIMIT = 1000
const createExpense = async (req, res) => {
  try {
    const { categoryId, amount, description } = req.body

    if (!categoryId) {
      return res.status(400).json({ ok: false, error: 'Category ID is required' })
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({ ok: false, error: 'Valid amount is required' })
    }

    if (!description) {
      return res.status(400).json({ ok: false, error: 'Description is required' })
    }

    const existingExpenses = await Expense.find()
    const currentTotal = existingExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    if (currentTotal + amount > EXPENSE_LIMIT) {
      await sendEmail();
      return res.status(400).json({ ok: false, error: 'Expense limit exceeded' })
    }

    const expense = new Expense({
      categoryId,
      amount,
      description,
      createdAt: new Date()
    })

    await expense.save()
    return res.status(201).json({ ok: true, data: expense })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ ok: false, error: 'Expense ID is required' })
    }

    const expense = await Expense.findByIdAndDelete(id)
    if (!expense) {
      return res.status(404).json({ ok: false, error: 'Expense not found' })
    }

    return res.status(200).json({ ok: true, data: { message: 'Expense deleted successfully' } })
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message })
  }
}

router.get('/', getExpenses)
router.post('/', createExpense)
router.delete('/:id', deleteExpense)

module.exports = router
