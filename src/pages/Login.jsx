import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getProfile } from "../services/authService";
import { AuthContext } from "../contexts/AuthContext";
import LoginGoogleBtn from "./LoginGoogleBtn";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Eye, EyeOff, Mail, Lock } from "lucide-react"; // 👈 cần: npm i lucide-react

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const emailRef = useRef();
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const token = await login(email, password);
            localStorage.setItem("token", token);

            const profile = await getProfile();
            setUser(profile);

            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.message || "Đăng nhập thất bại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Đăng nhập</h2>

                {error && <p className="mb-4 text-red-600 text-sm text-center">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            ref={emailRef}
                            type="email"
                            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="w-full pl-10 pr-10 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Mật khẩu"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold flex justify-center"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                            "Đăng nhập"
                        )}
                    </button>
                    <div className="mb-6 text-center">
                        <p className="text-sm text-gray-500 mb-2">Hoặc đăng nhập bằng</p>
                        <GoogleOAuthProvider clientId="78990949627-ud4rj1bpg1meaqkb01ngb9nm9rcsofmm.apps.googleusercontent.com">
                            <LoginGoogleBtn />
                        </GoogleOAuthProvider>
                    </div>
                </form>

                <p className="mt-6 text-sm text-center text-gray-500">
                    Chưa có tài khoản?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">Đăng ký ngay</a>
                </p>
            </div>
        </div>
    );
}
