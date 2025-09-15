import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import seabrosLogo from "../assets/images/seabrosLogo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("auth"); 
  const role = localStorage.getItem("role"); // 👈 get user role

  const handleLogout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white w-full fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={seabrosLogo} alt="SeaBros Logo" className="h-10 w-auto" />
          <span className="text-2xl font-bold hidden sm:inline">SeaBros</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li><Link to="/home" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/about" className="hover:text-gray-200">About</Link></li>
          <li><Link to="/get-all-jobs" className="hover:text-gray-200">Join Us</Link></li>
          <li><Link to="/contact" className="hover:text-gray-200">Contact</Link></li>

          {/* Dropdown only for Admin/Employee */}
          {isLoggedIn && (role === "Admin" || role === "Employee") && (
            <li className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="hover:text-gray-200 flex items-center"
              >
                Jobs ▾
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg w-40">
                  <li>
                    <Link
                      to="/create-job"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Post Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Fetch Job
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Conditionally render Login/Logout */}
          {isLoggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-green-500 px-3 py-1 rounded hover:bg-green-600"
              >
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden px-6 pb-4 space-y-2 bg-blue-700">
          <li>
            <Link to="/home" onClick={() => setIsOpen(false)} className="block hover:bg-blue-800 px-2 py-1 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:bg-blue-800 px-2 py-1 rounded">
              About
            </Link>
          </li>
          <li>
            <Link to="/get-all-jobs" onClick={() => setIsOpen(false)} className="block hover:bg-blue-800 px-2 py-1 rounded">
              Join Us
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:bg-blue-800 px-2 py-1 rounded">
              Contact
            </Link>
          </li>

          {/* Mobile Dropdown for Admin/Employee */}
          {isLoggedIn && (role === "Admin" || role === "Employee") && (
            <li>
              <details>
                <summary className="cursor-pointer hover:bg-blue-800 px-2 py-1 rounded">Jobs</summary>
                <ul className="pl-4">
                  <li>
                    <Link
                      to="/create-job"
                      onClick={() => setIsOpen(false)}
                      className="block hover:bg-blue-800 px-2 py-1 rounded"
                    >
                      Post Job
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/jobs"
                      onClick={() => setIsOpen(false)}
                      className="block hover:bg-blue-800 px-2 py-1 rounded"
                    >
                      Fetch Job
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
          )}

          {/* Mobile Login/Logout */}
          {isLoggedIn ? (
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block bg-red-500 hover:bg-red-600 px-2 py-1 rounded"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block bg-green-500 hover:bg-green-600 px-2 py-1 rounded"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
}
