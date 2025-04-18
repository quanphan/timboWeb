import { createContext, useState, useEffect } from "react";
import { getProfile, logout as doLogout } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const profile = await getProfile();
                setUser(profile);
            } catch (err) {
                doLogout();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    const logout = () => {
        doLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
