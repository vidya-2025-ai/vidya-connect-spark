
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Briefcase, 
  Clock, 
  Award, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/student/dashboard', icon: Home },
  { name: 'Explore Opportunities', href: '/student/explore', icon: Search },
  { name: 'My Applications', href: '/student/applications', icon: Briefcase },
  { name: 'Activity Tracker', href: '/student/tracker', icon: Clock },
  { name: 'Certificates', href: '/student/certificates', icon: Award },
  { name: 'Mentorship', href: '/student/mentorship', icon: MessageSquare },
  { name: 'Calendar', href: '/student/calendar', icon: Calendar },
  { name: 'Settings', href: '/student/settings', icon: Settings }
];

const StudentSidebar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-vs-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-vs-green-500"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open sidebar</span>
          {isMobileMenuOpen ? (
            <X className="block h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="block h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile sidebar */}
      <div className={`lg:hidden fixed inset-0 flex z-40 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleMobileMenu} />
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white transform transition-transform duration-300 ease-in-out">
          <div className="pt-5 pb-4 px-4">
            <div className="flex items-center">
              <Link to="/student/dashboard" className="flex items-center">
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-vs-green-500 to-vs-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">VS</span>
                </span>
                <span className="ml-2 text-xl font-bold text-gray-800">Vidya-Samveda</span>
              </Link>
            </div>
            <nav className="mt-8 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    location.pathname === item.href
                      ? 'bg-vs-green-50 text-vs-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-vs-green-600'
                  }`}
                  onClick={toggleMobileMenu}
                >
                  <item.icon
                    className={`mr-4 h-5 w-5 ${
                      location.pathname === item.href
                        ? 'text-vs-green-600'
                        : 'text-gray-400 group-hover:text-vs-green-600'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="/login" className="flex items-center text-gray-600 hover:text-vs-green-600">
              <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Log out</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex flex-col h-0 flex-1">
            <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
              <Link to="/student/dashboard" className="flex items-center">
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-vs-green-500 to-vs-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">VS</span>
                </span>
                <span className="ml-2 text-xl font-bold text-gray-800">Vidya-Samveda</span>
              </Link>
            </div>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      location.pathname === item.href
                        ? 'bg-vs-green-50 text-vs-green-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-vs-green-600'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        location.pathname === item.href
                          ? 'text-vs-green-600'
                          : 'text-gray-400 group-hover:text-vs-green-600'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <a href="/login" className="flex items-center text-gray-600 hover:text-vs-green-600">
              <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Log out</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentSidebar;
