import {Link} from "react-router-dom";
import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="bg-gray-100 font-sans min-h-screen">
            {/* Header */}
            <header className="text-black py-6 px-10 max-w-7xl mx-auto flex justify-between items-center w-full top-0 z-50">
                <h1 className="text-4xl font-extrabold tracking-wide font-serif">
                    <img src="./img/logo.png" alt="TimboCraft"/>
                </h1>
                <nav>
                    <ul className="flex space-x-6 uppercase font-bold">
                        <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
                        <li><Link to="/about" className="hover:text-yellow-500">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-yellow-500">Services</Link></li>
                        <li><Link to="/projects" className="hover:text-yellow-500">Portfolio</Link></li>
                        <li><Link to="/projects" className="hover:text-yellow-500">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-yellow-500">Contact Us</Link></li>
                    </ul>
                </nav>
            </header>

            <main>{children}</main>

            {/* Footer */}
            <footer className="bg-black text-white text-center py-8 mt-12">
                <p className="text-lg">&copy; 2025 Craftsman. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;