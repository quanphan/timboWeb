import { useState } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';

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
            {/* Search always on top for mobile */}
            <form onSubmit={handleSearch} className="mb-4 w-full flex md:justify-end">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or description..."
                        className="w-full border border-gray-300 px-3 py-2 pr-10 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    {search && (
                        <button
                            type="button"
                            onClick={() => {
                                setSearch('');
                                onChange({ ...filters, search: '', page: 1 });
                            }}
                            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                            aria-label="Clear search"
                        >
                            <FiX size={16} />
                        </button>
                    )}
                    <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-orange-500 hover:text-orange-700"
                        aria-label="Search"
                    >
                        <FiSearch size={18} />
                    </button>
                </div>
            </form>

            {/* Filter section */}
            {/*<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">*/}
            <div className="mb-4 w-full md:w-1/2">
                {/* Type & brand - left on desktop */}
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="flex flex-wrap gap-2">
                            {['all', ...types].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => handleChange('type', type)}
                                    className={`px-1 py-1 text-xs sm:text-sm transition font-bold ${
                                        filters.type === type
                                            ? 'text-orange-500'
                                            : 'text-gray-700 hover:bg-gray-100'
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
                                    className={`px-1 py-1 text-xs sm:text-sm transition font-bold ${
                                        filters.brand === brand
                                            ? 'text-orange-500'
                                            : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                >
                                    {brand}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
