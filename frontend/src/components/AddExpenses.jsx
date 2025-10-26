import { addExpense } from "../services/Services";

export default function AddExpenses({ categories, onNewExpense }) {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        categoryId: e.target.category.value,
        amount: Number(e.target.amount.value),
        description: e.target.description.value,
      };

      const res = await addExpense(payload);
      if (onNewExpense) onNewExpense(res.data.data);
      e.target.reset();
    } catch (err) {
      console.error("Error adding expense:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="category">Category</label>
        <select required id="category" name="category">
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="amount">Amount</label>
        <input required type="number" step="any" min="0" id="amount" name="amount" />
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <input required type="text" id="description" name="description" />
      </div>

      <button type="submit">Add Expense</button>
    </form>
  );
}
