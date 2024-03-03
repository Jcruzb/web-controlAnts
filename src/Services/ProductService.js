import createHttp from "./BaseService";

const http = createHttp(true);

export const getProductsList = () => http.get("/products/");
export const getProductName = (id) => http.get(`/products/${id}`);
export const createProduct = (product) => http.post("/products/", product);
export const deleteProduct = (id) => http.delete(`/products/${id}`);
export const updateProduct = (id, product) => http.put(`/products/${id}`, product);

