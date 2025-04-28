
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
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/settings/ThemeToggle';

const RecruiterSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/recruiter/dashboard' },
    { label: 'Posted Jobs', icon: Briefcase, href: '/recruiter/jobs' },
    { label: 'Applications', icon: FileText, href: '/recruiter/applications' },
    { label: 'Candidates', icon: Users, href: '/recruiter/candidates' },
    { label: 'Schedule', icon: Calendar, href: '/recruiter/schedule' },
    { label: 'Talent Search', icon: Search, href: '/recruiter/talent-search' },
    { label: 'Mentorship Program', icon: Star, href: '/recruiter/mentorship' },
    { label: 'Corporate Challenges', icon: Heart, href: '/recruiter/challenges' },
    { label: 'Grievance Portal', icon: ShieldCheck, href: '/recruiter/grievances' },
    { label: 'Community Hub', icon: MessageSquare, href: '/recruiter/community' },
    { label: 'Settings', icon: Settings, href: '/recruiter/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col h-screen w-64 border-r bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">InternMatch</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Recruiter Portal</p>
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
                  ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-400'
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
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              SR
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">Sarah Rodriguez</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Recruiter</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default RecruiterSidebar;
