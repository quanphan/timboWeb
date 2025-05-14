import { useCartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { API_URL } from "../config/api";
import Layout from "./Layout";

export default function YourCartPage() {
    const { items, updateItem, removeItem, total } = useCartContext();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Layout>
        <div className="max-w-7xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6 px-4">🛒 Your Cart</h1>
            <div className="mx-auto px-4 py-10 grid md:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="md:col-span-2">
                    <div className="border border-b-neutral-300 rounded-md p-6">
                        {items.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty.</p>
                        ) : (
                            <div className="space-y-8">
                                {items.map(item => {
                                    const price = Number(item.product?.price || 0);
                                    const totalItemPrice = price * item.quantity;

                                    return (
                                        <div key={item.product._id} className="flex gap-4 border-b pb-6">
                                            <img
                                                src={`${API_URL}${item.product.images?.[0] || item.product.image}`}
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded border"
                                            />
                                            <div className="flex-1">
                                                <h2 className="text-lg font-semibold line-clamp-1">{item.product.name}</h2>
                                                <p className="text-sm text-gray-500 mt-1">Only 6 left • in 19 carts</p>

                                                <div className="flex items-center gap-3 mt-3">
                                                    <div className="w-full flex">
                                                        <select
                                                            value={item.quantity}
                                                            onChange={(e) => updateItem(item.product._id, parseInt(e.target.value))}
                                                            className="border px-2 py-1 rounded"
                                                        >
                                                            {[1, 2, 3, 4, 5].map((n) => (
                                                                <option key={n} value={n}>{n}</option>
                                                            ))}
                                                        </select>

                                                        <button
                                                            onClick={() => removeItem(item.product._id)}
                                                            className="text-sm underline text-red-500 ml-2"
                                                        >Remove</button>
                                                    </div>
                                                    <div className="w-full flex md:justify-end">
                                                        <p className="text-red-500 font-semibold mt-2">
                                                            {totalItemPrice.toLocaleString()} ₫
                                                            <span className="block text-xs text-gray-500">
                                                                ({price.toLocaleString()} ₫ each)
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Summary Panel */}
                <div className="rounded-md p-4  h-fit">
                    <h2 className="text-lg font-bold mb-4">How you'll pay</h2>

                    {/* Payment placeholder */}
                    <div className="flex gap-2 mb-4">
                        <div className="w-5 h-5 border rounded-full border-gray-400"></div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" className="w-8" alt="Visa" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/MasterCard_Logo.svg" className="w-8" alt="MasterCard" />
                    </div>

                    <div className="text-sm space-y-2 mb-4">
                        <div className="flex justify-between">
                            <span>Item(s) total</span>
                            <span>{total.toLocaleString()} ₫</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>Shipping</span>
                            <span>636,000 ₫</span>
                        </div>
                        <hr />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>{(total + 636000).toLocaleString()} ₫</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="mt-4 w-full bg-black text-white font-semibold py-2 rounded hover:bg-gray-800"
                    >
                        Proceed to Checkout
                    </button>

                    <div className="text-xs text-gray-500 mt-3">
                        <p>Local taxes included (where applicable)</p>
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
}
