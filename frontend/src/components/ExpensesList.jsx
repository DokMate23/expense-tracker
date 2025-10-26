import { useCallback } from 'react';
import { getCategories } from '../services/Services.js';
import './ExpensesList.css';

const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });


export default function ExpensesList({ expenses, categories }) {

    const getCategoryName = useCallback((categoryId) => {
        const category = categories.find((c) => c._id === categoryId);
        return category?.name || "Unknown"  ;
    }, [categories]);

    return (
        <table className='expenses-table'>
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id}>
                        <td>{getCategoryName(expense.categoryId)}</td>
                        <td>${expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>{formatDate(expense.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
