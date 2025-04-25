import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleLogin, getProfile } from "../services/authService";

export default function LoginGoogleBtn() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const credential = credentialResponse.credential;

            // 👇 Gửi credential về backend để xác thực
            const token = await googleLogin(credential);

            // Lưu token và lấy profile như thường
            localStorage.setItem("token", token);
            const profile = await getProfile();
            setUser(profile);
            navigate("/");
        } catch (err) {
            console.error("Google login failed:", err);
        }
    };

    return (
        <div className="text-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => console.error("Google Login Failed")}
            />
        </div>
    );
}
