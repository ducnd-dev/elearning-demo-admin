import axiosInstanceWithToken from "../constants/api";
const version = '/v1/admin';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/events`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/events/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/events`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/events/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/events/${id}`),
}