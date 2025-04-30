
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import MobileMenuToggle from '@/components/layout/MobileMenuToggle';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, Briefcase, Users, Calendar, Star, FileText } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const stats = [
    { title: 'Active Jobs', value: '12', change: '+2', status: 'increase', icon: Briefcase, color: 'bg-blue-500' },
    { title: 'Total Applications', value: '148', change: '+15', status: 'increase', icon: FileText, color: 'bg-purple-500' },
    { title: 'Interviews Scheduled', value: '8', change: '+3', status: 'increase', icon: Calendar, color: 'bg-amber-500' },
    { title: 'Mentorship Matches', value: '24', change: '+1', status: 'increase', icon: Star, color: 'bg-green-500' },
  ];

  const recentApplications = [
    {
      id: 1,
      position: "Software Engineer",
      candidate: "Alex Johnson",
      status: "Under Review",
      date: "2025-04-24",
      skillMatch: 92,
    },
    {
      id: 2,
      position: "Product Manager",
      candidate: "Sarah Smith",
      status: "Scheduled",
      date: "2025-04-23",
      skillMatch: 88,
    },
    {
      id: 3,
      position: "UI/UX Designer",
      candidate: "Michael Brown",
      status: "Pending",
      date: "2025-04-22",
      skillMatch: 94,
    },
  ];

  const upcomingEvents = [
    {
      id: 1, 
      title: "Technical Interview",
      time: "Today, 2:00 PM",
      candidate: "Alex Johnson"
    },
    {
      id: 2,
      title: "Corporate Challenge Launch",
      time: "Tomorrow, 10:00 AM",
      type: "Event"
    },
    {
      id: 3,
      title: "Mentorship Session",
      time: "Apr 30, 3:30 PM",
      candidate: "Emily Chen"
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {!isMobileMenuOpen && (
        <MobileMenuToggle onClick={toggleMobileMenu} />
      )}
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search candidates, jobs..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
              </Button>

              <div className="relative">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {user?.firstName && user?.lastName 
                        ? `${user.firstName[0]}${user.lastName[0]}` 
                        : 'U'}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back{user?.firstName ? `, ${user.firstName}!` : "!"} Here's an overview of your recruitment activities.
              </p>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-6">
                {/* Stats cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                    <Card key={index} className="border border-gray-200 dark:border-gray-700 overflow-hidden">
                      <div className={`h-1 w-full ${stat.color}`}></div>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`rounded-md p-2 ${stat.color} bg-opacity-15 dark:bg-opacity-30 mr-4`}>
                              <stat.icon className={`h-5 w-5 ${stat.color} text-white`} />
                            </div>
                            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</h3>
                          </div>
                          <Badge className="ml-2">
                            {stat.change}
                          </Badge>
                        </div>
                        <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                  {/* Recent applications */}
                  <Card className="lg:col-span-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Applications</h3>
                    </div>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {recentApplications.map((application) => (
                          <div 
                            key={application.id}
                            className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{application.position}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{application.candidate}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{new Date(application.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                {application.skillMatch}% Match
                              </Badge>
                              <Badge>{application.status}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="outline" className="w-full">View All Applications</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Upcoming events */}
                  <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
                    </div>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {upcomingEvents.map((event) => (
                          <div 
                            key={event.id}
                            className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                            {event.candidate && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">With: {event.candidate}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="outline" className="w-full">View Calendar</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
