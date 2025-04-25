import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getProfile } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import LoginGoogleBtn from "./LoginGoogleBtn";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
            localStorage.setItem("token", token);

            const profile = await getProfile();
            setUser(profile);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.message || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 mb-2">Hoặc đăng nhập bằng</p>
                    <GoogleOAuthProvider clientId="78990949627-ud4rj1bpg1meaqkb01ngb9nm9rcsofmm.apps.googleusercontent.com">
                        <LoginGoogleBtn />
                    </GoogleOAuthProvider>
                </div>

                {error && <p className="mb-4 text-red-600 text-sm text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
                    >
                        Đăng nhập
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-500">
                    Chưa có tài khoản? <a href="/register" className="text-blue-600 hover:underline">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    );
}
