
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AuthForm } from '@/components/auth/AuthForm';

const RegisterOrg = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Join as an Organization
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Create your account to post opportunities and connect with students
            </p>
          </div>
          <AuthForm type="organization" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterOrg;
