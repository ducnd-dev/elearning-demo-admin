import axiosInstanceWithToken from "../constants/api";
const version = '/v1/admin';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/settings`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/settings/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/settings`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/settings/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/settings/${id}`),
}