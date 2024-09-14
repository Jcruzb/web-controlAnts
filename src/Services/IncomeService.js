import createHttp from "./BaseService";

const http = createHttp(true);

export const getIncomesList = () => http.get("/incomes/")
export const createIncome = (income) => http.post("/incomes/", income);
export const deleteIncome = (id) => http.delete(`/incomes/${id}`);
export const updateIncome = (id, income) => http.put(`/incomes/${id}`, income);
export const getIncome = (id) => http.get(`/incomes/${id}`);

