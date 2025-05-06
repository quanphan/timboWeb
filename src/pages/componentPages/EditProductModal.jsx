import { useEffect, useState } from 'react';
import SelectField from '../../components/SelectField';
import TinyMCEEditor from '../../components/TinyMCEEditor';
import { uploadImage } from '../../services/uploadService';
import PriceInput from "../../components/PriceInput";
import {API_URL} from "../../config/api";

export default function EditProductModal({ product, onClose, onSave, onChange }) {
    const typeOptions = ['ghe', 'ban', 'ke', 'tu', 'giuong', 'den', 'khac'];
    const brandOptions = ['Rockler', 'Ikea', 'Muji', 'WoodCraft', 'Ashley', 'Other'];
    const backendUrl = API_URL;
    const [detail, setDetail] = useState('');
    const [imageFiles, setImageFiles] = useState([]);

    useEffect(() => {
        if (product) {
            setDetail(product.descriptionDetail || '');
            setImageFiles(product.images || []);
        }
    }, [product]);

    const handleImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 10 - imageFiles.length;

        if (files.length > remainingSlots) {
            alert(`Bạn chỉ có thể thêm tối đa ${remainingSlots} ảnh nữa.`);
            return;
        }

        try {
            const uploadedUrls = [];

            for (const file of files) {
                const result = await uploadImage(file); // { url: '/uploads/xxx.jpg' }
                uploadedUrls.push(result.url);
            }

            const updated = [...imageFiles, ...uploadedUrls];
            setImageFiles(updated);
            onChange('images', updated);
        } catch (error) {
            console.error('Upload image failed:', error);
            alert('Không thể upload ảnh. Vui lòng thử lại.');
        }
    };

    const removeImage = (url) => {
        const updated = imageFiles.filter(img => img !== url);
        setImageFiles(updated);
        onChange('images', updated);
    };

    const handleDetailChange = (value) => {
        setDetail(value);
        onChange('descriptionDetail', value);
    };

    if (!product) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Edit Product</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="CODE"
                            value={product.code}
                            onChange={(e) => onChange('code', e.target.value)}
                            className="w-full md:w-1/4 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                        <input
                            type="text"
                            placeholder="NAME"
                            value={product.name}
                            onChange={(e) => onChange('name', e.target.value)}
                            className="w-full md:w-3/4 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <SelectField
                            label=""
                            value={product.type}
                            options={typeOptions}
                            onChange={(val) => onChange('type', val)}
                            className="w-full md:w-1/2"
                        />

                        <SelectField
                            label=""
                            value={product.brand}
                            options={brandOptions}
                            onChange={(val) => onChange('brand', val)}
                            className="w-full md:w-1/2"
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <input
                        type="text"
                        placeholder="DESCRIPTION"
                        value={product.description}
                        onChange={(e) => onChange('description', e.target.value)}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div className="flex flex-col md:flex-row gap-4">
                        {/* PRICE */}
                        <PriceInput
                            value={product.price}
                            onChange={(value) => onChange('price', value)}
                            unit="$"
                            className="w-full md:w-1/2"
                        />

                        {/* RATING */}
                        <input
                            type="number"
                            placeholder="RATING"
                            value={product.rating}
                            onChange={(e) => onChange('rating', e.target.value)}
                            className="w-full md:w-1/2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>
                </div>

                {/* Upload images */}
                <div className="mt-6">
                    <label className="block text-sm font-semibold mb-1">Upload Images (max 10):</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImagesChange}
                        className="mb-2"
                    />
                    <div className="flex flex-wrap gap-2">
                        {imageFiles.map((url, index) => (
                            <div key={url + index} className="relative">
                                <img src={`${backendUrl}${url}`} alt={`img-${index}`} className="w-16 h-16 object-cover rounded" />
                                <button
                                    onClick={() => removeImage(url)}
                                    className="absolute top-0 right-0 text-xs bg-red-600 text-white rounded-full px-1"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rich Text Editor */}
                <div className="mt-6">
                    <TinyMCEEditor label="Product Detail" value={detail} onChange={handleDetailChange} />
                </div>

                <div className="flex justify-end mt-6 gap-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave({ ...product, images: imageFiles, descriptionDetail: detail })}
                        className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
