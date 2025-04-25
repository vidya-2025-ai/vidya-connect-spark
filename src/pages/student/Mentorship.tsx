
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';

const Mentorship = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Mentorship</h1>
            <div className="mt-4">
              <p className="text-gray-600">Coming soon! Connect with mentors and view your mentorship sessions here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
