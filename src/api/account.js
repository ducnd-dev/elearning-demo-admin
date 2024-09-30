import axiosInstanceWithToken from "../constants/api";

export default {
	getAccounts: (filter) => axiosInstanceWithToken.get(`/user?page=${filter.currentPage}&size=${filter.size}&search=${filter.search}`),
	updateAccount: (id, data) => axiosInstanceWithToken.put(`/user/${id}`, data),
	deleteAccount: (id) => axiosInstanceWithToken.delete(`/user/${id}`),
	getDetailAccount: (id) => axiosInstanceWithToken.get(`/user/${id}`),
	getApiMappings: () => axiosInstanceWithToken.get(`/api-mapping?size=1000&page=1`),
	userApiMapping: (id) => axiosInstanceWithToken.get(`/api-mapping/assigned-api/${id}`),
}