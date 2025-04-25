
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';
import BlogSection from "./componentPages/BlogSection";  // Import apiService

function BlogPage() {
    return (
        <Layout>
            <section className="max-w-7xl mx-auto">
                <div className="px-10 py-16 bg-white">
                    <p className="text-yellow-700 font-semibold uppercase tracking-widest text-sm mb-2">Blog</p>
                    <BlogSection></BlogSection>
                </div>

            </section>
        </Layout>
    );
}
export default BlogPage;
