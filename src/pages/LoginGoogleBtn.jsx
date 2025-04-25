import { GoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { googleLogin, getProfile } from "../services/authService";
import {jwtDecode} from "jwt-decode";

export default function LoginGoogleBtn() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse) => {
        try {
            const credential = credentialResponse.credential;

            // 👇 Gửi credential để xác thực
            const token = await googleLogin(credential);

            localStorage.setItem("token", token);
            const profile = await getProfile();
            setUser(profile);

            // const decoded = jwtDecode(credential);
            // setUser({
            //     email: decoded.email,
            //     name: decoded.name,
            //     picture: decoded.picture,
            // });

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
