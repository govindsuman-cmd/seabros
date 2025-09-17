import { useNavigate } from "react-router-dom";

export default function Home() {

const navigate = useNavigate();

   const handleClick = () => {
    navigate('/get-all-jobs');
  };


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-black via-gray-900 to-black text-white min-h-[90vh] px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wide drop-shadow-lg">
          Step Into <span className="text-red-500">Elegance</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300">
          Discover the perfect blend of comfort, style, and durability.  
          SeaBros Shoes – Crafted for those who dare to stand out.
        </p>
        <button className="mt-8 px-8 py-3 bg-red-500 text-white rounded-full text-lg font-semibold hover:bg-red-600 shadow-lg transition-all"
         onClick={handleClick}
        >
          Shop Now
        </button>

        {/* Floating Shoe Image */}
        <img
          src="https://images.unsplash.com/photo-1606813902782-399a6c7c4e7a"
          alt="Shoe"
          className="absolute bottom-0 w-[400px] md:w-[550px] object-contain drop-shadow-2xl"
        />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-10">Why Choose SeaBros?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-3">🔥 Premium Quality</h3>
            <p className="text-gray-600">
              Handcrafted with the finest materials for unmatched comfort.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-3">👟 Stylish Design</h3>
            <p className="text-gray-600">
              Modern, bold, and made for people who love to stand out.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-xl hover:scale-105 transition">
            <h3 className="text-2xl font-semibold mb-3">⚡ Built to Last</h3>
            <p className="text-gray-600">
              Durable soles and weather-proof material that goes anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="py-20 bg-black text-center text-white">
        <h2 className="text-4xl font-bold">Ready to Upgrade Your Style?</h2>
        <p className="mt-4 text-lg text-gray-400">
          Join thousands of SeaBros customers and step into the future.
        </p>
        <button className="mt-8 px-10 py-4 bg-red-500 rounded-full text-lg font-semibold hover:bg-red-600 shadow-lg transition-all"
         onClick={() => window.location.href = '/'}
        >
          Explore Collection
        </button>
      </section>
    </div>
  );
}
