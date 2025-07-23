
import react, { useEffect, useState } from 'react';

export function Homepage() {
    const [userIcon, setUserIcon] = useState("pictures_homepage/user1.png");
    const [active, setActive] = useState('signup');
    const [showForm, setShowForm] = useState(false);

    function showPrevious() {}
    function showNext() {}

    return (
        <>
            <div>
                <header className="flex flex-1 justify-between items-center p-5 px-12 bg-black bg-opacity-70 fixed w-full top-0 z-20">
                    <div className="text-white text-2xl font-serif">Xperio</div>

                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <ul className="flex gap-10 list-none m-0 p-0">
                            <li><a href="" className="text-white font-bold hover:text-pink-500 text-lg">Explore City</a></li>
                            <li><a href="" className="text-white font-bold hover:text-pink-500 text-lg">Translation</a></li>
                            <li><a href="" className="text-white font-bold hover:text-pink-500 text-lg">Premium</a></li>
                        </ul>
                    </div>

                    <div className="fixed top-5 right-5 z-[1000]">
                        <img
                            src={userIcon}
                            id="userIcon"
                            onMouseOver={() => setUserIcon("pictures_homepage/user1.png")}
                            onMouseOut={() => setUserIcon("pictures_homepage/user.png")}
                            onClick={() => setShowForm(true)}
                            alt="User Icon"
                            className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer hover:scale-110 transition-transform"
                        />
                    </div>
                </header>

                <div className="relative w-full h-screen overflow-hidden">
                    <img src="pictures_homepage/celebration.png" className="absolute w-full h-full object-cover opacity-100 transition-opacity duration-1000 active" />
                    <img src="pictures_homepage/holi.png" className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000" />
                    <img src="pictures_homepage/street_2.png" className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000" />
                    <img src="pictures_homepage/streets.png" className="absolute w-full h-full object-cover opacity-0 transition-opacity duration-1000" />

                    <div className="absolute top-1/2 left-24 transform -translate-y-1/2 text-white font-serif z-10 text-left drop-shadow-lg">
                        <h1 className="text-5xl mb-2">Discover Local Culture</h1>
                        <p className="text-xl mb-4">Explore food, festivals & heritage</p>
                        <a href="#explore" className="inline-block px-6 py-3 bg-black bg-opacity-50 text-white font-bold rounded hover:bg-black transition">Explore Now</a>
                    </div>
                </div>

                <section className="w-full py-16 px-5 text-center bg-[#f9f9f9] min-h-[400px]">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent mb-10">Testimonials</h2>
                    <div className="flex items-center justify-center relative max-w-[900px] mx-auto">
                        <button className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer text-gray-800 hover:text-pink-500">&#10094;</button>
                        <div className="w-full max-w-[600px] p-8 bg-white shadow-lg rounded-2xl text-left transition-all duration-500 min-h-[250px]">
                            {/* dynamically filled */}
                        </div>
                        <button className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer text-gray-800 hover:text-pink-500">&#10095;</button>
                    </div>
                </section>

                <div className="flex justify-between items-center bg-[#edf4fa] p-10 rounded-2xl my-12 mx-auto max-w-[1400px] shadow-md">
                    <div className="max-w-[600px]">
                        <h1 className="text-[38px] font-bold text-black mb-4">Become a Culture Tripper!</h1>
                        <p className="text-lg text-[#222] mb-6">Sign up to our newsletter to get notified for new trips.</p>
                        <div className="flex gap-3 mb-4">
                            <input type="email" placeholder="E-mail address" className="px-5 py-3 w-[360px] text-base rounded-full border border-gray-300 outline-none" />
                            <button className="px-7 py-3 bg-black text-white text-base rounded-full border-none cursor-pointer hover:bg-gray-800 transition">Sign Up</button>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">See our <a href="" className="text-black underline">privacy policy</a>.</p>
                        <p className="text-sm text-gray-600">This site is protected by reCAPTCHA and the Google <a href="" className="text-black underline">Privacy Policy</a> and <a href="" className="text-black underline">Terms of Service</a> apply.</p>
                    </div>
                    <div>
                        <img src="pictures_homepage/bee.png" alt="illustration" className="max-w-[500px] h-auto" />
                    </div>
                </div>

                {showForm && (
                    <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center z-[999]">
                        <div className="bg-white p-8 rounded-lg w-[300px] relative">
                            <div className="flex justify-around mb-5">
                                <button className={`px-4 py-2 font-bold ${active === 'login' ? 'bg-gray-300' : 'bg-gray-100'}`} onClick={() => setActive('login')}>Login</button>
                                <button className={`px-4 py-2 font-bold ${active === 'signup' ? 'bg-gray-300' : 'bg-gray-100'}`} onClick={() => setActive('signup')}>Signup</button>
                            </div>

                            {active === 'login' && (
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl font-semibold">Login</h2>
                                    <input type="email" placeholder="Email" className="border p-2 rounded" />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" />
                                    <button className="bg-black text-white py-2 rounded">Login</button>
                                </div>
                            )}

                            {active === 'signup' && (
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-xl font-semibold">Signup</h2>
                                    <input type="text" placeholder="Full Name" className="border p-2 rounded" />
                                    <input type="email" placeholder="Email" className="border p-2 rounded" />
                                    <input type="password" placeholder="Password" className="border p-2 rounded" />
                                    <button className="bg-black text-white py-2 rounded">Signup</button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
