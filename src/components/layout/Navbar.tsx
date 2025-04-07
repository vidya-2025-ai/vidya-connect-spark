
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, Building2 } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#007bff] to-[#00d4ff] flex items-center justify-center">
                <span className="text-white font-bold text-lg">VS</span>
              </span>
              <span className="ml-2 text-xl font-bold text-gray-800">Vidya-Samveda</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/explore" className="text-gray-600 hover:text-[#007bff] px-3 py-2 rounded-md text-sm font-medium">
              Explore
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#007bff] px-3 py-2 rounded-md text-sm font-medium">
              About
            </Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-[#007bff] px-3 py-2 rounded-md text-sm font-medium">
              How It Works
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Link to="/login">
                <Button variant="outline" className="text-[#007bff] border-[#007bff] hover:bg-blue-50">
                  Log In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="vs-btn-primary">Sign Up</Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-[#007bff] focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/explore"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#007bff] hover:bg-gray-50"
          >
            Explore
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#007bff] hover:bg-gray-50"
          >
            About
          </Link>
          <Link
            to="/how-it-works"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#007bff] hover:bg-gray-50"
          >
            How It Works
          </Link>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5">
              <Link to="/login" className="w-full">
                <Button variant="outline" className="w-full text-[#007bff] border-[#007bff] hover:bg-blue-50">
                  Log In
                </Button>
              </Link>
            </div>
            <div className="mt-3 flex items-center px-5">
              <Link to="/register" className="w-full">
                <Button className="w-full vs-btn-primary">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
