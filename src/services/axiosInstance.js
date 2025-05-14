import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config/api";
import {refreshToken} from "./authService";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
axiosInstance.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // (giây)

            // Nếu token còn < 2 phút sẽ tự refresh
            if (decoded.exp - now < 120) {
                token = await refreshToken(); // token mới
            }

            config.headers.Authorization = `Bearer ${token}`;
        } catch (err) {
            console.error("Lỗi khi decode token:", err);
        }
    }

    return config;
}, (error) => Promise.reject(error));

// Interceptor response tự bắt lỗi 401
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");

            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
