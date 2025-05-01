import { useState } from 'react';
import { FiX } from 'react-icons/fi';
export default function ShopFilterBar({ filters, onChange, types, brands }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleChange = (key, value) => {
        onChange({ ...filters, [key]: value, page: 1 });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        onChange({ ...filters, search, page: 1 });
    };

    return (
        <div className="rounded p-4 mb-6">
            <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or description..."
                        className="w-full border border-gray-300 px-3 py-2 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                onChange({ ...filters, search: '', page: 1 });
                            }}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            aria-label="Clear search"
                        >
                            <FiX size={18} />
                        </button>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Search
                </button>
            </form>

            <div className="mb-3">
                <div className="flex flex-wrap gap-2">
                    {['all', ...types].map((type) => (
                        <button
                            key={type}
                            onClick={() => handleChange('type', type)}
                            className={`px-3 py-1 text-xs sm:text-sm border transition ${
                                filters.type === type
                                    ? 'text-white border-orange-500 bg-orange-500'
                                    : 'text-gray-700 border-gray-300 hover:bg-gray-100'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <div className="flex flex-wrap gap-2">
                    {['all', ...brands].map((brand) => (
                        <button
                            key={brand}
                            onClick={() => handleChange('brand', brand)}
                            className={`px-3 py-1 text-xs sm:text-sm border transition ${
                                filters.brand === brand
                                    ? 'bg-orange-500 text-white border-orange-500'
                                    : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-orange-50'
                            }`}
                        >
                            {brand}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
