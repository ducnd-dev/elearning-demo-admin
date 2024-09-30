import axiosInstanceWithToken from "../constants/api";

export default {
    gets: (params) => axiosInstanceWithToken.get(`/course-materials`, { params }),
    get: (id) => axiosInstanceWithToken.get(`/course-materials/${id}`),
    create: (data) => axiosInstanceWithToken.post(`/course-materials`, data),
    update: (id, data) => axiosInstanceWithToken.put(`/course-materials/${id}`, data),
    delete: (id) => axiosInstanceWithToken.delete(`/course-materials/${id}`),
}