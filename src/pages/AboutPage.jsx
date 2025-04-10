import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import {motion} from "framer-motion";

const AboutPage = () => (
    <Layout>
        <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">About Us</h2>
            <p className="text-lg text-gray-600">We have been crafting quality woodwork for over 20 years, delivering excellence and precision in every project.</p>
        </section>
    </Layout>
);

export default AboutPage;