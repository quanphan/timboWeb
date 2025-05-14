import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import ShopPage from "./pages/ShopPage";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import BlogPage from "./pages/BlogPage";
import AdminPage from "./pages/AdminPage";
import { Toaster } from 'react-hot-toast';
import ProductDetailPage from './pages/ProductDetailPage';
import YourCartPage from './pages/YourCart';
import {CartProvider} from "./contexts/CartContext";

const App = () => (
    <Router>
        <AuthProvider>
            <CartProvider>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/yourcart" element={<YourCartPage />} />
            </Routes>
            <Toaster position="top-right" reverseOrder={false} />
            </CartProvider>
        </AuthProvider>
    </Router>

);
export default App;