
import { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';
import Layout from './Layout';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
export default function ProductDetailPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const filters = location.state?.filters;
    const page = location.state?.page;

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Failed to fetch product:", err);
            }
        };
        fetch();
    }, [id]);

    if (!product) return <Layout><div className="text-center py-20">Loading...</div></Layout>;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto px-4 py-10">
                <button
                    onClick={() => navigate('/shop', { state: { filters, page } })}
                    className="text-orange-500 text-sm mb-4 hover:underline"
                >
                    ← Back to Shop
                </button>
                <div className="grid md:grid-cols-2 gap-6">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-auto object-contain rounded"
                    />
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-600 mb-2">#{product.code}</p>
                        <p className="text-xl font-semibold text-red-600 mb-4">
                            {product.price.toLocaleString()} ₫
                        </p>
                        <p className="text-gray-700 mb-4">{product.description}</p>
                        <p className="text-sm text-gray-500 mb-1">Brand: {product.brand}</p>
                        <p className="text-sm text-gray-500 mb-4">Type: {product.type}</p>
                        <p className="text-sm text-yellow-600">Rating: {product.rating} ★</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
