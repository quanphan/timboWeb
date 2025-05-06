import { useEffect, useState } from 'react';

export default function PriceInput({ value, onChange, className = '', unit }) {
    const defaultUnit = unit || '$';
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
        if (decimalPart !== undefined) {
            return `${formatted}.${decimalPart.slice(0, 2)}`;
        }
        return formatted;
    };

    const handleChange = (e) => {
        let raw = e.target.value.replace(/[^0-9.]/g, '');

        const dotCount = (raw.match(/\./g) || []).length;
        if (dotCount > 1) return;

        if (raw.includes('.')) {
            const [intPart, decimalPart] = raw.split('.');
            raw = `${intPart}.${decimalPart.slice(0, 2)}`;
        }

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
            {defaultUnit !== 'd' && (
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          {defaultUnit}
        </span>
            )}
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                inputMode="decimal"
                className={`w-full border p-2 ${defaultUnit !== '₫' ? 'pl-7' : 'pl-3'} rounded focus:outline-none focus:ring-2 focus:ring-orange-400`}
                placeholder={defaultUnit === 'd' ? '0' : ''}
            />
            {defaultUnit === 'd' && (
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          ₫
        </span>
            )}
        </div>
    );
}
