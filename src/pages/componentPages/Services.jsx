import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceSection() {
    const tabs = [
        {
            id: 1,
            label: 'Wood & Wooden Products',
            icon: '🪵',
            title: 'Wood & Wooden Products',
            description:
                'Let us help you bring the outside of your home to life. Whether it’s modern, classic or rustic — we create welcoming exteriors that reflect your style.',
            subtext:
                'From gardens to facades, we craft spaces that shine from the street. Every detail matters.',
            image: './img/service2.webp',
            action: 'Shop now',
            url: '/shop',
        },
        {
            id: 2,
            label: 'Woodworking Tools',
            icon: '🛠️',
            title: 'Woodworking Tools',
            description:
                'These are the voyages of the Starship Enterprise. We’re gonna do it. Give us any chance we’ll take it. Give us any rule we’ll break it.',
            subtext:
                'Take a step that is new. We’ve a loveable space that needs your face. Sometimes you want to go where everybody knows your name.',
            image: './img/service2.webp',
            action: 'Shop now',
            url: '/shop',
        },
        {
            id: 3,
            label: 'Woodcraft design',
            icon: '🎨',
            title: 'Woodcraft design',
            description:
                'Build comfort and style for the whole family. From cozy sofas to clever storage, we make home feel like home.',
            subtext:
                'Furniture that fits your life, your budget, and your living space — handcrafted or modular, we’ve got you.',
            image: './img/about-us.webp',
            action: 'Go To Blog',
            url: '/blog',
        },
        {
            id: 4,
            label: 'Handcrafted Guitars',
            icon: '🎸',
            title: 'Handcrafted Guitars',
            description:
                'We lay it down right. Affordable, stylish, and durable laminate solutions for every room in your house.',
            subtext:
                'Scratch-resistant, easy to clean, and available in a variety of finishes — your floors, your rules.',
            image: './img/service2.webp',
            action: 'Shop now',
            url: '/shop',
        },
    ];

    const [activeTabId, setActiveTabId] = useState(2);
    const activeTab = tabs.find((tab) => tab.id === activeTabId);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-4 border-b mb-8 relative">
                {tabs.map((tab) => (
                    <div
                        key={tab.id}
                        className="relative flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setActiveTabId(tab.id)}
                            className={`py-3 px-2 w-full border-b-2 flex flex-col items-center transition-all duration-200 ${
                                activeTabId === tab.id
                                    ? 'border-orange-500 text-orange-500 '
                                    : 'border-transparent text-gray-600 hover:text-orange-400 hover:bg-orange-50'
                            }`}
                        >
                            <span className={`text-2xl ${activeTabId === tab.id ? 'font-bold' : ''}`}>{tab.icon}</span>
                            {activeTabId === tab.id && (
                                <span className="text-xs mt-1 block sm:hidden">{tab.label}</span>
                            )}
                            <span className="hidden sm:block text-xs mt-1">{tab.label}</span>
                        </button>
                    </div>
                ))}
            </div>

            {/* Nội dung tab */}
            <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/2 space-y-4">
                    <p className="text-sm text-orange-500 font-semibold uppercase tracking-wider">What We Do</p>
                    <h2 className="text-3xl font-bold text-gray-800">{activeTab.title}</h2>
                    <p className="text-gray-700 text-base leading-relaxed">{activeTab.description}</p>
                    <p className="text-gray-500 text-sm">{activeTab.subtext}</p>
                    <Link
                        to={activeTab.url}
                        className="inline-block bg-orange-500 text-white py-2 px-5 rounded shadow hover:bg-orange-600 transition"
                    >
                        {activeTab.action}
                    </Link>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={activeTab.image}
                        alt={activeTab.title}
                        className="w-full h-auto rounded-xl shadow-md"
                    />
                </div>
            </div>
        </div>
    );
}
