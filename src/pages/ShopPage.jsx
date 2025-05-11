import React, { useEffect, useState } from "react";
import {getBrands, getProducts, getTypes} from "../services/productService";
import Layout from "./Layout";
import ShopFilterBar from "./componentPages/ShopFilterBar";
import { Link, useLocation } from 'react-router-dom';
import {API_URL} from "../config/api";

const PAGE_SIZE = 10;
const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [types, setTypes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({ type: 'all', brand: 'all', search: '' });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const location = useLocation();
    const backendUrl = API_URL;

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const typeData = await getTypes();
                const brandData = await getBrands();
                const productData = await getProducts({ page: 1, pageSize: PAGE_SIZE });

                setTypes(typeData);
                setBrands(brandData);

                const restoredFilters = location.state?.filters;
                const restoredPage = location.state?.page;

                if (restoredFilters) {
                    setFilters(restoredFilters);
                    setPage(restoredPage || 1);
                    applyFilter(restoredPage || 1, restoredFilters, true);
                } else {
                    applyFilter(1, filters, true);
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchInitialData();
    }, []);

    const applyFilter = async (pageNumber, currentFilters, reset = false) => {
        try {
            const res = await getProducts({
                page: pageNumber,
                pageSize: PAGE_SIZE,
                type: currentFilters.type,
                brand: currentFilters.brand,
                search: currentFilters.search,
                sort: currentFilters.sort,
            });

            if (res.products.length < PAGE_SIZE) setHasMore(false);

            setProducts(prev => reset ? res.products : [...prev, ...res.products]);
            setTotalProducts(res.total); // dùng để tính tổng trang nếu cần
        } catch (err) {
            console.error("Error fetching products:", err);
            setProducts([]);
        }
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
        setHasMore(true);
        applyFilter(1, newFilters, true);
    };

    const handleLoadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        applyFilter(nextPage, filters);
    };

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-10">
                <h1 className="text-3xl font-bold text-center mb-8">TimboCraft Shop</h1>

                <ShopFilterBar
                    filters={filters}
                    onChange={handleFilterChange}
                    types={types}
                    brands={brands}
                />

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex flex-col items-center text-center bg-white rounded-lg shadow-sm p-3 sm:p-4 hover:shadow-md transition duration-300"
                        >
                            <img
                                src={product.image.startsWith('./img') ? product.image : `${backendUrl}${product.image}`}
                                alt={product.name}
                                className="w-20 h-20 sm:w-28 sm:h-28 object-contain mb-3"
                            />
                            <h3 className="text-sm sm:text-base font-bold text-gray-900">{product.brand}</h3>
                            <p className="text-xs sm:text-sm text-gray-800 line-clamp-2">
                                {product.name}. <span className="text-gray-700">{product.description}</span>
                            </p>
                            <p className="text-base sm:text-lg font-semibold text-red-600 mt-1">
                                {product.price.toLocaleString()} ₫   <span className="text-[10px] sm:text-xs text-gray-800 mb-2">{product.rating} *</span>
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
                                Delivery <span className="font-semibold">Tuesday, May 27</span>
                            </p>
                            <Link
                                to={`/product/${product.id}`}
                                state={{ filters, page }} // gửi kèm filters + page hiện tại
                                className="bg-gray-100 border rounded-full px-3 py-1 text-xs sm:text-sm hover:bg-gray-200"
                            >
                                View Detail
                            </Link>
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
