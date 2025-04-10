import React from "react";
import { motion } from "framer-motion";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="relative h-[500px] bg-[url('./img/slider.jpg')] bg-cover bg-center flex items-center justify-center text-white text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-5xl font-bold mb-4">Expert Carpentry Services</h2>
                    <p className="text-lg mb-6">Providing high-quality woodwork with precision and craftsmanship.</p>
                    <button className="bg-yellow-500 text-black px-6 py-3 text-lg rounded-lg shadow-lg">Get a Quote</button>
                </motion.div>
            </section>

            {/* Services Section */}
            <section className="py-16 px-6 max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center mb-10">Our Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaHammer className="text-yellow-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Custom Furniture</h3>
                        <p>Handcrafted furniture tailored to your needs.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaTools className="text-yellow-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Home Renovations</h3>
                        <p>High-quality renovations to enhance your space.</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                        <FaPhone className="text-yellow-500 text-4xl mb-4" />
                        <h3 className="text-2xl font-bold mb-2">Consultations</h3>
                        <p>Expert advice for all your woodworking projects.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
