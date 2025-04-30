import imageCompression from 'browser-image-compression';
import {uploadImage} from "../../services/uploadService";
import {API_URL} from "../../config/api";
import SelectField from "../../components/SelectField";

export default function AddProductForm({ newProduct, onChange, onSubmit, typeOptions, brandOptions }) {
    const backendUrl = API_URL;
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };

            const compressedFile = await imageCompression(file, options);

            // 👉 Gắn lại tên gốc
            const finalFile = new File([compressedFile], file.name, { type: compressedFile.type });

            const uploaded = await uploadImage(finalFile);
            console.log(uploaded.url);
            onChange('image', uploaded.url);
        } catch (error) {
            console.error('Image upload error:', error);
        }
    };


    return (
        <form className="grid md:grid-cols-2 gap-4 mb-8" onSubmit={onSubmit}>
            {['code', 'name', 'description', 'price', 'rating'].map((field) => (
                <input
                    key={field}
                    type="text"
                    placeholder={field.toUpperCase()}
                    value={newProduct[field]}
                    onChange={(e) => onChange(field, e.target.value)}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                />
            ))}

            {/* Upload Image */}
            <div className="flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-600">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    required
                />

                {newProduct.image?.length > 0 ? (
                    <img src={`${backendUrl}${newProduct.image}`} alt="Preview" className="w-24 h-24 object-cover rounded mt-2" />
                ) : null}
            </div>

            {/* Combo box Type */}
            <SelectField
                label="Type"
                value={newProduct.type}
                options={typeOptions}
                onChange={(value) => onChange('type', value)}
                required
            />

            {/* Combo box Brand */}
            <SelectField
                label="Brand"
                value={newProduct.brand}
                options={brandOptions}
                onChange={(value) => onChange('brand', value)}
                required
            />

            <div className="md:col-span-2 flex justify-end">
                <button
                    type="submit"
                    className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded transition"
                >
                    Add Product
                </button>
            </div>
        </form>
    );
}
