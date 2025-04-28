
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, Briefcase, Users, Calendar, Star } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const stats = [
    { title: 'Active Jobs', value: '12', change: '+2', status: 'increase', icon: Briefcase },
    { title: 'Total Applications', value: '148', change: '+15', status: 'increase', icon: FileText },
    { title: 'Interviews Scheduled', value: '8', change: '+3', status: 'increase', icon: Calendar },
    { title: 'Mentorship Matches', value: '24', change: '+1', status: 'increase', icon: Star },
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
      <RecruiterSidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search candidates, jobs..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>SR</AvatarFallback>
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
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                {/* Stats cards */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {stats.map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</h3>
                          <Badge variant={stat.status === 'increase' ? 'default' : 'destructive'} className="ml-2">
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
                  <Card className="lg:col-span-2">
                    <CardHeader className="pb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Applications</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentApplications.map((application) => (
                          <div 
                            key={application.id}
                            className="flex items-center justify-between p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
                          >
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{application.position}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{application.candidate}</p>
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
                      <div className="mt-4">
                        <Button variant="outline" className="w-full">View All Applications</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Upcoming events */}
                  <Card>
                    <CardHeader className="pb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Upcoming Events</h3>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingEvents.map((event) => (
                          <div 
                            key={event.id}
                            className="p-4 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700"
                          >
                            <h4 className="font-medium text-gray-900 dark:text-white">{event.title}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                            {event.candidate && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">With: {event.candidate}</p>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
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
