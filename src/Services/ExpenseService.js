import createHttp from "./BaseService";

const http = createHttp(true);

export const getExpensesList = () => http.get("/expenses/");
export const getExpenseById = (id) => http.get(`/expenses/${id}`);
export const createExpense = (expense) => http.post("/expenses/", expense);
export const deleteExpense = (id) => http.delete(`/expenses/${id}`);
export const updateExpense = (id, expense) => http.put(`/expenses/${id}`, expense);
export const getExpensesByMonth = (month, year) => http.get(`/expenses/by-month?month=${month}&year=${year}`);
  