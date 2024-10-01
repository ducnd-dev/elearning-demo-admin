import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
	getAccounts: (filter) => axiosInstanceWithToken.get(`${version}/user?page=${filter.currentPage}&size=${filter.size}&search=${filter.search}`),
	updateAccount: (id, data) => axiosInstanceWithToken.put(`${version}/user/${id}`, data),
	deleteAccount: (id) => axiosInstanceWithToken.delete(`${version}/user/${id}`),
	getDetailAccount: (id) => axiosInstanceWithToken.get(`${version}/user/${id}`),
	getApiMappings: () => axiosInstanceWithToken.get(`${version}/api-mapping?size=1000&page=1`),
	userApiMapping: (id) => axiosInstanceWithToken.get(`${version}/api-mapping/assigned-api/${id}`),
}