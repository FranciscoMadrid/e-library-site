import axios from 'axios';

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
    'Content-Type': 'application/json',
},
    withCredentials: true, 
});

axiosClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
        },
    error => Promise.reject(error)
);


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