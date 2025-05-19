export function formatCurrency(value, unit = '$') {
    const number = Number(value) || 0;
    if (unit === 'd') {
        return `${number.toLocaleString('vi-VN')} ₫`;
    }

    return `$${number.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
}