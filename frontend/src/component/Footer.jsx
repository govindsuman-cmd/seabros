import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 via-blue-500 to-blue-700 text-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Logo + About */}
        <div>
          <h2 className="text-3xl font-extrabold text-white">SeaBros</h2>
          <p className="mt-4 text-gray-300 text-sm leading-relaxed">
            Step into comfort and style. Our exclusive collection of shoes is launching soon — crafted with passion, built for you.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-blue-400 inline-block pb-1">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
  <Link to="/return-policy" className="hover:text-blue-300 transition">Return Policy</Link>
</li>
<li>
  <Link to="/refund-policy" className="hover:text-blue-300 transition">Refund Policy</Link>
</li>
<li>
  <Link to="/privacy-policy" className="hover:text-blue-300 transition">Privacy Policy</Link>
</li>
<li>
  <Link to="/terms-and-conditions" className="hover:text-blue-300 transition">Terms & Conditions</Link>
</li>
<li>
  <Link to="/disclaimer" className="hover:text-blue-300 transition">Disclaimer</Link>
</li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-600 mt-10 pt-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} <span className="font-semibold text-white">SeaBros</span>. All rights reserved.
      </div>
    </footer>
  );
}
