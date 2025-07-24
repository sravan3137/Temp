

import React, { useEffect, useState } from 'react';
import {Heart} from 'lucide-react';

export function Homepage() {
    const [userIcon, setUserIcon] = useState("pictures_homepage/user1.png");
    const [active, setActive] = useState('signup');
    const [showForm, setShowForm] = useState(false);
    const [showTranslator, setShowTranslator] = useState(false);
    const [showPremium, setShowPremium] = useState(false);
    const [dummy,setDummy] = useState(true);
    const slides = [
        "pictures_homepage/celebration.png",
        "pictures_homepage/holi.png",
        "pictures_homepage/street_2.png",
        "pictures_homepage/streets.png"
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [loggedIn,setLoggedIn] = useState(JSON.parse(sessionStorage.getItem("loggedIn")|| "false"));
    
    const favourites = {
        "Hyderabadi Biryani": false,
        "Vada Pav": false,
        "Delhi Chaat": false,
        "Kathakali Dance": false,
        "Rajasthani Puppetry": false,
        "Durga Puja": false,
        "Bhangra Dance": false,
        "Pongal / Sankranti": false,
        "Garba Dance": false
      };
      const [fav, setFav] = useState(() => {
        const stored = sessionStorage.getItem("fav");
        return stored ? JSON.parse(stored) : favourites;
      });
    function handleExploreClick() {
        const exploreSection = document.getElementById("xperio-categories");
        if (exploreSection) {
            exploreSection.scrollIntoView({ behavior: "smooth" });
        }
    }
    function handleLogin() {
        console.log(loggedIn);
        sessionStorage.setItem("loggedIn",JSON.stringify(true));
        setLoggedIn(true);
        setShowForm(false);
    }
    function handleLogout(){
        sessionStorage.removeItem("loggedIn");
        setShowForm(false);
        setLoggedIn(false);
        // setDummy(!dummy);

    }
    function handleFav(name){
        setFav((prev)=>({
            ...prev,
            [name]:!prev[name]
        }));
        sessionStorage.setItem("fav",JSON.stringify(setFav));
    }
    const testimonials = [
        {
            name: "Ananya Sharma",
            message: "Xperio made my trip unforgettable! I experienced festivals like a true local.",
        },
        {
            name: "Rahul Mehra",
            message: "The cultural insights and easy translations helped me navigate new cities with confidence.",
        },
        {
            name: "Lara Thomas",
            message: "Loved discovering hidden street food gems. Highly recommended!",
        }
    ];
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const [email, setEmail] = useState('');
    const [signedUp, setSignedUp] = useState(false);
    const [emailError, setEmailError] = useState('');
    useEffect(() => {
        sessionStorage.setItem("fav", JSON.stringify(fav || favourites));
      }, [fav]);

    useEffect(() => {
        const img = new Image();
        img.src = slides[0];
        img.onload = () => setIsImageLoaded(true);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [slides.length]);

    function showPrevious() {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }

    function showNext() {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }

    const handleNewsletterSignup = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.trim()) {
            setEmailError('Email is required.');
            setSignedUp(false);
            return;
        }

        if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            setSignedUp(false);
            return;
        }

        setSignedUp(true);
        setEmailError('');
        setEmail('');
        setTimeout(() => setSignedUp(false), 4000);
    };

    return (
        <div onClick={()=>setShowForm(false)}>
            {/* Header */}
            <header className="flex flex-1 justify-between items-center p-5 px-12 bg-black bg-opacity-70 fixed w-full top-0 z-20">
                <div className="text-white text-2xl font-serif">Xperio</div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    
                    
                        
                    <div className="flex space-x-4 mb-4">
                      <button
                        onClick={() => setShowTranslator(true)}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow hover:shadow-lg transition"
                      >
                        Translator
                      </button>
                      <button
                        onClick={() => setShowPremium(true)}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold rounded-lg shadow hover:shadow-lg transition"
                      >
                        Premium
                      </button>
                    </div>
                </div>
                <div className="fixed top-5 right-5 z-[1000]">
                    <img
                        src={userIcon}
                        onMouseOver={() => setUserIcon("pictures_homepage/user1.png")}
                        onMouseOut={() => setUserIcon("pictures_homepage/user.png")}
                        onClick={(e) => {e.stopPropagation();setShowForm(true);console.log(loggedIn);}}
                        alt="User Icon"
                        className="w-[50px] h-[50px] rounded-full object-cover cursor-pointer hover:scale-110 transition-transform"
                    />
                </div>
            </header>

            {/* Slideshow */}
            {isImageLoaded ? (
                <div className="relative w-full h-screen overflow-hidden">
                    {slides.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                            alt={`slide-${index}`}
                        />
                    ))}
                    <div className="absolute top-1/2 left-24 transform -translate-y-1/2 text-white font-serif z-10 text-left drop-shadow-lg">
                        <h1 className="text-5xl mb-2">Discover Local Culture</h1>
                        <p className="text-xl mb-4">Explore food, festivals & heritage</p>
                        <button
                            onClick={handleExploreClick}
                            className="inline-block px-6 py-3 bg-black bg-opacity-50 text-white font-bold rounded hover:bg-black transition"
                        >
                            Explore Now
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-screen bg-black flex items-center justify-center">
                    <p className="text-white font-bold text-xl">Loading...</p>
                </div>
            )}

            {/* Featured Sections */}
            <div id="xperio-categories" className="p-8 space-y-20">
        
        {/* Xperio Food Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 relative">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Xperio Food</h2>
          <p className="text-gray-600 mb-4">Discover trending street food from across India.</p>
          
          {/* You can add your food items, cards, or images here */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Example item */}
            {/* Food Item 1 */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <img src="pictures_homepage\biryani.jpg" alt="Hyderabadi Biryani" className="rounded-xl mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">Hyderabadi Biryani <Heart className={`h-5 mt-2 ${fav['Hyderabadi Biryani']?'fill-red-400':'text-red-500'} `} onClick={()=>handleFav('Hyderabadi Biryani')}/></h3>
        <p className="text-gray-500">Hyderabad</p>
        <p className="mt-2 font-bold text-green-600">₹150</p>
      </div>
      {/* Food Item 2 */}
      <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <img src="pictures_homepage\vadapav.jpg" alt="Vada Pav" className="rounded-xl mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Vada Pav
  <Heart className={`h-5 mt-2 ${fav['Vada Pav'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Vada Pav')} />
</h3>
        <p className="text-gray-500">Mumbai</p>
        <p className="mt-2 font-bold text-green-600">₹40</p>
      </div>
      {/* Food Item 3 */}
      
      <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
        <img src="pictures_homepage\chat.jpg" alt="Delhi Chaat" className="rounded-xl mb-4 w-full h-48 object-cover" />
        <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Delhi Chaat
  <Heart className={`h-5 mt-2 ${fav['Delhi Chaat'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Delhi Chaat')} />
</h3>
        <p className="text-gray-500">Delhi</p>
        <p className="mt-2 font-bold text-green-600">₹60</p>
      </div>
          </div>
        </section>
            <section className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Xperio Culture</h2>
            <p className="text-gray-600 mb-4">Cultural attractions across India</p>
            {/* <button className="absolute left-4 top-15">left</button> */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Culture Item 1 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/kathhak.jpg" alt="Kathakali Dance" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Kathakali Dance
  <Heart className={`h-5 mt-2 ${fav['Kathakali Dance'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Kathakali Dance')} />
</h3>
                <p className="text-gray-500">Kerala</p>
                <p className="mt-2 font-bold text-purple-600">Traditional Classical Art</p>
                </div>

                {/* Culture Item 2 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/puppets.jpeg" alt="Rajasthani Puppetry" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Rajasthani Puppetry
  <Heart className={`h-5 mt-2 ${fav['Rajasthani Puppetry'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Rajasthani Puppetry')} />
</h3>
                <p className="text-gray-500">Rajasthan</p>
                <p className="mt-2 font-bold text-purple-600">Folk Performing Art</p>
                </div>

                {/* Culture Item 3 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/puja.jpg" alt="Durga Puja Festival" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Durga Puja
  <Heart className={`h-5 mt-2 ${fav['Durga Puja'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Durga Puja')} />
</h3>
                <p className="text-gray-500">West Bengal</p>
                <p className="mt-2 font-bold text-purple-600">Festival & Ritual</p>
                </div>

                {/* Culture Item 4 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/bhangra.jpg" alt="Bhangra Dhol Dance" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Bhangra Dance
  <Heart className={`h-5 mt-2 ${fav['Bhangra Dance'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Bhangra Dance')} />
</h3>
                <p className="text-gray-500">Punjab</p>
                <p className="mt-2 font-bold text-purple-600">Folk Dance</p>
                </div>

                {/* Culture Item 5 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/pongal.jpg" alt="Pongal/Sankranti" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Pongal / Sankranti
  <Heart className={`h-5 mt-2 ${fav['Pongal / Sankranti'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Pongal / Sankranti')} />
</h3>
                <p className="text-gray-500">Tamil Nadu / Telangana</p>
                <p className="mt-2 font-bold text-purple-600">Harvest Festival</p>
                </div>

                {/* Culture Item 6 */}
                <div className="bg-gray-100 p-4 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
                <img src="pictures_homepage/garba.jpeg" alt="Garba Dance" className="rounded-xl mb-4 w-full h-48 object-cover" />
                <h3 className="text-xl font-semibold text-gray-800 flex flex-row gap-2">
  Garba Dance
  <Heart className={`h-5 mt-2 ${fav['Garba Dance'] ? 'fill-red-400' : 'text-red-500'}`} onClick={() => handleFav('Garba Dance')} />
</h3>
                <p className="text-gray-500">Gujarat</p>
                <p className="mt-2 font-bold text-purple-600">Folk Festival Dance</p>
                </div>
            </div>
            {/* <button className="absolute right-2 my-auto">Right</button> */}
            </section>


        {/* Translator Section */}
        {showTranslator && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-[999] flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
      <button
        onClick={() => setShowTranslator(false)}
        className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500 font-bold"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold text-gray-800 mb-6">XperioTranslator</h2>

      {/* Voice Input */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">🎤 Voice Input</h3>
        <button
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl transition duration-300 flex items-center gap-3"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 1v10m0 0a4 4 0 01-4-4V7a4 4 0 018 0v.5a4 4 0 01-4 4zM5 15h14m-7 0v6" />
          </svg>
          Start Voice Input
        </button>
        <p className="text-sm text-gray-500 mt-2">Microphone permission may be required.</p>
      </div>

      {/* Text Input to Language Translate */}
      <div>
        <h3 className="text-xl font-semibold mb-3 text-gray-700">🌐 Text to Language</h3>
        <textarea
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter text to translate..."
          rows="4"
        ></textarea>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Hindi</option>
            <option>Telugu</option>
            <option>Tamil</option>
            <option>Kannada</option>
            <option>Malayalam</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
            <option>Spanish</option>
          </select>

          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg shadow transition duration-300">
            Translate
          </button>
        </div>

        {/* Output */}
        <div className="mt-4">
          <label className="block text-gray-600 mb-1">Translated Text</label>
          <div className="border border-gray-200 p-3 rounded-lg bg-gray-50 min-h-[60px] text-gray-800">
            {/* Translated text will appear here */}
          </div>
        </div>
      </div>
    </div>
  </div>
)}
      {showPremium && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4">
    <div className="bg-white max-w-3xl w-full rounded-2xl shadow-lg p-8 relative overflow-y-auto max-h-[90vh]">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        onClick={() => setShowPremium(false)}
      >
        ✕
      </button>

      {/* Premium Content */}
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Xperio Premium</h2>
      <p className="text-gray-600 mb-6">Unlock offline maps, travel guides, early access to events, and more.</p>

      <ul className="grid gap-3 mb-6">
        <li className="flex items-center gap-3 text-gray-700">
          <span className="text-yellow-500">✔</span> Offline access (maps, videos, guides)
        </li>
        <li className="flex items-center gap-3 text-gray-700">
          <span className="text-yellow-500">✔</span> Priority support and early event bookings
        </li>
        <li className="flex items-center gap-3 text-gray-700">
          <span className="text-yellow-500">✔</span> Hand-picked experiences & city tips
        </li>
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition duration-300 bg-yellow-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Monthly Plan</h3>
          <p className="text-gray-600 mb-4">Great for short trips and flexible travelers.</p>
          <p className="text-2xl font-bold text-yellow-600">₹199 / month</p>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300">
            Subscribe Now
          </button>
        </div>

        <div className="border rounded-xl p-6 shadow hover:shadow-lg transition duration-300 bg-yellow-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Annual Plan</h3>
          <p className="text-gray-600 mb-4">Perfect for frequent explorers and adventure lovers.</p>
          <p className="text-2xl font-bold text-yellow-600">₹1799 / year</p>
          <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition duration-300">
            Get Premium
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      

      </div>

            {/* Testimonials */}
            <section className="w-full py-16 px-5 text-center bg-[#f9f9f9] min-h-[400px]">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-700 to-pink-500 bg-clip-text text-transparent mb-10">Testimonials</h2>
                <div className="flex items-center justify-center relative max-w-[900px] mx-auto">
                    <button onClick={showPrevious} className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer text-gray-800 hover:text-pink-500">&#10094;</button>
                    <div className="w-full max-w-[600px] p-8 bg-white shadow-lg rounded-2xl text-left transition-all duration-500 min-h-[250px]">
                        <p className="text-xl font-medium mb-4">"{testimonials[currentTestimonial].message}"</p>
                        <p className="text-lg font-semibold text-pink-600">— {testimonials[currentTestimonial].name}</p>
                    </div>
                    <button onClick={showNext} className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 text-3xl cursor-pointer text-gray-800 hover:text-pink-500">&#10095;</button>
                </div>
            </section>

            {/* Newsletter */}
            <div className="flex justify-between items-center bg-[#edf4fa] p-10 rounded-2xl my-12 mx-auto max-w-[1400px] shadow-md">
                <div className="max-w-[600px]">
                    <h1 className="text-[38px] font-bold text-black mb-4">Become a Culture Tripper!</h1>
                    <p className="text-lg text-[#222] mb-6">Sign up to our newsletter to get notified for new trips.</p>
                    <div className="flex gap-3 mb-4">
                        <input
                            type="email"
                            placeholder="E-mail address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-5 py-3 w-[360px] text-base rounded-full border border-gray-300 outline-none"
                        />
                        <button
                            className="px-7 py-3 bg-black text-white text-base rounded-full border-none cursor-pointer hover:bg-gray-800 transition"
                            onClick={handleNewsletterSignup}
                        >
                            Sign Up
                        </button>
                    </div>
                    {emailError && <p className="text-red-600 font-medium mb-2">{emailError}</p>}
                    {signedUp && <p className="text-green-600 font-medium mb-2">You've signed up for our newsletter!</p>}
                    <p className="text-sm text-gray-600 mt-2">
                        See our <a href="#" className="text-black underline">privacy policy</a>.
                    </p>
                    <p className="text-sm text-gray-600">
                        This site is protected by reCAPTCHA and the Google <a href="#" className="text-black underline">Privacy Policy</a> and <a href="#" className="text-black underline">Terms of Service</a> apply.
                    </p>
                </div>
                <div>
                    <img src="pictures_homepage/bee.png" alt="illustration" className="max-w-[500px] h-auto" />
                </div>
            </div>

            {/* Login/Signup Modal */}
            {showForm && ( 
                !loggedIn?
                <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center z-[999]"
                onClick={(e)=>{e.stopPropagation()}}>
                    <div className="bg-white w-[450px] max-h-[90vh] rounded-xl p-6 relative shadow-lg overflow-y-auto transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500 font-bold"
                        >
                            &times;
                        </button>
                        <h2 className="text-lg font-bold mb-4">PROFILE</h2>
                        <hr className="mb-4" />
                        <div className="flex bg-gray-200 rounded-full overflow-hidden mb-6 shadow-inner">
                            <button
                                className={`flex-1 py-2 text-sm font-bold transition duration-300 ${active === 'signup' ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' : 'text-gray-600 hover:text-black'}`}
                                onClick={() => setActive('signup')}
                            >
                                Sign Up
                            </button>
                            <button
                                className={`flex-1 py-2 text-sm font-bold transition duration-300 ${active === 'login' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'text-gray-600 hover:text-black'}`}
                                onClick={() => setActive('login')}
                            >
                                Log In
                            </button>
                        </div>

                        {active === 'login' ? (
                            <div>
                                <h3 className="text-xl font-bold mb-2">You're back!</h3>
                                <p className="text-sm font-semibold mb-3">Access your account by logging in below.</p>
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input type="email" className="w-full border p-2 rounded mb-3" />
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input type="password" className="w-full border p-2 rounded mb-1" />
                                <p className="text-right text-xs text-black underline cursor-pointer mb-3">Forgot password?</p>
                                <button className="w-full bg-black text-white py-2 rounded-full font-bold"
                                        onClick={handleLogin}>Log In</button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-xl font-bold mb-2">Join the community!</h3>
                                <p className="text-sm font-semibold mb-4">Sign up below or continue with</p>
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input type="text" className="w-full border p-2 rounded mb-3" />
                                <label className="block text-sm font-medium mb-1">Email Address</label>
                                <input type="email" className="w-full border p-2 rounded mb-3" />
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <input type="password" className="w-full border p-2 rounded mb-4" />
                                <button className="w-full bg-black text-white py-2 rounded-full font-bold">Sign Up</button>
                            </div>
                        )}

                        <div className="mt-5">
                            <p className="text-center text-sm text-gray-500 mb-3">or continue with</p>
                            <div className="flex flex-col gap-2">
                                <button className="w-full border py-1.5 px-2 rounded hover:bg-gray-100">Continue with Google</button>
                                <button className="w-full border py-1.5 px-2 rounded hover:bg-gray-100">Continue with Apple</button>
                            </div>
                        </div>
                    </div>
                </div>:
                <div className="fixed top-0 left-0 h-screen w-screen bg-black bg-opacity-60 overflow-y-auto flex justify-center items-center z-[999]"
                    >
                  {/* User Dashboard Section */}
                  
        <section className="bg-white rounded-2xl shadow-lg p-8 mt-8" onClick={(e)=>{e.stopPropagation()}}>
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Saved Dashboard</h2>
        <p className="text-gray-600 mb-6">Manage your saved cities, vendors, and personal preferences here.</p>
      
        {/* Saved Cities */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Saved Cities</h3>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {/* Placeholder cards */}
            <div className="min-w-[200px] bg-blue-100 p-4 rounded-lg shadow">Hyderabad</div>
            <div className="min-w-[200px] bg-blue-100 p-4 rounded-lg shadow">Chennai</div>
            <div className="min-w-[200px] bg-blue-100 p-4 rounded-lg shadow">Kolkata</div>
          </div>
        </div>
      
        {/* Bookmarked Vendors/Places/Videos */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Bookmarks</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Charminar Street Vendor</li>
            <li>“Street Food Magic” YouTube Video</li>
            <li>Local Art Gallery – Pune</li>
          </ul>
        </div>
      
        {/* Personalized Recommendations */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Recommended for You</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-100 p-4 rounded-lg">Try “Kolkata Street Eats”</div>
            <div className="bg-green-100 p-4 rounded-lg">Hidden Temples in Tamil Nadu</div>
          </div>
        </div>
      
        {/* Offline Downloads (Premium Only) */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Offline Downloads</h3>
          <p className="text-sm text-gray-500 mb-2">Available for Premium users</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-yellow-100 p-4 rounded-lg shadow">Offline Map: Delhi</div>
            <div className="bg-yellow-100 p-4 rounded-lg shadow">Offline Guide: South India Temples</div>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </section>
      
      </div>

            )}
            <section className="bg-gradient-to-r from-indigo-50 to-white py-16 px-6 sm:px-12 rounded-3xl shadow-xl mb-12">
  <div className="max-w-5xl mx-auto text-center">
    <h2 className="text-4xl font-extrabold text-gray-800 mb-4">About Xperio</h2>
    <p className="text-lg text-gray-600 mb-8">
      Xperio is your personalized gateway to exploring cities like never before.
      From hidden food gems to cultural festivals, language tools to offline guides — Xperio brings
      it all to your fingertips. Whether you're a curious traveler or a local explorer, Xperio helps you
      discover, connect, and experience more, smarter.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Smart Exploration</h3>
        <p className="text-gray-700">
          Discover trending food, culture, and events using real-time local insights and AI-driven recommendations.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Instant Translation</h3>
        <p className="text-gray-700">
          Break language barriers with inline translations, a phrasebook, and voice input powered by your browser.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Premium Features</h3>
        <p className="text-gray-700">
          Go offline, unlock early bookings, and get personalized dashboards and downloads with Premium Access.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">User Accounts</h3>
        <p className="text-gray-700">
          Sign in via Google, Email, or Apple to manage your profile, bookmarks, language preferences, and subscription details.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Support & Feedback</h3>
        <p className="text-gray-700">
          Need help? Reach out via our support portal, email us directly, or send feedback to help us improve your experience.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
        <h3 className="text-xl font-semibold text-indigo-600 mb-2">Contact & Helpdesk</h3>
        <p className="text-gray-700">
          📧 <a href="mailto:support@xperio.com" className="text-indigo-600 hover:underline">support@xperio.com</a><br />
          🌐 <a href="/help" className="text-indigo-600 hover:underline">Help Center</a><br />
          💬 24/7 Live Chat (for Premium users)
        </p>
      </div>
    </div>

    <div className="mt-10">
      <p className="text-md text-gray-500">
        Built for curious travelers, local adventurers, and culture lovers — welcome to the smarter way to explore!
      </p>
    </div>
  </div>
</section>


        </div>
    );
}