import { Link } from 'react-router-dom';

export default function ServiceTabDetail({ tab }) {
    if (!tab) return null;

    return (
        <div className="flex flex-col md:flex-row items-start gap-8">
            <div className="md:w-1/2 space-y-4">
                <p className="text-sm text-orange-500 font-semibold uppercase tracking-wider">What We Do</p>
                <h2 className="text-3xl font-bold text-gray-800">{tab.title}</h2>
                <p className="text-gray-700 text-base leading-relaxed">{tab.description}</p>
                <p className="text-gray-500 text-sm">{tab.subtext}</p>
                <Link
                    to={tab.url}
                    className="inline-block bg-orange-500 text-white py-2 px-5 rounded shadow hover:bg-orange-600 transition"
                >
                    {tab.action}
                </Link>
            </div>
            <div className="md:w-1/2">
                <img
                    src={tab.image}
                    alt={tab.title}
                    className="w-full h-auto rounded-xl shadow-md"
                />
            </div>
        </div>
    );
}
