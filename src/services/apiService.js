import axios from 'axios';

// Tạo một instance của axios
const api = axios.create({
    baseURL: 'http://localhost:5050/api',
});

//Hàm gọi API để update
const postData = async () => {
    try {
        const response = await api.get('/posts/1');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

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

// ✅ Gán vào một biến trước khi export
const apiService = {
    getData,
};

export default apiService;

