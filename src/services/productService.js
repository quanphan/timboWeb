import axios from "./axiosInstance";

export async function getProducts1({ page, pageSize, type }) {
    const params = {
        page,
        pageSize,
    };
    if (type && type !== "all") {
        params.type = type;
    }

    const res = await axios.get("/api/products", { params });
    return res.data;
}
export const getProducts = async ({ page = 1, pageSize = 10, type = 'all', brand = 'all', search = '' }) => {
    try {
        const res = await axios.get('/api/products', {
            params: { page, pageSize, type, brand, search },
        });
        return res.data; // { products: [], total: number }
    } catch (err) {
        console.error("Error fetching products:", err);
        return { products: [], total: 0 };
    }
};

export const getProductById = async (id) => {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
};

export async function getTypes() {
    const res = await axios.get("/api/products/types");
    return res.data;
}

export async function getProductsAdmin1() {
    const res = await axios.get('/api/products/admin');
    return res.data;
}
export async function getProductsAdmin({ page = 1, limit = 5, type = 'all', brand = 'all' }) {
    const res = await axios.get('/api/products/admin', {
        params: { page, limit, type, brand }
    });
    return res.data;
}

export async function addProduct(data) {
    const res = await axios.post('/api/products', data);
    return res.data;
}

export async function deleteProduct(id) {
    const res = await axios.delete(`/api/products/${id}`);
    return res.data;
}
export async function updateProduct(id, data) {
    const res = await axios.put(`/api/products/${id}`, data);
    return res.data;
}
