
import React, { useEffect, useState } from "react";
import { getProducts, getTypes } from "../services/productService";
import Layout from "./Layout";
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
        <Layout>
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

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition duration-300"
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-3"
                        />
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">{product.brand}</h3>
                        <p className="text-xs sm:text-sm text-gray-800 line-clamp-2">{product.name}. <span className="text-gray-700">{product.description}</span> </p>
                        <p className="text-base sm:text-lg font-semibold text-red-600 mt-1">
                            {product.price.toLocaleString()} ₫   <span className="text-[10px] sm:text-xs text-gray-800 mb-2">{product.rating} *</span>
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
                            Delivery <span className="font-semibold">Tuesday, May 27</span>
                        </p>
                        <button className="bg-gray-100 border rounded-full px-3 py-1 text-xs sm:text-sm hover:bg-gray-200">
                            See details
                        </button>
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
       </Layout>
    );
};

export default ShopPage;

