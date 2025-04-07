
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <div className="bg-gradient-to-r from-[#007bff] to-[#00d4ff] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to make an impact?
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-white/80 mx-auto">
            Join Vidya-Samveda today and start your journey towards meaningful opportunities and experiences.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-[#007bff] hover:bg-gray-100">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
