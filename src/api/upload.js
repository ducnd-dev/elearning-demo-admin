import axiosInstanceWithToken from "../constants/api";
const version = '/v1';
export default {
	uploadImage: (data) => axiosInstanceWithToken.post(`${version}/upload_image-to-s3`, data, {headers: {'Content-Type': 'multipart/form-data'}}),
	uploadFile: (data) => axiosInstanceWithToken.post(`${version}/upload`, data, {headers: {'Content-Type': 'multipart/form-data'}}),
}