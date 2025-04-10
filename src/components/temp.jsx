import React, { useState, useEffect } from 'react';

const Banner = () => {
    const slides = [
        { image: './img/slider.jpg', text: 'Quality Carpentry & Woodwork' },
        { image: './img/slider2.jpg', text: 'Crafting Excellence in Every Piece We Make' },
        { image: './img/slider3.jpg', text: 'Building the Future with Precision and Care' },
    ];

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            handleNextSlide();  // Tự động chuyển slide sau mỗi 10 giây
        }, 10000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, []);

    const changeSlide = (direction) => {
        setIsFadingOut(true);  // Bắt đầu fade-out văn bản

        setTimeout(() => {
            setCurrentSlideIndex((prevIndex) => {
                if (direction === 'next') {
                    return (prevIndex + 1) % slides.length; // Chuyển tới slide tiếp theo
                } else if (direction === 'prev') {
                    return (prevIndex - 1 + slides.length) % slides.length; // Quay lại slide trước
                }
                return prevIndex;
            });
            setIsFadingOut(false);  // Sau khi thay đổi slide, dừng fade-out
        }, 2000); // Thời gian fade-out (2 giây)
    };

    const handlePrevSlide = () => {
        changeSlide('prev');
    };

    const handleNextSlide = () => {
        changeSlide('next');
    };

    return (
        <section
            key={slides[currentSlideIndex].image}  // Đảm bảo React nhận diện lại khi slide thay đổi
            className="relative h-[600px] bg-cover bg-center flex items-center justify-center text-white text-center transition-all duration-500"
            style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}  // Cập nhật ảnh nền
        >
            <div
                className={`transition-opacity ${isFadingOut ? 'opacity-0' : 'opacity-100'} transform transition-all duration-1000`}
            >
                <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">{slides[currentSlideIndex].text}</h2>
                <p className="text-xl mb-6 drop-shadow-md">Crafting excellence in every piece we make.</p>
                <button className="bg-yellow-500 text-black px-8 py-4 text-lg rounded-lg shadow-lg font-bold uppercase tracking-wide hover:bg-yellow-600 transition">
                    Get a Quote
                </button>
            </div>

            {/* Nút lùi lại slide */}
            <button
                onClick={handlePrevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
            >
                <i className="fas fa-chevron-left"></i> {/* Icon Font Awesome cho nút Prev */}
            </button>

            {/* Nút tiến tới slide tiếp theo */}
            <button
                onClick={handleNextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
            >
                <i className="fas fa-chevron-right"></i> {/* Icon Font Awesome cho nút Next */}
            </button>
        </section>
    );
};

export default Banner;



<section className="relative h-[600px] bg-[url('./img/slider.jpg')] bg-cover bg-center flex items-center justify-center text-white text-center">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">Quality Carpentry & Woodwork</h2>
        <p className="text-xl mb-6 drop-shadow-md">Crafting excellence in every piece we make.</p>
        <button className="bg-yellow-500 text-black px-8 py-4 text-lg rounded-lg shadow-lg font-bold uppercase tracking-wide hover:bg-yellow-600 transition">Get a Quote</button>
    </motion.div>
</section>


const HeroSection = () => {
    return (
        <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: "url('/your-background.jpg')" }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 flex h-full">
                {/* Left Section */}
                <div className="flex flex-col justify-center pl-20 w-1/2 text-white space-y-6">
                    <h1 className="text-5xl font-bold leading-tight">
                        THE BEST WOODFACTORY
                        <br />
                        OF ALL TIME
                    </h1>
                    <p className="text-yellow-600 text-xl font-semibold">
                        Perfect Furniture Design
                    </p>
                    <p className="text-white text-base max-w-md">
                        Craftsman Template will help you grow your business.
                    </p>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-6 py-3 rounded mt-2 w-max">
                        BUY IT NOW
                    </button>
                </div>

                {/* Right Section: Worker Image */}
                <div className="flex items-end justify-end w-1/2 pr-20">
                    <img
                        src="/worker.png"
                        alt="Worker"
                        className="h-[500px] object-contain"
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <button className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full">
                &#8249;
            </button>
            <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full">
                &#8250;
            </button>
        </div>
    );
};

export default HeroSection;

import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

const projects = [
    {
        image: './img/blog-post03.png',
        title: 'LUXURY HOUSE',
        category: 'HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'INTERIOR LAMINATE FLOORING',
        category: 'LAMINATE FLOORING',
    },
    {
        image: './img/blog-post03.png',
        title: 'VILA IN LA',
        category: 'HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'LUXURY HOUSE IN HAWAI',
        category: 'HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'CLASSIC DESIGN',
        category: 'INTERIOR, HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'NEW KITCHEN DESIGN',
        category: 'INTERIOR, KITCHENS',
    },
    {
        image: './img/blog-post03.png',
        title: 'WOODEN FURNITURE',
        category: 'INTERIOR',
    },
    {
        image: './img/blog-post03.png',
        title: 'MODERN VILLA',
        category: 'HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'OFFICE INTERIOR',
        category: 'INTERIOR',
    },
    {
        image: './img/blog-post03.png',
        title: 'BATHROOM DESIGN',
        category: 'INTERIOR',
    },
    {
        image: './img/blog-post03.png',
        title: 'BACKYARD PROJECT',
        category: 'HOUSES',
    },
    {
        image: './img/blog-post03.png',
        title: 'WOOD PANEL WALLS',
        category: 'LAMINATE FLOORING',
    },
];

const ProjectCard = ({ item }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className="relative bg-white shadow hover:shadow-xl transition duration-300 group overflow-hidden"
        >
            {inView && (
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition duration-500"></div>
            <div className="relative z-10 p-4 border-t border-b border-orange-500 bg-white">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm uppercase text-orange-600 mt-1 tracking-wide">{item.category}</p>
            </div>
        </div>
    );
};

const ProjectsPage = () => {
    const [filter, setFilter] = useState('ALL');
    const [visibleCount, setVisibleCount] = useState(6);
    const loadMoreRef = useRef(null);

    const filteredProjects = filter === 'ALL'
        ? projects
        : projects.filter(p => p.category.toLowerCase().includes(filter.toLowerCase()));

    const filters = ['ALL', 'HOUSES', 'INTERIOR', 'KITCHENS', 'LAMINATE FLOORING'];

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 6, filteredProjects.length));
    };

    useEffect(() => {
        if (loadMoreRef.current) {
            loadMoreRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [visibleCount]);

    return (
        <Layout>
            <section className="py-12 px-4 max-w-7xl mx-auto">
                <div className="mb-8 flex flex-wrap gap-4 justify-center">
                    {filters.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setFilter(cat);
                                setVisibleCount(6);
                            }}
                            className={`px-4 py-2 text-sm font-semibold rounded-full border transition ${
                                filter === cat ? 'bg-orange-500 text-white' : 'bg-white text-gray-800 border-gray-300 hover:bg-orange-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.slice(0, visibleCount).map((item, index) => (
                        <ProjectCard key={index} item={item} />
                    ))}
                </div>

                {visibleCount < filteredProjects.length && (
                    <div ref={loadMoreRef} className="flex justify-center mt-10">
                        <button
                            onClick={handleLoadMore}
                            className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow hover:bg-orange-600 transition"
                        >
                            Load More
                        </button>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProjectsPage;
