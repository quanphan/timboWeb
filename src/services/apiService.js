import axios from 'axios';

// Tạo một instance của axios
const api = axios.create({
    baseURL: 'http://localhost:5050/api',
});

// Hàm gọi API để lấy dữ liệu
const getData = async () => {
    try {
        const response = await api.get('/posts/1');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export default {
    getData,
};
