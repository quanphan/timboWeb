import React, { useState, useRef, useEffect } from "react";
import Layout from "./Layout";
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

const ProjectCard = ({ item, onClick }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div
            ref={ref}
            className="relative bg-white shadow hover:shadow-xl transition duration-300 group overflow-hidden cursor-pointer"
            onClick={() => onClick(item.image)}
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
    const [lightboxImage, setLightboxImage] = useState(null);

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
                        <ProjectCard key={index} item={item} onClick={setLightboxImage} />
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

                {lightboxImage && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center" onClick={() => setLightboxImage(null)}>
                        <img
                            src={lightboxImage}
                            alt="Full view"
                            className="max-w-7xl max-h-[90vh] rounded-lg shadow-xl border-4 border-white"
                        />
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default ProjectsPage;
