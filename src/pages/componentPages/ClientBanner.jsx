import React from "react";

const ClientBanner = () => {
    return (
        <div className="bg-[#5A3E2B] text-white py-12 grid grid-cols-2 md:grid-cols-4 text-center">
            <div>
                <div className="text-3xl">👍</div>
                <h3 className="text-2xl font-bold">120</h3>
                <p>HAPPY CLIENTS</p>
            </div>
            <div>
                <div className="text-3xl">🚀</div>
                <h3 className="text-2xl font-bold">213</h3>
                <p>PROJECTS DONE</p>
            </div>
            <div>
                <div className="text-3xl">👥</div>
                <h3 className="text-2xl font-bold">72</h3>
                <p>PROFESSIONAL STAFF</p>
            </div>
            <div>
                <div className="text-3xl">⭐</div>
                <h3 className="text-2xl font-bold">35</h3>
                <p>AWARD WON</p>
            </div>
        </div>
    );
};

export default ClientBanner;
