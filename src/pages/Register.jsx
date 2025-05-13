import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";

export default function RegisterPage() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            await register(form.name, form.email, form.password, form.phone);
            setMsg("🎉 Register successful! Redirecting...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            const message = err.response?.data?.message || "Register failed.";
            setMsg(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto space-y-3">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
                type="text"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
            />
            <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                pattern="[0-9]{10,15}"
                title="Enter a valid phone number"
            />
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
            />
            <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
            />

            <button className="btn mt-3 w-full" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>

            {msg && <p className="mt-2 text-blue-600">{msg}</p>}
        </form>
    );
}
