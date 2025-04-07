
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { User, Building2 } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="pt-10 mx-auto max-w-7xl px-4 sm:pt-12 sm:px-6 md:pt-16 lg:pt-20 lg:px-8 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Connecting students with</span>
                <span className="block text-vs-green-600">
                  meaningful opportunities
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join Vidya-Samveda to discover internships, social-impact projects, and mentor-backed experiences
                from startups, NGOs, and social enterprises.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/register">
                    <Button className="w-full flex items-center justify-center px-8 py-3 vs-btn-primary text-base font-medium rounded-md">
                      <User className="mr-2 h-5 w-5" /> I'm a Student
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/register-org">
                    <Button variant="outline" className="w-full flex items-center justify-center px-8 py-3 text-vs-orange-500 border-vs-orange-500 hover:bg-vs-orange-50 text-base font-medium rounded-md">
                      <Building2 className="mr-2 h-5 w-5" /> I'm an Organization
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-gradient-to-r from-vs-green-100 to-vs-purple-100 flex items-center justify-center">
          <div className="max-w-md">
            <div className="grid grid-cols-2 gap-4">
              <div className="transform -rotate-6 vs-card p-4">
                <div className="h-4 w-1/2 bg-vs-green-200 rounded-full mb-2"></div>
                <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                <div className="h-2 w-3/4 bg-gray-100 rounded-full mb-2"></div>
                <div className="flex justify-end">
                  <div className="h-6 w-16 bg-vs-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="transform rotate-3 vs-card p-4">
                <div className="h-4 w-1/2 bg-vs-orange-200 rounded-full mb-2"></div>
                <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                <div className="h-2 w-3/4 bg-gray-100 rounded-full mb-2"></div>
                <div className="flex justify-end">
                  <div className="h-6 w-16 bg-vs-orange-400 rounded-full"></div>
                </div>
              </div>
              <div className="transform rotate-6 vs-card p-4 col-span-2">
                <div className="h-4 w-1/3 bg-vs-purple-200 rounded-full mb-2"></div>
                <div className="h-2 w-full bg-gray-100 rounded-full mb-2"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded-full mb-2"></div>
                <div className="flex justify-end">
                  <div className="h-6 w-16 bg-vs-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
