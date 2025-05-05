import { useEffect, useState } from 'react';
import { getProductsAdmin, addProduct, deleteProduct, updateProduct } from '../services/productService';
import { toast } from 'react-hot-toast';
import EditProductModal from './componentPages/EditProductModal';
import AddProductForm from './componentPages/AddProductForm';
import { API_URL } from "../config/api";
import SelectField from "../components/SelectField";

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [newProduct, setNewProduct] = useState({
        code: '', name: '', image: '', description: '', price: '', rating: '', type: '', brand: ''
    });
    const [editProduct, setEditProduct] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [filterBrand, setFilterBrand] = useState('all');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const limit = 5;
    const typeOptions = ['ghe', 'ban', 'ke', 'tu', 'giuong', 'den', 'khac'];
    const brandOptions = ['Rockler', 'Ikea', 'Muji', 'WoodCraft', 'Ashley', 'Other'];
    const backendUrl = API_URL;

    useEffect(() => {
        fetchProducts();
    }, [page, filterType, filterBrand]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { products = [], total = 0 } = await getProductsAdmin({
                page,
                limit,
                type: filterType,
                brand: filterBrand,
            });

            console.log("Fetched raw data:", products, total);
            setProducts(products);
            setTotalProducts(total);
        } catch (error) {
            toast.error('Failed to load products');
            setProducts([]);
            setTotalProducts(0);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            await addProduct(newProduct);
            toast.success('Product added!');
            setNewProduct({ code: '', name: '', image: '', description: '', price: '', rating: '', type: '', brand: '' });
            fetchProducts();
        } catch (error) {
            toast.error('Failed to add product');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure to delete this product?')) {
            try {
                await deleteProduct(id);
                toast.success('Deleted successfully!');
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete product');
            }
        }
    };

    const handleEditSave = async (updatedProduct) => {
        try {
            await updateProduct(updatedProduct.id, updatedProduct);
            toast.success('Product updated!');
            setEditProduct(null);
            fetchProducts();
        } catch (error) {
            toast.error('Failed to update product');
        }
    };

    const handleEditChange = (field, value) => {
        setEditProduct((prev) => ({ ...prev, [field]: value }));
    };

    const totalPages = Math.ceil(totalProducts / limit);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Products Management</h2>

            {/* Form Add */}
            <AddProductForm
                newProduct={newProduct}
                onChange={(field, value) => setNewProduct((prev) => ({ ...prev, [field]: value }))}
                onSubmit={handleAdd}
                typeOptions={typeOptions}
                brandOptions={brandOptions}
            />

            {/* Filter */}
            <div className="flex flex-wrap gap-4 mb-6">
                <SelectField
                    label="Type"
                    value={filterType}
                    options={['all', ...typeOptions]}
                    onChange={(value) => { setFilterType(value); setPage(1); }}
                />
                <SelectField
                    label="Brand"
                    value={filterBrand}
                    options={['all', ...brandOptions]}
                    onChange={(value) => { setFilterBrand(value); setPage(1); }}
                />
            </div>

            {/* Table */}
            <div className="overflow-x-auto shadow-md rounded-lg mt-6">
                {loading ? (
                    <div className="text-center py-8 text-gray-500">Loading...</div>
                ) : products.length > 0 ? (
                    <table className="min-w-full text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 uppercase">
                        <tr>
                            <th className="py-3 px-4">Image</th>
                            <th className="py-3 px-4">Code</th>
                            <th className="py-3 px-4">Name</th>
                            <th className="py-3 px-4">Price</th>
                            <th className="py-3 px-4">Type</th>
                            <th className="py-3 px-4">Brand</th>
                            <th className="py-3 px-4">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {products.map((p) => (
                            <tr key={p.id} className="border-b">
                                <td className="py-2 px-4">
                                    <img
                                        src={p.image.startsWith('./img') ? p.image : `${backendUrl}${p.image}`}
                                        alt={p.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4">{p.code}</td>
                                <td className="py-2 px-4">{p.name}</td>
                                <td className="py-2 px-4">{Number(p.price).toLocaleString()}₫</td>
                                <td className="py-2 px-4">{p.type}</td>
                                <td className="py-2 px-4">{p.brand}</td>
                                <td className="py-2 px-4 flex flex-col gap-2">
                                    <button
                                        onClick={() => setEditProduct(p)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-3 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-8 text-gray-500">No products found.</div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-gray-700 text-sm">Page {page} of {totalPages}</span>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Edit Modal */}
            <EditProductModal
                product={editProduct}
                onClose={() => setEditProduct(null)}
                onSave={handleEditSave}
                onChange={(field, value) =>
                    setEditProduct((prev) => ({ ...prev, [field]: value }))
                }
            />
        </div>
    );
}
