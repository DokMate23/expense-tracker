
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",  
});

export const getExpenses = () => API.get("/expenses");
export const getCategories = () => API.get("/categories");
export const addExpense = (expense) => API.post("/expenses", expense);
export const addCategory = (category) => API.post("/categories", category);