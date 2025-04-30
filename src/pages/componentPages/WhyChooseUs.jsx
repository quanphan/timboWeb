import React from "react";

const WhyChooseUs = () => {
    return (
        <div className="text-black py-16 px-8 md:flex md:items-center md:justify-between">
            <div className="max-w-2xl">
                <h3 className="text-yellow-700 font-semibold">FEATURES</h3>
                <h2 className="text-4xl font-bold">WHY CHOOSE US</h2>
                <div className="mt-6 space-y-6">
                    <div className="flex items-start space-x-4">
                        <div className="text-yellow-700 text-3xl">💰</div>
                        <div>
                            <h4 className="font-bold">35 Years Of Experience In Woodwork Business</h4>
                            <p className="text-gray-600">
                                Groovin' all week with you. And we'll do it our way yes our way. Make all our dreams come true for me and you.
                                You wanna be where you can see our troubles are all the same. You wanna be where everybody knows Your name.
                                It's time to play the music. <br/> <br/>

                                Then one day he was shootin' at some food and up through the ground came a bubblin' crude.
                                Oil that is. Here's the story of a lovely lady who was bringing
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="text-gray-400 text-3xl">⚙️</div>
                        <div>
                            <h4 className="font-bold">More than 1000 Customers</h4>
                        </div>
                    </div>
                    <div className="flex items-start space-x-4">
                        <div className="text-gray-400 text-3xl">📦</div>
                        <div>
                            <h4 className="font-bold">Using Latest Technology In Our Work</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8 md:mt-0">
                <img src="./img/man.png" alt="Worker" className="max-w-xs mx-auto" />
            </div>
        </div>
    );
};

export default WhyChooseUs;
