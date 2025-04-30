import React, { useState } from "react";

const categories = [
    { name: "All", type: "all" },
    { name: "Design", type: "design" },
    { name: "Interior", type: "interior" },
    { name: "Laminate Flooring", type: "laminate" },
    { name: "House Furniture", type: "furniture" },
    { name: "Wood Art", type: "woodart" }
];

const images = [
    { src: "./img/portfolio01.png", type: "design",url: "/" },
    { src: "./img/portfolio02.png", type: "interior" ,url: "/design"},
    { src: "./img/portfolio03.png", type: "laminate" ,url: "/design"},
    { src: "./img/portfolio04.png", type: "furniture" ,url: "/design"},
    { src: "./img/portfolio04.png", type: "woodart" ,url: "/design"},
    { src: "./img/portfolio06.png", type: "design" ,url: "/design"}
];

const WoodworkGallery = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredImages = selectedCategory === "all" ? images : images.filter(img => img.type === selectedCategory);

    return (
        <div className=" max-w-7xl mx-auto text-white pb-10">
            <div className="flex justify-center space-x-4 py-6">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Our Work</h2>
            </div>
            {/* Filter Buttons */}
            <div className="flex justify-center space-x-4 py-6">
                {categories.map((category, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedCategory(category.type)}
                        className={`px-6 py-2 font-semibold border transition ${selectedCategory === category.type ? 'bg-yellow-600 border-yellow-500' : 'bg-yellow-700 border-yellow-600 hover:bg-yellow-600'}`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                {filteredImages.map((image, index) => (
                    <div key={index} className="relative group overflow-hidden">
                        <img
                            src={image.src}
                            alt="Woodwork Sample"
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform cursor-pointer"
                            onClick={() => window.location.href = image.url}
                        />
                        { selectedCategory === "all" && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xl font-bold">BUILDING AT NIGHT</span>
                                <span className="text-sm">APARTMENT, ARCHITECTURE</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WoodworkGallery;
