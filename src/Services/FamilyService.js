import createHttp from './BaseService';

const http = createHttp(true);

export const getFamilyMembers = (id) => http.get(`/family/${id}`);