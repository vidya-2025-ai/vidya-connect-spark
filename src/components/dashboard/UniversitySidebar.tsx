
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Users,
  Briefcase,
  Calendar,
  Settings,
  FileText,
  Home,
  Search,
  Star,
  MessageSquare,
  Heart,
  ShieldCheck,
  Award,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';

const UniversitySidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/university/dashboard' },
    { label: 'Students', icon: Users, href: '/university/students' },
    { label: 'Companies', icon: Briefcase, href: '/university/companies' },
    { label: 'Placements', icon: Award, href: '/university/placements' },
    { label: 'Mentorship Program', icon: Star, href: '/university/mentorship' },
    { label: 'Events', icon: Calendar, href: '/university/events' },
    { label: 'Programs', icon: FileText, href: '/university/programs' },
    { label: 'Analytics', icon: Sliders, href: '/university/analytics' },
    { label: 'Community', icon: MessageSquare, href: '/university/community' },
    { label: 'Grievances', icon: ShieldCheck, href: '/university/grievances' },
    { label: 'Settings', icon: Settings, href: '/university/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col h-screen w-64 border-r bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">InternMatch</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">University Portal</p>
      </div>
      
      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors',
                location.pathname === item.href 
                  ? 'bg-green-100 text-green-700 dark:bg-gray-800 dark:text-green-400'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
              )}
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.university}</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default UniversitySidebar;
