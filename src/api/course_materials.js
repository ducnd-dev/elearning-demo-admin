import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
    gets: (params) => axiosInstanceWithToken.get(`${version}/course_materials`, { params }),
    get: (id) => axiosInstanceWithToken.get(`${version}/course_materials/${id}`),
    create: (data) => axiosInstanceWithToken.post(`${version}/course_materials`, data),
    update: (id, data) => axiosInstanceWithToken.put(`${version}/course_materials/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`${version}/course_materials/${id}`),
}