import axiosInstanceWithToken from "../constants/api";
const version = '/v1/admin';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/users`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/users/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/users`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/users/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/users/${id}`),
}