import { axiosInstance } from "../constants/api";
const version = '/v1';

export default {
	signIn: ({ username, password }) => axiosInstance.post(`${version}/auth/login/`, {username, password}),
	register: (data) => axiosInstance.post(`${version}/auth/sign-up/`, data),
	changePassword: (data) => axiosInstance.post(`${version}/auth/change_password/`, data),
	getUser: (token) => axiosInstance.get(`${version}/users/profile`, {
		headers: { Authorization: `Bearer ${token}` }
	}),
}