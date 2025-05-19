import { useEffect, useState, useCallback } from "react";
import {addToCart, getCart, mergeLocalCartToServer, updateCartItem} from "../services/cartService";

export default function useCart() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadCart = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCart();
            setItems(data.items || data); // nếu backend trả { items }, còn local là []
        } catch (err) {
            console.error("Failed to load cart:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const addItemToCart = async (productId, quantity = 1) => {
        try {
            await addToCart(productId, quantity);
            await loadCart();
        } catch (err) {
            console.error("Add to cart failed", err);
        }
    };

    const updateItem = async (productId, qty) => {
        const data = await updateCartItem(productId,{quantity:qty});
        setItems(data.items || data);
    };

    const removeItem =async (productId) => {
        const data = await updateCartItem(productId);
        setItems(data.items || data);
    };

    const syncCart = async () => {
        await mergeLocalCartToServer();
        await loadCart();
    };

    const total = items.reduce(
        (sum, item) => sum + Number(item.product.price || 0) * item.quantity,
        0
    );

    useEffect(() => {
        loadCart();
    }, [loadCart]);

    return {
        items,
        loading,
        addItemToCart,
        updateItem,
        removeItem,
        total,
        syncCart,
        refresh: loadCart
    };
}
