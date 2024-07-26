import axios from "axios";

const apiRequest = axios.create({
  // baseURL: "http://localhost:8800/api",
  baseURL: "https://pet-care-hub.onrender.com/api",
  withCredentials: true,
});


apiRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // 或者从其他地方获取token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiRequest;