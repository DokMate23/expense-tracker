const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  categoryId: mongoose.Schema.Types.ObjectId,  
  amount: Number,        
  description: String,   
  createdAt: Date
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
