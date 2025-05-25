import createHttp from "./BaseService";

const http = createHttp(true);

export const getCategoriesList = () => http.get("/categories/");
export const getCategoryById = (id) => http.get(`/categories/${id}`);
export const createCategory = (category) => http.post("/categories/", category);
export const deleteCategory = (id) => http.delete(`/categories/${id}`);
export const updateCategory = (id, category) => http.put(`/categories/${id}`, category);

