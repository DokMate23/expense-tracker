import './App.css'
import { useState, useCallback, useEffect } from 'react';
import { getExpenses , getCategories} from './services/Services';
import ExpensesList from './components/ExpensesList';
import AddExpenses from './components/AddExpenses';
import CategoryList from './components/CategoryList';
import AddCategory from './components/AddCategory';

function Expenses({categories}) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const expensesRes = await getExpenses();
        setExpenses(expensesRes.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="expenses-section">
      <div className="add-form-container">
        <h2>Add Expense</h2>
          <AddExpenses
            categories={categories}
            onNewExpense={(newExpense) => setExpenses([...expenses, newExpense])}
          />
      </div>
      <div>
        <div className="list-container">
          <h2>Expenses</h2>
          <ExpensesList expenses={expenses} categories={categories}/>
        </div>
      </div>
    </div>
  )
}

function Categories({categories, onNewCategory}) {
  return (
    <div className="categories-section">
      <div className="add-form-container">
        <AddCategory onNewCategory={onNewCategory}/>
      </div>
      <div className="list-container">
        <CategoryList categories={categories}/>
      </div>
    </div>
  )
}


function App() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesRes = await getCategories();
        setCategories(categoriesRes.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const newCategoryHandler = useCallback((category) => setCategories(c => [...c, category]), []);

  return (
    <div className="app">
      <h1>Expenses Tracker</h1>
      <div className="main-container">
        <Expenses categories={categories}/>
        <Categories categories={categories} onNewCategory={newCategoryHandler} />
      </div>
    </div>
  )
}

export default App
