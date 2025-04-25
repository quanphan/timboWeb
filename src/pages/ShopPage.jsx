
import React, { useEffect, useState } from "react";
import { getProducts, getTypes } from "../services/productService";
const PAGE_SIZE = 10;
const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState(["all"]);
    const [filterType, setFilterType] = useState("all");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const typeData = await getTypes();
                setTypes(["all", ...typeData]);
                await fetchProducts(1, "all", true);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchInitialData();
    }, []);

    const fetchProducts = async (page, type, isReset = false) => {
        try {
            const res = await getProducts({ page, pageSize: PAGE_SIZE, type });
            if (res.length < PAGE_SIZE) setHasMore(false);
            setProducts(prev => isReset ? res : [...prev, ...res]);
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleFilterChange = (type) => {
        setFilterType(type);
        setPage(1);
        setHasMore(true);
        fetchProducts(1, type, true);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchProducts(nextPage, filterType);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">Shop Gỗ Thủ Công</h1>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
                {types.map((type) => (
                    <button
                        key={type}
                        onClick={() => handleFilterChange(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                            filterType === type
                                ? "bg-yellow-500 text-white"
                                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                        }`}
                    >
                        {type.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 shadow-sm bg-white">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">#{product.code}</p>
                        <p className="text-gray-700 mb-3">{product.description}</p>
                        <p className="text-yellow-600 font-bold text-lg mb-2">
                            {product.price.toLocaleString()} ₫
                        </p>
                        <div className="text-sm text-gray-500">Rating: {product.rating} / 5</div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={handleLoadMore}
                        className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopPage;

