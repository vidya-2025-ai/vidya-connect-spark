
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Calendar,
  Settings,
  FileText,
} from 'lucide-react';

const RecruiterSidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      name: 'Posted Jobs',
      path: '/recruiter/jobs',
      icon: Briefcase,
    },
    {
      name: 'Applications',
      path: '/recruiter/applications',
      icon: FileText,
    },
    {
      name: 'Candidates',
      path: '/recruiter/candidates',
      icon: Users,
    },
    {
      name: 'Schedule',
      path: '/recruiter/schedule',
      icon: Calendar,
    },
    {
      name: 'Settings',
      path: '/recruiter/settings',
      icon: Settings,
    },
  ];

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <Link to="/recruiter/dashboard" className="flex items-center space-x-2">
          <span className="h-8 w-8 rounded-full bg-gradient-to-br from-[#007bff] to-[#00d4ff] flex items-center justify-center">
            <span className="text-white font-bold text-lg">VS</span>
          </span>
          <span className="text-xl font-bold text-gray-800">Recruiter</span>
        </Link>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${
              isActive(item.path)
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default RecruiterSidebar;
