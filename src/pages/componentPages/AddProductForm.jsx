import imageCompression from 'browser-image-compression';
import {uploadImage} from "../../services/uploadService";
import {API_URL} from "../../config/api";
import SelectField from "../../components/SelectField";
import PriceInput from "../../components/PriceInput";

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

            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="CODE"
                    value={newProduct.code}
                    onChange={(e) => onChange('code', e.target.value)}
                    className="w-full md:w-1/4 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                    type="text"
                    placeholder="NAME"
                    value={newProduct.name}
                    onChange={(e) => onChange('name', e.target.value)}
                    className="w-full md:w-3/4 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <SelectField
                    label=""
                    value={newProduct.type}
                    options={typeOptions}
                    onChange={(val) => onChange('type', val)}
                    className="w-full md:w-1/2"
                />

                <SelectField
                    label=""
                    value={newProduct.brand}
                    options={brandOptions}
                    onChange={(val) => onChange('brand', val)}
                    className="w-full md:w-1/2"
                />
            </div>

            <input
                type="text"
                placeholder="DESCRIPTION"
                value={newProduct.description}
                onChange={(e) => onChange('description', e.target.value)}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div className="flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="UNIT"
                    value={newProduct.unit}
                    onChange={(e) => onChange('unit', e.target.value)}
                    className="w-full md:w-1/2 border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <PriceInput
                    value={newProduct.price}
                    onChange={(value) => onChange('price', value)}
                    unit={newProduct.unit}
                    className="w-full md:w-1/2"
                />
            </div>

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
