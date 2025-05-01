import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaBoxOpen, FaPen } from 'react-icons/fa';
import AdminMessages from './Ad_MessageList';
import AdminProducts from './Ad_Products';
// import AdminPosts from './AdminPosts';

export default function AdminPage() {
    const tabs = [
        { id: 'messages', label: 'Messages', icon: <FaEnvelope /> },
        { id: 'products', label: 'Products', icon: <FaBoxOpen /> },
        { id: 'posts', label: 'Posts', icon: <FaPen /> },
    ];

    const [activeTab, setActiveTab] = useState('messages');

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
                <Link
                    to="/"
                    className="text-sm text-orange-500 hover:underline hover:text-orange-600 transition"
                >
                    ← Back to Home
                </Link>
            </div>
            {/* Tabs Navigation */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 border-b mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 py-2 px-3 md:px-4 text-sm font-semibold border-b-2 transition-all ${
                            activeTab === tab.id
                                ? 'border-orange-500 text-orange-500'
                                : 'border-transparent text-gray-600 hover:text-orange-400'
                        }`}
                    >
                        <span className="text-base">{tab.icon}</span>
                        <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div>
                {activeTab === 'messages' && <AdminMessages />}
                {activeTab === 'products' && <AdminProducts />}
                {activeTab === 'posts' && (
                    <div className="text-gray-700">
                        <p>Posts Management - Coming Soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
