import React, { useState, useEffect } from "react";

const testimonials = [
    {
        name: "Chris Evans",
        location: "Sydney, Australia",
        quote:
            "Mountaineer barely kept his family fed. Well the first thing you know ol' Jed's a millionaire. said Jed move away from there.",
        image: "https://i.pravatar.cc/100?img=2"
    },
    {
        name: "Hendric Zik",
        location: "Sydney, Australia",
        quote:
            "Mountaineer barely kept his family fed. Well the first thing you know ol' Jed's a millionaire. said Jed move away from there.",
        image: "https://i.pravatar.cc/100?img=3"
    },
    {
        name: "Mike Hizu",
        location: "Sydney, Australia",
        quote:
            "Mountaineer barely kept his family fed. Well the first thing you know ol' Jed's a millionaire. said Jed move away from there.",
        image: "https://i.pravatar.cc/100?img=1"
    }
];

export default function TestimonialsSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-[#f9f1e7] py-20 text-center">
            <div className="max-w-6xl mx-auto px-4">
                <p className="text-sm text-left text-[#9e6c2d] font-medium uppercase tracking-widest mb-1">
                    Testimonials
                </p>
                <h2 className="text-4xl font-bold mb-20 text-left">
                    What Our Clients Say
                </h2>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className={`relative transition-all duration-300 flex flex-col items-center ${
                                    i === activeIndex ? "opacity-100" : "opacity-50"
                                }`}
                            >
                                <div className="relative bg-white rounded-2xl shadow-sm px-6 pt-10 pb-10 border text-center max-w-sm">
                                    <p className="italic text-gray-600 text-sm leading-relaxed">
                                        {t.quote}
                                    </p>
                                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-3 w-6 h-6 bg-white rotate-45 border-l border-b border-gray-200"></div>
                                </div>
                                <div className="flex flex-col items-center mt-10">
                                    <img
                                        src={t.image}
                                        alt={t.name}
                                        className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                                    />
                                    <h4 className="font-bold text-[#9e6c2d] uppercase text-sm tracking-wider mt-4">
                                        {t.name}
                                    </h4>
                                    <p className="text-xs text-gray-600 mt-1">{t.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex justify-center gap-3">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`h-2 w-6 rounded-full transition-all duration-300 focus:outline-none ${
                                    i === activeIndex ? "bg-[#9e6c2d]" : "bg-gray-300"
                                }`}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
