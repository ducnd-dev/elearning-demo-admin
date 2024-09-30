import axiosInstanceWithToken from "../constants/api";

export default {
	createExpert: (data) => axiosInstanceWithToken.post(`/experts`, data),
	getExperts: (filter) => axiosInstanceWithToken.get(`/experts/?order_by=${filter.sortBy}&order=${filter.order}&page=${filter.currentPage}&size=${filter.size}&search=${filter.search}`),
	updateExpert: (id, data) => axiosInstanceWithToken.put(`/experts/${id}`, data),
	deleteExpert: (id) => axiosInstanceWithToken.delete(`/experts/${id}`),
	getDetailExpert: (id) => axiosInstanceWithToken.get(`/experts/${id}`),
}