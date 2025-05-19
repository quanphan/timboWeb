import axiosInstance from "./axiosInstance";
import {getProductById} from "./productService";

function isLoggedIn() {
    return !!localStorage.getItem("accessToken");
}

// Gọi API add to cart nếu login
async function addToCart(productId, quantity = 1) {
    const product = await getProductById(productId);
    if (isLoggedIn()) {
        // Logged in → call backend API
        const res = await axiosInstance.post("/api/cart", { productId, quantity });
        if(res)
        {
            res.data.product=product;
        }
        return res.data;

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
        const res = await axiosInstance.get("/api/cart");
        return res.data;
    } else {
        return JSON.parse(localStorage.getItem("cart") || "[]");
    }
}

// Hàm merge cart local lên server sau khi login
async function mergeLocalCartToServer() {
    const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (localCart.length === 0) return;

    await axiosInstance.post("/api/cart/merge", { items: localCart });
    localStorage.removeItem("cart");
}

async function updateCartItem(id, data) {
    if (isLoggedIn()) {
        const res = await axiosInstance.put(`/api/cart/${id}`, data);
        return res.data;
    } else {
        let qty=data.quantity
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const index = cart.findIndex((item) => item.productId === id);
        if (index >= 0) {
            cart[index].quantity = qty;
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart || [];
    }
}

async function deleteCartItem(id) {
    if (isLoggedIn()) {
        const res = await axiosInstance.delete(`/api/cart/${id}`);
        return res.data;
    }
    else {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const index = cart.findIndex((item) => item.productId === id);
        if (index >= 0) {
            cart.removeItem(index);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        return cart || [];
    }
}

export {
    addToCart,
    getCart,
    updateCartItem,
    deleteCartItem,
    mergeLocalCartToServer
};


