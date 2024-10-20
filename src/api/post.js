import axiosInstanceWithToken from "../constants/api";
const version = '/v1/admin';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/blogs`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/blogs/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/blogs`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/blogs/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/blogs/${id}`),
}