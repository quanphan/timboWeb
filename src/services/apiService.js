import axios from "./axiosInstance";


export async function sendMessage(data) {
    try {
        const res = await axios.post("api/contact", data);
        return res.data;
    } catch (error) {
        if (error.response) {
            // Lỗi từ server (400, 422, 500, ...)
            throw new Error(error.response.data.error || 'Server Error');
        } else if (error.request) {
            // Không kết nối được server
            throw new Error('No response from server');
        } else {
            // Các lỗi khác
            throw new Error(error.message || 'Unexpected Error');
        }
    }
}

// Nếu cần thêm:
export async function getMessageList(page = 1, limit = 5) {
    try {
        const res = await axios.get(`api/contact?page=${page}&limit=${limit}`);
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Server Error');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error(error.message || 'Unexpected Error');
        }
    }
}

export async function deleteMessage(id) {
    try {
        const res = await axios.delete(`api/contact/${id}`);
        return res.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Server Error');
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error(error.message || 'Unexpected Error');
        }
    }
}
