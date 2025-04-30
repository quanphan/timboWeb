import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import {motion} from "framer-motion";
import WoodworkGallery from "./componentPages/WoodworkGallery";
import Banner from "./componentPages/Banner";
import BlogSection from "./componentPages/BlogSection";
import TestimonialsSection from "./componentPages/ClientSession";
import Welcome from "./componentPages/Welcome";
import WhyChooseUs from "./componentPages/WhyChooseUs";
import HandCrafting from "./componentPages/HandCrafting";
import ServiceSection from "./componentPages/Services";
import ClientBanner from "./componentPages/ClientBanner";
const HomePage = () => (
    <Layout>
        {/*<Banner></Banner>*/}


        {/*Service*/}
        <section className="max-w-7xl mx-auto">
            <ServiceSection></ServiceSection>
        </section>

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
            {/* HandCrafting Section */}
            <HandCrafting></HandCrafting>
        </section>

        <section className="w-full bg-[#6b4f32] mt-20">
            <WoodworkGallery/>
        </section>

        <section className="max-w-7xl mx-auto">
            {/* Why Choose Us Section */}
            <WhyChooseUs></WhyChooseUs>
        </section>

        <section>
           <ClientBanner></ClientBanner>
        </section>

        <section className="max-w-7xl mx-auto">
            <div className="px-10 py-16 bg-white">
                <p className="text-yellow-700 font-semibold uppercase tracking-widest text-sm mb-2">Blog</p>
                <h2 className="text-4xl font-bold mb-10">Company News</h2>
                <BlogSection></BlogSection>
            </div>
        </section>

    </Layout>
);
export default HomePage;