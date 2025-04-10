import React from "react";

const blogPosts = [
    {
        image: "./img/blog-post01.png",
        title: "MOUNTAIN MIGHT GET 'EM BUT THE LAW",
        date: "July 10, 2015",
        comments: 10,
        text:
            "This is what we call the Muppet Show. As long as we live its you and me baby. There ain't nothin' wrong with that. Straightnin' the curves.",
        iconType: "image"
    },
    {
        image: "./img/blog-post02.png",
        title: "MOST CELEBRATIONAL MUPPETATIONAL",
        date: "July 10, 2015",
        comments: 13,
        text:
            "Town to town and up and down the dial. Said Califor\'ny is the place you ought to be So they loaded up the truck and moved to Beverly.",
        iconType: "image"
    },
    {
        image: "./img/blog-post03.png",
        title: "EAST SIDE TO A DELUXE APARTMENT",
        date: "July 09, 2015",
        comments: 9,
        text:
            "Today still wanted by the government they survive as soldiers of fortune? That this group would somehow form a family Brady Bunch.",
        iconType: "video"
    }
];

const BlogSection = () => {
    return (
        <div className="px-10 py-16 bg-white">
            <p className="text-yellow-700 font-semibold uppercase tracking-widest text-sm mb-2">Blog</p>
            <h2 className="text-4xl font-bold mb-10">Company News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                    <div
                        key={index}
                        className="border rounded shadow-sm overflow-hidden bg-white"
                    >
                        <div className="relative">
                            <img src={post.image} alt={post.title} className="w-full h-60 object-cover" />
                            <div className="absolute -bottom-5 left-5 bg-yellow-700 p-2 rounded-full">
                                {post.iconType === "image" ? (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M4 16l4-4a3 3 0 0 1 4 0l4 4m-2-10h6m-6 4h6m-6 4h6"></path>
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M15 10l4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14V10z" />
                                        <rect x="3" y="6" width="12" height="12" rx="2" ry="2" />
                                    </svg>
                                )}
                            </div>
                        </div>
                        <div className="p-6 pt-8">
                            <h3 className="font-semibold text-sm text-gray-700 uppercase mb-2">
                                {post.title}
                            </h3>
                            <div className="flex items-center text-xs text-gray-500 space-x-4 mb-3">
                                <div className="flex items-center space-x-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                                    </svg>
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                    <span>{post.comments < 10 ? `0${post.comments}` : post.comments} Comments</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {post.text}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogSection;
