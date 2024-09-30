import axiosInstanceWithToken from "../constants/api";

export default {
	uploadImage: (data) => axiosInstanceWithToken.post(`/upload_image-to-s3`, data, {headers: {'Content-Type': 'multipart/form-data'}}),
}