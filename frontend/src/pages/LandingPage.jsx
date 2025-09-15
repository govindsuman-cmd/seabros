export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
      {/* Hero Section */}
      <section className="text-center max-w-2xl px-6">
        <h1 className="text-5xl mt-10 font-extrabold tracking-tight text-gray-900">
          Step Into Style 👟
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Discover the latest collection of SeaBros shoes — crafted for comfort, built for style.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Shop Now
          </button>
          <button className="px-6 py-3 border border-gray-300 text-gray-700 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-6 max-w-5xl">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Comfort First</h3>
          <p className="text-gray-600">
            Designed to keep you light on your feet all day long.
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
          <p className="text-gray-600">
            Crafted with durable materials for long-lasting performance.
          </p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h3 className="text-xl font-bold mb-2">Modern Style</h3>
          <p className="text-gray-600">
            Trendy designs to match your lifestyle.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-20 text-center">
        <h2 className="text-3xl font-bold">Be the first to get exclusive deals</h2>
        <p className="mt-2 text-gray-600">
          Sign up now and get early access to our latest drops.
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 w-72 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-r-lg shadow-md hover:bg-blue-700 transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
}
 