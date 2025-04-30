import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import {motion} from "framer-motion";
import Banner from "./componentPages/Banner";
import Welcome from "./componentPages/Welcome";
import WoodworkGallery from "./componentPages/WoodworkGallery";
import BlogSection from "./componentPages/BlogSection";
import TestimonialsSection from "./componentPages/ClientSession";
import HandCrafting from "./componentPages/HandCrafting";
import WhyChooseUs from "./componentPages/WhyChooseUs";
import ServiceSection from "./componentPages/Services";
const services = [
    {
        title: "EXTERIOR DESIGN",
        description:
            "Showcase your style outside your home with inspiration from these exterior paint color schemes. Send us a drawing and we respond with a quote.",
        image: "./img/img01.jpg",
    },
    {
        title: "OFFICE FURNITURE",
        description:
            "A new furniture typology for open spaces. Our product range is a new haven in the office - for employees, clients and visitors alike.",
        image: "./img/img02.jpg",
    },
    {
        title: "FAMILY FURNITURE",
        description:
            "Family room is the place to gather together with those you love. We make your house become your warm home with spectacular furniture.",
        image: "./img/img03.jpg",
    },
    {
        title: "LAMINATE WORKS",
        description:
            "Family room is the place to gather together with those you love. We make your house become your warm home with spectacular furniture.",
        image: "./img/img04.jpg",
    },
];
const AboutPage = () => (
    <Layout>
        <Welcome></Welcome>

        <section className="w-full bg-[#6b4f32] my-20">
            {/* Banner Section */}
            <div className="max-w-7xl text-white py-6 px-10 flex mx-auto justify-between items-center">
                <h2 className="text-lg font-semibold">
                    🛠 WE OFFER A WIDE SECTION OF WOODWORK SERVICES
                </h2>
                <button className="bg-white text-[#6b4f32] px-4 py-2 rounded shadow">
                    PURCHASE NOW
                </button>
            </div>
        </section>

        <section className="max-w-7xl mx-auto">
            {/* Why Choose Us Section */}
            <WhyChooseUs></WhyChooseUs>
        </section>

        <section className="w-full bg-[#6b4f32] mt-20">
            <WoodworkGallery/>
        </section>

        <section className="max-w-7xl mx-auto">
            <div className="px-10 py-16 bg-white">
                <p className="text-yellow-700 font-semibold uppercase tracking-widest text-sm mb-2">Blog</p>
                <h2 className="text-4xl font-bold mb-10">Company News</h2>
                <BlogSection></BlogSection>
            </div>
        </section>

        <section>
            <TestimonialsSection></TestimonialsSection>
        </section>

    </Layout>
);

export default AboutPage;