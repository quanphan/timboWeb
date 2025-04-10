import React from "react";

const Template = ({ title, content }) => {
    return (
        <div className="p-6 bg-gray-100 rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <p className="text-gray-700">{content}</p>
        </div>
    );
};
export default Template;