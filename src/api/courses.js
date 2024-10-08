import axiosInstanceWithToken from "../constants/api";
const version = '/v1/admin';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/courses`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/courses/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/courses`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/courses/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/courses/${id}`),
}