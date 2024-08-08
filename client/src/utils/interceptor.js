import axios from "axios";

export const baseUrl = "http://localhost:5000/api";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 1500000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem("user");
    
    let user;
    if (storedUser) {
      user = JSON.parse(storedUser);
    }
    const token = user?.token;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No token found");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
