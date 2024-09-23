import createHttp from "./BaseService";

const http = createHttp(true);

export const getDebtsList = () => http.get("/debts/");
export const getDebtbyId = (id) => http.get(`/debts/${id}`);
export const createDebt = (debt) => http.post("/debts/", debt);
export const deleteDebt = (id) => http.delete(`/debts/${id}`);
export const updateDebt = (id, debt) => http.put(`/debts/${id}`, debt);
