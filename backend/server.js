const express = require('express')
const { default: mongoose } = require('mongoose')
const cors = require('cors')
const CategoriesRouter = require('./routes/categories')
const ExpensesRouter = require('./routes/expenses')
require('dotenv').config();

const app = express()
const port = 3000
const user = process.env.db_username;
const password = process.env.db_password;
const dbName = process.env.db_name;

app.use(cors())
app.use(express.json())

app.use('/api/categories', CategoriesRouter)
app.use('/api/expenses', ExpensesRouter)

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Expenses Tracker Server is running' })
})
 
const mongoUri = `mongodb+srv://${user}:${password}@backend.3znrgej.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(mongoUri)
.then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
   
})
.catch((err) => {
    console.log(err)
})
