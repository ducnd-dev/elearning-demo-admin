import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/categories`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/categories/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/categories`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/categories/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/categories/${id}`),
}