import { axiosInstance } from "../constants/api";

export default {
	signIn: ({ username, password }) => axiosInstance.post('/auth/login/', {username, password}),
	register: (data) => axiosInstance.post('/auth/sign-up/', data),
	changePassword: (data) => axiosInstance.post('/auth/change_password/', data),
	getUser: (token) => axiosInstance.get('/users/profile', {
		headers: { Authorization: `Bearer ${token}` }
	}),
}