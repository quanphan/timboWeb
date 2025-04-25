import axios from "./axiosInstance";

export async function getProducts({ page, pageSize, type }) {
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

export async function getTypes() {
    const res = await axios.get("/api/products/types");
    return res.data;
}
