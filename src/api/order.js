import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/orders`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/orders/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/orders`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/orders/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/orders/${id}`),
}