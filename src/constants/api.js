import axios from 'axios';
const token = localStorage.getItem('token');
export const baseURL = 'https://khanhhung-api.cuongdesign.net/api';
export const urlWeb = 'https://elearning-demo.vercel.app/';
// export const baseURL = 'http://127.0.0.1:8000/api';
const headers = {
    'Content-Type': ' application/json',
    accept: 'application/json',
};

export const axiosInstance = axios.create({
    baseURL,
    headers,
});

const axiosInstanceWithToken = axios.create({
    baseURL,
    headers: {
        ...headers,
        Authorization: `Bearer ${token?.replace(/['"]+/g, '')}`,
    },
});

axiosInstanceWithToken.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 403 && !originalRequest._retry) {
            window.location.href = '/unauthorized';
        }

        if (error.response.status === 401 && !originalRequest._retry) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/auth/signin';
        }
        return {
            success: false,
			msg: error.response?.data.message || 'Something was wrong!',
        };
    }
);

export default axiosInstanceWithToken;

export const LIMIT = 10;

export const defaultURLImage = 'https://static.thenounproject.com/png/4595376-200.png';

// export const mediaURL = 'https://khanhhung-api.cuongdesign.net';
export const mediaURL = 'http://localhost:8000';
