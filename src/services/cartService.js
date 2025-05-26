import axiosInstance from "./axiosInstance";
import {getProductById} from "./productService";
import { jwtDecode } from "jwt-decode";

function isLoggedIn() {
    return !!localStorage.getItem("accessToken");
}

function getUserIdFromToken() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded?.id || null;
    } catch {
        return null;
    }
}

// Gọi API add to cart nếu login
async function addToCart(productId, quantity = 1) {
    const product = await getProductById(productId);
    if (isLoggedIn()) {
        // Logged in → call backend API
        const userId = getUserIdFromToken();
        const res = await axiosInstance.post("/api/cart", { userId, productId, quantity });
        if (res?.data) {
            res.data.product = product;
            return res.data;
        }

    } else {
        // Chưa login → lưu localStorage
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const index = cart.findIndex((item) => item.productId === productId);
        if (index >= 0) {
            cart[index].quantity += quantity;
            if(!cart[index].product)
            {
                cart[index].product=product;
            }
        } else {
            cart.push({ productId, quantity, product: product });
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return { local: true, cart };
    }
}

// Lấy cart hiện tại
async function getCart() {
    if (isLoggedIn()) {
        const userId = getUserIdFromToken();
        const res = await axiosInstance.get(`/api/cart/${userId}`);
        return res.data;
    } else {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }
}

// Hàm merge cart local lên server sau khi login
async function mergeLocalCartToServer() {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const userId = getUserIdFromToken();
    if (!userId || localCart.length === 0) return;

    const items = localCart.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));

    await axiosInstance.post("/api/cart/merge", { userId, items });
    localStorage.removeItem("cart");
}

async function updateCartItem(productId, { quantity }) {
    if (isLoggedIn()) {
        const userId = getUserIdFromToken();
        const res = await axiosInstance.post("/api/cart", { userId, productId, quantity }); // dùng lại POST
        return res.data;
    } else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const index = cart.findIndex((item) => item.productId === productId);

        if (index >= 0) cart[index].quantity = quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
    }
}

async function deleteCartItem(productId) {
    if (isLoggedIn()) {
        const userId = getUserIdFromToken();
        const res = await axiosInstance.delete(`/api/cart/${userId}/${productId}`);
        return res.data;
    }
    else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const index = cart.findIndex((item) => item.productId === productId);
        if (index >= 0) cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart;
    }
}

export {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
    mergeLocalCartToServer
};


