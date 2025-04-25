import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import {motion} from "framer-motion";
import Banner from "./componentPages/Banner";
import Welcome from "./componentPages/Welcome";
import WoodworkGallery from "./componentPages/WoodworkGallery";
import BlogSection from "./componentPages/BlogSection";
import TestimonialsSection from "./componentPages/ClientSession";
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
        <Banner></Banner>

        {/*FEATURES*/}
        <section className="max-w-7xl mx-auto">
            {/* Why Choose Us Section */}
            <div className="text-black py-16 px-8 md:flex md:items-center md:justify-between">
                <div className="max-w-2xl">
                    <h3 className="text-yellow-700 font-semibold">FEATURES</h3>
                    <h2 className="text-4xl font-bold">WHY CHOOSE US</h2>
                    <div className="mt-6 space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="text-yellow-700 text-3xl">💰</div>
                            <div>
                                <h4 className="font-bold">35 Years Of Experience In Woodwork Business</h4>
                                <p className="text-gray-600">
                                    Groovin' all week with you. And we'll do it our way yes our way. Make all our dreams come true for me and you.
                                    You wanna be where you can see our troubles are all the same. You wanna be where everybody knows Your name.
                                    It's time to play the music. <br/> <br/>

                                    Then one day he was shootin' at some food and up through the ground came a bubblin' crude.
                                    Oil that is. Here's the story of a lovely lady who was bringing
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="text-gray-400 text-3xl">⚙️</div>
                            <div>
                                <h4 className="font-bold">More than 1000 Customers</h4>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="text-gray-400 text-3xl">📦</div>
                            <div>
                                <h4 className="font-bold">Using Latest Technology In Our Work</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 md:mt-0">
                    <img src="./img/man.png" alt="Worker" className="max-w-xs mx-auto" />
                </div>
            </div>
        </section>
        {/*baner1*/}
        <section>
            <div className="bg-[#5A3E2B] text-white py-12 grid grid-cols-2 md:grid-cols-4 text-center">
                <div>
                    <div className="text-3xl">👍</div>
                    <h3 className="text-2xl font-bold">120</h3>
                    <p>HAPPY CLIENTS</p>
                </div>
                <div>
                    <div className="text-3xl">🚀</div>
                    <h3 className="text-2xl font-bold">213</h3>
                    <p>PROJECTS DONE</p>
                </div>
                <div>
                    <div className="text-3xl">👥</div>
                    <h3 className="text-2xl font-bold">72</h3>
                    <p>PROFESSIONAL STAFF</p>
                </div>
                <div>
                    <div className="text-3xl">⭐</div>
                    <h3 className="text-2xl font-bold">35</h3>
                    <p>AWARD WON</p>
                </div>
            </div>
        </section>

        {/*Service*/}
        <section className="max-w-7xl mx-auto">
            <div className="container mx-auto px-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    <small className="text-yellow-600 block">HAND CRAFTING</small>
                    SERVICES
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="bg-yellow-700 text-white text-center py-2 font-semibold">
                                {service.title}
                            </div>
                            <p className="p-4 text-gray-700 text-sm">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
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