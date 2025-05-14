const KEY = "cart";

export function getLocalCart() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
        return [];
    }
}

export function setLocalCart(cart) {
    localStorage.setItem(KEY, JSON.stringify(cart));
}

export function clearLocalCart() {
    localStorage.removeItem(KEY);
}
