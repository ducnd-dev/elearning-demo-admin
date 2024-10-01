import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/course-materials`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/course-materials/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/course-materials`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/course-materials/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/course-materials/${id}`),
}