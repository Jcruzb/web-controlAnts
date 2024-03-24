import createHttp from "./BaseService";

const http = createHttp(true);

export const getMovementsList = () => http.get("/movement/");
export const getMovementName = (id) => http.get(`/movement/${id}`);
export const createMovement = (debt) => http.post("/movement/", debt);
export const deleteMovement = (id) => http.delete(`/movement/${id}`);
export const updateMovement = (id, debt) => http.put(`/movement/${id}`, debt);