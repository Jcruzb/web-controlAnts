import createHttp from "./BaseService";

const http = createHttp(true);

export const getExpensesList = () => http.get("/expenses/");
export const getExpenseName = (id) => http.get(`/expenses/${id}`);
export const createExpense = (expense) => http.post("/expenses/", expense);
export const deleteExpense = (id) => http.delete(`/expenses/${id}`);
export const updateExpense = (id, expense) => http.put(`/expenses/${id}`, expense);