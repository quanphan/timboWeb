import React from "react";
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
const HandCrafting = () => {
    return (
        <div className="container mx-auto px-6">
            <h3 className="text-yellow-700 font-semibold">SERVICES</h3>
            <h2 className="text-4xl font-bold">HAND CRAFTING</h2>
            <div className="mt-6 space-y-6">
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
        </div>
    );
};

export default HandCrafting;
