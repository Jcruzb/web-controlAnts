import createHttp from "./BaseService";

const http = createHttp(true);

export const getPurchaseList = () => http.get("/purchase/");
export const gePurchaseName = (id) => http.get(`/purchase/${id}`);
export const creatPurchase = (debt) => http.post("/purchase/", debt);
export const deletPurchase = (id) => http.delete(`/purchase/${id}`);
export const updatPurchase = (id, debt) => http.put(`/purchase/${id}`, debt);