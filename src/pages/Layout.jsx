import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import ShopPage from "./ShopPage";
import {useCartContext} from "../contexts/CartContext";

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const { user, logout, loading } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const { items } = useCartContext();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold font-serif flex items-center gap-2">
                        <img src="./img/logo.png" alt="TimboCraft" className="h-10" />
                    </Link>

                    {/* Hamburger (mobile) */}
                    <div className="sm:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600 focus:outline-none">
                            {menuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden sm:flex space-x-6 uppercase font-bold text-sm">
                        <Link to="/" className="hover:text-yellow-500">Home</Link>
                        <Link to="/about" className="hover:text-yellow-500">About Us</Link>
                        <Link to="/Shop" className="hover:text-yellow-500">Shop</Link>
                        <Link to="/projects" className="hover:text-yellow-500">Projects</Link>
                        <Link to="/blog" className="hover:text-yellow-500">Blog</Link>
                        <Link to="/contact" className="hover:text-yellow-500">Contact Us</Link>
                    </nav>

                    {/* Header Info */}
                    <div className="hidden sm:flex items-center space-x-4 text-sm text-gray-700">
                        {!user ? (
                            <>
                                <Link to="/login" className="text-blue-600 hover:text-yellow-500">Login</Link>
                                <Link to="/register" className="text-green-600 hover:text-yellow-500">Register</Link>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-2">
                                    {user.picture && (
                                        <img src={user.picture} alt="avatar" className="w-8 h-8 rounded-full" />
                                    )}
                                    <span className="text-sm font-medium text-gray-700">{user.email}</span>
                                </div>
                                {user.admin && (
                                    <Link to="/admin" className="text-green-600 hover:text-yellow-500">Setting</Link>
                                )}
                                <button
                                    onClick={logout}
                                    className="text-red-600 hover:text-yellow-500 font-semibold"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        <Link to="/yourcart" className="text-orange-500 hover:text-yellow-500">🛒 {items.length}</Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="sm:hidden bg-white px-6 py-4 space-y-3 border-t">
                        <Link to="/" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">Home</Link>
                        <Link to="/about" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">About Us</Link>
                        <Link to="/Shop" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">Shop</Link>
                        <Link to="/projects" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">projects</Link>
                        <Link to="/blog" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">Blog</Link>
                        <Link to="/contact" className="block text-sm font-semibold text-gray-700 hover:text-yellow-500">Contact Us</Link>

                        <div className="pt-3 border-t mt-2">
                            {!user ? (
                                <>
                                    <Link to="/login" className="block text-blue-600 hover:text-yellow-500">Login</Link>
                                    <Link to="/register" className="block text-green-600 hover:text-yellow-500">Register</Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 mb-2">
                                        {user.picture && (
                                            <img src={user.picture} alt="avatar" className="w-6 h-6 rounded-full" />
                                        )}
                                        <span className="text-sm text-gray-700">{user.email}</span>
                                        {user.admin && (
                                            <Link to="/admin" className="text-green-600 hover:text-yellow-500">Setting</Link>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setMenuOpen(false);
                                        }}
                                        className="text-red-600 hover:text-yellow-500 font-semibold"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main>{children}</main>

            <footer className="bg-black text-white text-center sm:text-left px-6 sm:px-10 py-10 mt-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {/* Logo + Info */}
                    <div>
                        <h2 className="text-xl font-bold mb-2">TimboCraft</h2>
                        <p className="text-sm text-gray-300">&copy; 2025 Timbo Craft. All rights reserved.</p>
                        <p className="text-sm text-gray-400 mt-1">Nơi tạo nên tinh hoa mộc Việt</p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold mb-2 text-yellow-400">Liên hệ</h3>
                        <p className="text-sm">📞 Hotline: (102) 6666 8888</p>
                        <p className="text-sm">✉️ Email: info@timbocraft.com</p>
                    </div>

                    {/* Địa chỉ */}
                    <div>
                        <h3 className="font-semibold mb-2 text-yellow-400">Địa chỉ xưởng</h3>
                        <p className="text-sm">🏭 Xưởng 1: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM</p>
                        <p className="text-sm">🏭 Xưởng 2: 456 Trần Phú, Quận 10, TP.HCM</p>
                    </div>
                </div>
            </footer>

        </div>
    );
};

export default Layout;
