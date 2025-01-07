import createHttp from "./BaseService";

const http = createHttp(true);

export const getProgramsList = () => http.get("/programs/");
export const getProgramName = (id) => http.get(`/programs/${id}`);
export const createProgram = (program) => http.post("/programs/", program);
export const deleteProgram = (id) => http.delete(`/programs/${id}`);
export const updateProgram = (id, program) => http.put(`/programs/${id}`, program);
export const getProgramByDate = (familyId, month, year) => http.post('/programs/program/family/date', { familyId, month, year });


