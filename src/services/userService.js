import axiosInstance from "./axiosInstance";

async function getUsers() {
    const res = await axiosInstance.get("/api/account");
    return res.data;
}

async function updateUser(id, data) {
    const res = await axiosInstance.put(`/api/account/${id}`, data);
    return res.data;
}

async function deleteUser(id) {
    const res = await axiosInstance.delete(`/api/account/${id}`);
    return res.data;
}

export {
    getUsers,
    updateUser,
    deleteUser
};
