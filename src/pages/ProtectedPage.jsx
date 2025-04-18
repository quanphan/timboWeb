import { useEffect, useState } from "react";
import { getProtectedData } from "../api/protected";

export default function ProtectedPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        getProtectedData().then(setData).catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">🔐 Dữ liệu cá nhân</h1>
            <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}
