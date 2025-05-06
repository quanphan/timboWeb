export default function SelectField({ label, value, options = [], onChange, required = false, placeholder, className = '' }) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            {label && (
                <label className="font-semibold text-sm text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((opt, idx) => (
                    <option key={`${opt}-${idx}`} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
