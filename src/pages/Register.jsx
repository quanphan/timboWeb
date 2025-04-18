import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setMsg("");

        const res = await fetch("https://your-api.up.railway.app/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            setMsg("🎉 Đăng ký thành công! Đang chuyển hướng...");
            setTimeout(() => navigate("/login"), 1500);
        } else {
            setMsg(data.message || "Có lỗi xảy ra");
        }
    };

    return (
        <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Đăng ký</h2>
            <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
            <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mật khẩu" required />
            <button className="btn mt-3">Đăng ký</button>
            {msg && <p className="mt-2 text-blue-600">{msg}</p>}
        </form>
    );
}
