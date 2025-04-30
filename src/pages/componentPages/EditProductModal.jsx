export default function EditProductModal({ product, onClose, onSave, onChange }) {
    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Product</h2>

                <div className="space-y-4">
                    {['code', 'name', 'image', 'description', 'price', 'rating'].map((field) => (
                        <input
                            key={field}
                            type="text"
                            placeholder={field.toUpperCase()}
                            value={product[field]}
                            onChange={(e) => onChange(field, e.target.value)}
                            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    ))}

                    <select
                        value={product.type}
                        onChange={(e) => onChange('type', e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    >
                        <option value="">Select Type</option>
                        {['ghe', 'ban', 'ke', 'tu', 'giuong', 'den', 'khac'].map((type) => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    <select
                        value={product.brand}
                        onChange={(e) => onChange('brand', e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        required
                    >
                        <option value="">Select Brand</option>
                        {['Rockler', 'Ikea', 'Muji', 'WoodCraft', 'Ashley', 'Other'].map((brand) => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>

                </div>

                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
