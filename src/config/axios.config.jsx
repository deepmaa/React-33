import axios from "axios";

// console.log(import.meta.env.)
const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 30000,
	timeoutErrorMessage: "Server Timed out ...",
	responseType: "json",
	headers: {
		"Content-Type": "application/json"
	}
})

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(exception) => {
		if (+exception.status === 400 || +exception.status === 422) {
			throw exception.response
		} else if (+exception.status === 401) {
			throw exception.response
		} else if (+exception.status === 403) {
			throw exception.response
		} else if (+exception.status === 404) {
			throw exception.response
		} else {
			throw exception
		}
	}
)

export default axiosInstance