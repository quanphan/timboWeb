import { useEffect, useState } from 'react';

export default function PriceInput({ value, onChange, className = '', unit = '' }) {
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isFocused) {
            if (value !== undefined && value !== null && value !== '') {
                setInputValue(formatNumber(value));
            } else {
                setInputValue('');
            }
        }
    }, [value, isFocused]);

    const formatNumber = (val) => {
        const [intPart, decimalPart] = String(val).split('.');
        const formatted = Number(intPart).toLocaleString();
        return decimalPart ? `${formatted}.${decimalPart}` : formatted;
    };

    const handleChange = (e) => {
        const raw = e.target.value.replace(/[^0-9.]/g, '');
        const parts = raw.split('.');
        if (parts.length > 2) return;
        setInputValue(raw);
        onChange(raw);
    };

    const handleBlur = () => {
        setIsFocused(false);
        if (inputValue) {
            setInputValue(formatNumber(inputValue));
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        setInputValue(String(value || ''));
    };

    return (
        <div className={`relative ${className}`}>
            {unit && unit !== '₫' && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {unit}
        </span>
            )}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                inputMode="decimal"
                className={`w-full border p-2 ${
                    unit ? 'pl-7' : 'pl-3'
                } rounded focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder={unit === '₫' ? '0' : ''}
            />
            {unit === '₫' && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          ₫
        </span>
            )}
        </div>
    );
}
