import { Link, useNavigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            {/* Header */}
            <header className="text-black py-6 px-10 max-w-7xl mx-auto flex justify-between items-center w-full top-0 z-50 relative">
                {/* Logo */}
                <h1 className="text-4xl font-extrabold tracking-wide font-serif">
                    <img src="./img/logo.png" alt="TimboCraft" />
                </h1>

                {/* Navigation */}
                <nav>
                    <ul className="flex space-x-6 uppercase font-bold items-center">
                        <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-500">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-yellow-500">Services</Link></li>
                        <li><Link to="/projects" className="hover:text-yellow-500">Portfolio</Link></li>
                        <li><Link to="/blog" className="hover:text-yellow-500">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-500">Contact Us</Link></li>
                    </ul>
                </nav>

                {/* Header Info */}
                <div className="absolute top-2 right-10 flex items-center space-x-6 text-sm text-gray-700 Headerinfo">
                    {!user ? (
                        <>
                            <Link to="/login" className="text-blue-600 hover:text-yellow-500">Login</Link>
                            <Link to="/register" className="text-green-600 hover:text-yellow-500">Register</Link>
                        </>
                    ) : (
                        <>
                            <div className="flex items-center gap-2">
                                <i className="fa fa-user text-primary"></i>
                                <span className="text-sm font-medium text-gray-700">{user.email}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-yellow-500 font-semibold"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-8 mt-12">
                <p className="text-lg">&copy; 2025 Timbo craft. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;
