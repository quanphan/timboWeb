import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Layout from "./Layout";
import React, { useState } from 'react';
import { sendMessage } from "../services/apiService";

function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        try {
            const response = await sendMessage(formData)
            console.log('Response:', response.data);
            setSuccess('Message sent successfully!');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            setSuccess('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
                <div className="w-full max-w-6xl bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">

                    {/* Left Contact Info */}
                    <div className="bg-orange-400 md:w-1/3 w-full p-8 flex flex-col justify-center text-white">
                        <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                        <div className="flex items-center mb-4">
                            <FaMapMarkerAlt className="mr-4 text-xl" />
                            <span>123 Main Street, New York, USA</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <FaPhoneAlt className="mr-4 text-xl" />
                            <span>+1 234 567 890</span>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="mr-4 text-xl" />
                            <span>info@example.com</span>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="md:w-2/3 w-full p-8">
                        <h2 className="text-2xl font-semibold mb-8 text-gray-800">GET IN TOUCH WITH US</h2>

                        {/* Thông báo */}
                        {success && (
                            <div className={`mb-6 p-4 rounded ${success.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {success}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="name">
                                        NAME
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="email">
                                        EMAIL ADDRESS
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="phone">
                                        PHONE
                                    </label>
                                    <input
                                        id="phone"
                                        type="text"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="subject">
                                        SUBJECT
                                    </label>
                                    <input
                                        id="subject"
                                        type="text"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    />
                                </div>
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 mb-2" htmlFor="message">
                                    YOUR MESSAGE
                                </label>
                                <textarea
                                    id="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                                    required
                                ></textarea>
                            </div>

                            {/* Button */}
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-orange-400 text-white py-3 px-8 rounded hover:bg-orange-500 transition disabled:opacity-50"
                                >
                                    {loading ? 'Sending...' : 'SEND MESSAGE'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </Layout>
    );
}

export default ContactPage;
