// axiosInstance.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.response.use(
    response => response,
    error => {
    const { response } = error;


    if (response?.status === 404) {

        return Promise.resolve({ data: null });
    }

    return Promise.reject(error);
}
);

export default axiosClient;