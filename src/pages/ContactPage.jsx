
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';  // Import apiService

function ContactPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Sử dụng apiService để gọi API
        apiService.getData()
            .then(fetchedData => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('There was an error!', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <section className="py-20 px-6 max-w-6xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-gray-800 mb-6">Contact Us</h2>
                <p className="text-lg text-gray-600">Get in touch with us for your next woodworking project.</p>
            </section>
            <div>
                <h1>Thông tin người dùng</h1>
                <p>ID: {data.id}</p>
                <p>Type: {data.title}</p>
                <p>Content: {data.content}</p>
            </div>
        </Layout>

    );
}
export default ContactPage;
