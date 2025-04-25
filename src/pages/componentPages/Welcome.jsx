import React from "react";

const Welcome = () => {
    return (
        <section className="pt-20 px-4 sm:px-6 lg:px-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
            {/* Left Content */}
            <div className="w-full lg:w-2/3">
                <h3 className="text-base sm:text-lg lg:text-xl text-yellow-700 uppercase mb-2">Welcome to Craftsman</h3>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">Who We Are</h2>
                <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure odio praesentium sed dignissimos atque enim dolorum assumenda eos vitae,
                    mollitia rem, nam laborum expedita. Natus sint atque possimus similique recusandae consectetur suscipit delectus dolore iure numquam,
                    placeat voluptatem, consequuntur alias officiis vero itaque nesciunt fuga ratione eum deserunt dicta molestias sit excepturi.
                </p>
                <ul className="text-base sm:text-lg text-gray-700 space-y-2">
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Professional Staff</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Latest Mechanical Technology</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Certified Materials</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Very Cheap Prices</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Creative Designers</li>
                    <li className="flex items-center"><span className="text-yellow-500 mr-2">✔</span> Finishing Work Before Deadline</li>
                </ul>
            </div>

            {/* Right Form */}
            <div className="w-full lg:w-1/3 bg-[#5a4228] text-white p-6 sm:p-8 rounded-lg shadow-lg">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">Request a Quote</h2>
                <form className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 rounded bg-white text-black" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 rounded bg-white text-black" />
                    <textarea placeholder="Your Message" className="w-full p-3 rounded bg-white text-black h-32"></textarea>
                    <button className="bg-yellow-600 px-6 py-3 rounded text-white font-bold w-full hover:bg-yellow-700 transition">Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Welcome;
