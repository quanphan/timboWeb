import axiosInstance from "./axiosInstance";
import axiosRefreshInstance from "./axiosRefreshInstance";

async function login(email, password) {
    const res = await axiosInstance.post("/api/auth/login", { email, password });

    const { accessToken, refreshToken } = res.data;

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return accessToken;
}

async function getProfile() {
    const res = await axiosInstance.get("/api/account/me");
    return res.data;
}

async function register(email, password) {
    const res = await axiosInstance.post("/api/auth/register", { email, password });
    return res.data;
}

async function googleLogin(credential) {
    const res = await axiosInstance.post("/api/auth/google-login", { credential });
    return res.data.token;
}

async function refreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token");

    const res = await axiosRefreshInstance.post("/api/auth/refresh", { refreshToken }); // 👈 dùng axiosRefreshInstance
    const { accessToken } = res.data;

    localStorage.setItem("token", accessToken);

    return accessToken;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
}

export {
    login,
    getProfile,
    register,
    refreshToken,
    logout,
    googleLogin,
};
