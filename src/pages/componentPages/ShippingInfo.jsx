import { useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

const countries = [
    { code: 'VN', name: 'Vietnam', factor: 1, currency: '₫', isUSD: false, minDays: 1, maxDays: 3 },
    { code: 'US', name: 'United States', factor: 3.2, currency: '$', isUSD: true, minDays: 7, maxDays: 10 },
    { code: 'UK', name: 'United Kingdom', factor: 3, currency: '£', isUSD: false, minDays: 8, maxDays: 11 },
    { code: 'FR', name: 'France', factor: 3.1, currency: '€', isUSD: false, minDays: 8, maxDays: 12 },
    { code: 'AU', name: 'Australia', factor: 2.8, currency: 'A$', isUSD: false, minDays: 5, maxDays: 8 },
    { code: 'JP', name: 'Japan', factor: 2.2, currency: '¥', isUSD: false, minDays: 3, maxDays: 5 },
    { code: 'SG', name: 'Singapore', factor: 1.5, currency: 'S$', isUSD: false, minDays: 2, maxDays: 4 },
];

const BASE_COST_VND = 300000;
const USD_EXCHANGE = 24500;

const formatDate = (date) =>
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function ShippingInfo({ onShippingChange }) {
    const [selected, setSelected] = useState(countries[0]);
    const [showDetail, setShowDetail] = useState(true);

    useEffect(() => {
        const savedCode = localStorage.getItem('selectedCountryCode');
        if (savedCode) {
            const found = countries.find((c) => c.code === savedCode);
            if (found) setSelected(found);
        }
    }, []);

    const handleChange = (e) => {
        const code = e.target.value;
        const found = countries.find((c) => c.code === code);
        if (found) {
            setSelected(found);
            localStorage.setItem('selectedCountryCode', code);
        }
    };
    useEffect(() => {
        const cost = Math.round(BASE_COST_VND * selected.factor);
        if (onShippingChange) {
            onShippingChange(cost);
        }
    }, [selected]);

    const rawCostVND = BASE_COST_VND * selected.factor;
    const formattedCost = selected.isUSD
        ? `$${(rawCostVND / USD_EXCHANGE).toFixed(2)}`
        : `${Math.round(rawCostVND).toLocaleString()} ${selected.currency}`;

    const now = new Date();
    const minDate = new Date(now);
    minDate.setDate(now.getDate() + selected.minDays);
    const maxDate = new Date(now);
    maxDate.setDate(now.getDate() + selected.maxDays);
    const deliveryRange = `${formatDate(minDate)}–${formatDate(maxDate)}`;

    return (
        <div className="mt-10 border-t pt-6">
            {/* Toggle Header */}
            <div
                onClick={() => setShowDetail((prev) => !prev)}
                className="flex justify-between items-center cursor-pointer"
            >
                <h3 className="text-lg font-semibold">Shipping and return policies</h3>
                {showDetail ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
            </div>

            {/* Detail */}
            {showDetail && (
                <div className="mt-4 text-sm text-gray-700 space-y-3">
                    <div className="flex items-center gap-2">
                        <span>📅</span>
                        <span>
              Order today to get by{' '}
                            <b className="underline decoration-dashed">{deliveryRange}</b>
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📄</span>
                        <span>
              Returns & exchanges accepted{' '}
                            <span className="underline decoration-dashed">within 30 days</span>
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>🚚</span>
                        <span>
              Cost to ship: <b>{formattedCost}</b>
            </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>📍</span>
                        <span>
              Ships from: <b>Vietnam</b>
            </span>
                    </div>
                    <div className="mt-2">
                        <label className="text-sm font-medium mr-2">Deliver to:</label>
                        <select
                            value={selected.code}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        >
                            {countries.map((c) => (
                                <option key={c.code} value={c.code}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
}
