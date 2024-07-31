import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

const apiBase = axios.create({
    baseURL: `${baseURL}`,  // Ensure this matches your backend HTTP URL
    headers: {
        'Content-Type': 'application/json'
    }
});

const apiUpload = axios.create({
    baseURL: `${baseURL}`,  // Ensure this matches your backend HTTP URL
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

apiBase.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("Request Config:", config);
    return config;
}, (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
});
apiUpload.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("Request Config:", config);
    return config;
}, (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
});
apiBase.interceptors.response.use(response => {
    console.log("Response:", response);
    return response;
}, error => {
    console.error("Response Error:", error);
    return Promise.reject(error);
});

export function removeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
}
export const uploadAxios = apiUpload;
export default apiBase;