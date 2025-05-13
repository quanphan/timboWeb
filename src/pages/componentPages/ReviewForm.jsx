import { useState, useEffect } from 'react';

export default function ReviewForm({ onSubmit }) {
    const [form, setForm] = useState({
        name: '',
        content: '',
        recommend: false,
        quality: 5,
        shipping: 5,
        service: 5,
    });

    const [averageRating, setAverageRating] = useState(5);

    useEffect(() => {
        const avg = Math.round(
            (form.quality + form.shipping + form.service) / 3
        );
        setAverageRating(avg);
    }, [form.quality, form.shipping, form.service]);

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalData = { ...form, rating: averageRating };
        onSubmit(finalData);
        setForm({
            name: '',
            content: '',
            recommend: false,
            quality: 5,
            shipping: 5,
            service: 5,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
            <input
                type="text"
                required
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your name"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <textarea
                required
                value={form.content}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Write your review..."
                rows={4}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Display calculated rating */}
            <div>
                <label className="block text-sm font-medium mb-1">Calculated Rating:</label>
                <div className="text-lg font-semibold text-yellow-600">{averageRating} ★</div>
            </div>

            {/* Recommend */}
            <label className="flex items-center gap-2 text-sm">
                <input
                    type="checkbox"
                    checked={form.recommend}
                    onChange={(e) => handleChange('recommend', e.target.checked)}
                />
                I recommend this product
            </label>

            {/* Sub-ratings */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {['quality', 'shipping', 'service'].map((field) => (
                    <div key={field}>
                        <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
                        <select
                            value={form[field]}
                            onChange={(e) => handleChange(field, parseInt(e.target.value))}
                            className="w-full border p-2 rounded"
                        >
                            {[5, 4, 3, 2, 1].map(n => (
                                <option key={n} value={n}>{n} ★</option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded"
            >
                Submit Review
            </button>
        </form>
    );
}
