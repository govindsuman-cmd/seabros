import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ComingSoonPage() {
 
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const targetDate = new Date("2025-12-01T00:00:00"); // Launch date
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
      {/* Header/Navigation */}
      <header className="w-full absolute top-0 p-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">SeaBros</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-blue-600 transition">About</a>
            <a href="#" className="hover:text-blue-600 transition">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center max-w-2xl px-6">
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 text-4xl font-semibold px-4 py-1 rounded-full">
            Coming Soon
          </span>
        </div>
        <h1 className="text-5xl mt-4 font-extrabold tracking-tight text-gray-900">
          Step Into Style 👟
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          SeaBros shoes are launching soon — crafted for comfort, built for style.
          Be the first to know when we drop our exclusive collection.
        </p>

        {/* Countdown Timer */}
        <div className="mt-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 max-w-md mx-auto">
          <h3 className="text-xl font-bold mb-4">Launching In</h3>
          <div className="flex justify-center space-x-4">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gray-100 rounded-lg p-2 w-16">
                {timeLeft.days}
              </div>
              <div className="text-sm text-gray-500 mt-1">Days</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gray-100 rounded-lg p-2 w-16">
                {timeLeft.hours}
              </div>
              <div className="text-sm text-gray-500 mt-1">Hours</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gray-100 rounded-lg p-2 w-16">
                {timeLeft.minutes}
              </div>
              <div className="text-sm text-gray-500 mt-1">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gray-100 rounded-lg p-2 w-16">
                {timeLeft.seconds}
              </div>
              <div className="text-sm text-gray-500 mt-1">Seconds</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            onClick={() => navigate("/get-all-jobs")}>
           Join US
          </button>
        </div>
      </section>
    </div>
  );
}
