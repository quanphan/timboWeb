import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getProfile } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = await login(email, password);
            localStorage.setItem("token", token); // ✅ Ghi token vào localStorage

            const profile = await getProfile();
            setUser(profile); // ✅ Update user vào context

            navigate("/"); // ✅ Điều hướng về home
        } catch (err) {
            console.error(err);
            setError(err.message || "Login failed");
        }
    };

    return (
        <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Đăng nhập</h2>
            <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                required
            />
            <button className="btn mt-3">Đăng nhập</button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
}
