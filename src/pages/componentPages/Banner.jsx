import React, { useState, useEffect } from 'react';

const Banner = () => {
    const slides = [
        { image: './img/slider.jpg', text: 'Quality Carpentry & Woodwork', subText:'Crafting excellence in every piece we make.'},
        { image: './img/slider2.jpg', text: 'TIMBO CRAFT\n' + 'EASY TO USE CARPENTRY TEMPLATE',
            subText:'Amaze your customers. \n' + 'Best Template for Carpentry/Woodwork.'},
        { image: './img/slider3.jpg', text: 'DESIGN - QUALITY - EXPERIENCE' ,subText:'We create beautiful art from Woodwork'},
    ];

    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    const changeSlide = (direction) => {
        setIsFadingOut(true); // Bắt đầu hiệu ứng fade-out

        setTimeout(() => {
            setCurrentSlideIndex((prevIndex) => {
                if (direction === 'next') {
                    return (prevIndex + 1) % slides.length;
                } else if (direction === 'prev') {
                    return (prevIndex - 1 + slides.length) % slides.length;
                }
                return prevIndex;
            });
            setIsFadingOut(false); // Hiển thị lại fade-in
        }, 1000); // Thời gian fade-out (1 giây)
    };

    const handlePrevSlide = () => {
        changeSlide('prev');
    };

    const handleNextSlide = () => {
        changeSlide('next');
    };

    useEffect(() => {
        if (!isHovered) {
            const id = setInterval(() => {
                handleNextSlide();
            }, 10000); // Chạy tự động sau 10 giây
            setIntervalId(id);

            return () => clearInterval(id);
        }
    }, [isHovered]);

    return (
        <section
            key={slides[currentSlideIndex].image}
            className="relative h-[500px] bg-cover bg-center flex items-center justify-center text-white text-center transition-all duration-500"
            style={{ backgroundImage: `url(${slides[currentSlideIndex].image})` }}
            onMouseEnter={() => {
                setIsHovered(true);
                clearInterval(intervalId); // Dừng bộ đếm thời gian khi hover
            }}
            onMouseLeave={() => setIsHovered(false)} // Bật lại bộ đếm khi rời chuột
        >
            {/* Nội dung văn bản */}
            <div
                className={`transition-opacity ${isFadingOut ? 'opacity-0' : 'opacity-100'} transform transition-all duration-1000`}
            >
                <h2 className="text-6xl font-bold mb-4 drop-shadow-lg">{slides[currentSlideIndex].text}</h2>
                <p className="text-xl mb-6 drop-shadow-md">Crafting excellence in every piece we make.</p>
                <button className="bg-yellow-500 text-black px-8 py-4 text-lg rounded-lg shadow-lg font-bold uppercase tracking-wide hover:bg-yellow-600 transition">
                    Get a Quote
                </button>
            </div>

            {/* Nút lùi lại slide - Chỉ hiển thị khi hover */}
            {isHovered && (
                <button
                    onClick={handlePrevSlide}
                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
                >
                    &#8249;
                </button>
                // <button className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full">
                // &#8249;
                // </button>
            )}

            {/* Nút tiến tới slide tiếp theo - Chỉ hiển thị khi hover */}
            {isHovered && (
                <button
                    onClick={handleNextSlide}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition"
                >
                    &#8250;
                </button>

                // <button className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full">
                // &#8250;
                // </button>
            )}
        </section>
    );
};

export default Banner;
