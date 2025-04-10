import React from "react";
import { FaHammer, FaTools, FaPhone } from "react-icons/fa";
import Layout from "./Layout";
import {motion} from "framer-motion";
import WoodworkGallery from "./componentPages/WoodworkGallery";
import Banner from "./componentPages/Banner";
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
const HomePage = () => (
    <Layout>
        <Banner></Banner>
        <section className="pt-20 px-10 max-w-7xl mx-auto flex items-center justify-between ">
            {/* Left Content */}
            <div className="w-2/3 pr-10">
                <h3 className="text-xl text-yellow-700 uppercase mb-2">Welcome to Craftsman</h3>
                <h2 className="text-5xl font-bold text-gray-800 mb-6">Who We Are</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio praesentium sed dignissimos atque enim dolorum assumenda eos vitae,
                    mollitia rem, nam laborum expedita. Natus sint atque possimus similique recusandae consectetur suscipit delectus dolore iure numquam,
                    placeat voluptatem, consequuntur alias officiis vero itaque nesciunt fuga ratione eum deserunt dicta molestias sit excepturi.
                    imus error? Voluptatem?
                </p>
                <ul className="text-lg text-gray-700 space-y-2">
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Professional Staff</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Latest Mechanical Technology</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Certified Materials</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Very Cheap Prices</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Creative Designers</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Finishing Work Before Deadline</li>
                </ul>
            </div>

            {/* Right Form */}
            <div className="w-1/3 bg-[#5a4228] text-white p-10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Request a Quote</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-white text-black" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-white text-black" />
                    <textarea placeholder="Your Message" className="w-full p-3 rounded bg-white text-black h-32"></textarea>
                    <button className="bg-yellow-600 px-6 py-3 rounded text-white font-bold w-full hover:bg-yellow-700 transition">Send Message</button>
                </form>
            </div>
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
        <section className="max-w-7xl mx-auto">
            <BlogSection></BlogSection>
        </section>
        <section>
            <TestimonialsSection></TestimonialsSection>
        </section>
    </Layout>
);
export default HomePage;