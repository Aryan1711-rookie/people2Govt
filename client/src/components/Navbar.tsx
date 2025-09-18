import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo1.png"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-green-600">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + Brand */}
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Jharkhand Logo" width={55} height={55} />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 tracking-wide font-serif">
              people<span className="text-green-600">2</span>Gov
            </h1>
            <p className="text-xs text-gray-500 font-sans">
              Govt. of Jharkhand
            </p>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg font-medium">
          <a
            href="#home"
            className="text-gray-700 hover:text-green-600 transition duration-300 transform hover:scale-105"
          >
            Home
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-green-600 transition duration-300 transform hover:scale-105"
          >
            About
          </a>
          <a
            href="#impact"
            className="text-gray-700 hover:text-green-600 transition duration-300 transform hover:scale-105"
          >
            Impact
          </a>
          <a
            href="#how-it-works"
            className="text-gray-700 hover:text-green-600 transition duration-300 transform hover:scale-105"
          >
            Working
          </a>
          <a
            href="#report"
            className="text-gray-700 hover:text-green-600 transition duration-300 transform hover:scale-105"
          >
            Report
          </a>
        </div>

        {/* Admin Button */}
        <div className="hidden md:flex gap-2">
          <Link to="/login" className='font-Ovo hidden md:flex items-center gap-3 px-10 py-2.5 border text-green-700 border-green-600 rounded-full ml-4 '> 
            Login 
          </Link>
          <Link to="/dashboard_admin" className="bg-green-600 text-white px-10 py-2.5 rounded-full shadow-lg hover:bg-green-700 transition duration-300 hover:transform hover:scale-105 font-Ovo">
            Admin
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 shadow-inner flex flex-col items-center gap-6 py-6 border-t border-gray-200">
          <a
            href="#home"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Home
          </a>
          <a
            href="#report"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Report Issue
          </a>
          <a
            href="#track"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            Track Status
          </a>
          <a
            href="#myissues"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            My Issues
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="text-gray-700 hover:text-green-600 transition duration-300"
          >
            About
          </a>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Admin
          </button>
          <button
            className="bg-green-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-green-700 transition duration-300"
            onClick={() => setIsOpen(false)}
          >
            Login
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;