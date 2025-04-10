import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";

const ServicesPage = () => (
    <Layout>
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-12">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
                    <FaHammer className="text-yellow-500 text-5xl mb-4" />
                    <h3 className="text-3xl font-semibold mb-2">Custom Furniture</h3>
                    <p className="text-lg text-gray-600">Handcrafted furniture tailored to your needs.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
                    <FaTools className="text-yellow-500 text-5xl mb-4" />
                    <h3 className="text-3xl font-semibold mb-2">Home Renovations</h3>
                    <p className="text-lg text-gray-600">High-quality renovations to enhance your space.</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-8 text-center border border-gray-200">
                    <FaPhone className="text-yellow-500 text-5xl mb-4" />
                    <h3 className="text-3xl font-semibold mb-2">Consultations</h3>
                    <p className="text-lg text-gray-600">Expert advice for all your woodworking projects.</p>
                </div>
            </div>
        </section>
    </Layout>
);

export default ServicesPage;