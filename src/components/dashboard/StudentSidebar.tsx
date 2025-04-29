
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Home, 
  Search, 
  Settings, 
  BookOpen,
  GraduationCap,
  Users,
  MessageSquare,
  ListCheck,
  Award,
  Heart,
  ShieldCheck,
  FileText as Resume,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/settings/ThemeToggle';

const StudentSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { label: 'Dashboard', icon: Home, href: '/student/dashboard' },
    { label: 'Explore', icon: Search, href: '/student/explore' },
    { label: 'Applications & Activity', icon: FileText, href: '/student/applications' },
    { label: 'Career & Skills', icon: GraduationCap, href: '/student/career-skills' },
    { label: 'Certificates', icon: Award, href: '/student/certificates' },
    { label: 'Mentorship', icon: Users, href: '/student/mentorship' },
    { label: 'Calendar', icon: Calendar, href: '/student/calendar' },
    { label: 'Resume Builder', icon: Resume, href: '/student/resume-builder' },
    { label: 'ATS Calculator', icon: Calculator, href: '/student/ats-calculator' },
    { label: 'Micro-Internships', icon: BookOpen, href: '/student/micro-internships' },
    { label: 'Community Hub', icon: Heart, href: '/student/community' },
    { label: 'Challenges', icon: ListCheck, href: '/student/challenges' },
    { label: 'Grievances', icon: ShieldCheck, href: '/student/grievances' },
    { label: 'Settings', icon: Settings, href: '/student/settings' },
  ];

  return (
    <div className="hidden md:flex flex-col h-screen w-64 border-r bg-white dark:bg-gray-900 dark:border-gray-800">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">InternMatch</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">Student Portal</p>
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
              AM
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">Amit Mehta</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;
