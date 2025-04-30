
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
            {!user ? (
              <>
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
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to={user.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard'} 
                  className="text-gray-600 hover:text-[#007bff] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{user.firstName && user.lastName ? 
                          `${user.firstName[0]}${user.lastName[0]}` : 
                          getInitials(user.firstName || "User")}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex flex-col space-y-1 p-2">
                      <p className="text-sm font-medium leading-none">{user.firstName} {user.lastName}</p>
                      <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to={`/${user.role}/settings`} className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
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
          {!user ? (
            <>
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
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link
                to={user.role === 'student' ? '/student/dashboard' : '/recruiter/dashboard'}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#007bff] hover:bg-gray-50"
              >
                Dashboard
              </Link>
              <Link
                to={`/${user.role}/settings`}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-[#007bff] hover:bg-gray-50"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
