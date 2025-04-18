import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config/api";
import { refreshToken } from "./authService";

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
// Interceptor request tự đính Authorization và check token
axiosInstance.interceptors.request.use(async (config) => {
    let token = localStorage.getItem("token");

    if (token) {
        try {
            const decoded = jwtDecode(token);
            const now = Date.now() / 1000; // thời gian hiện tại (giây)

            // Nếu token còn < 2 phút sẽ tự refresh
            if (decoded.exp - now < 120) {
                token = await refreshToken(); // lấy token mới
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
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            window.location.href = "/"; // tự logout
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
