
import React from 'react';
import UniversitySidebar from '@/components/dashboard/UniversitySidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, Search, Briefcase, Users, Calendar, Star, FileText, Award } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/hooks/useAuth';

const UniversityDashboard = () => {
  const { user } = useAuth();
  
  const stats = [
    { title: 'Total Students', value: '1,452', change: '+15', status: 'increase', icon: Users, color: 'bg-blue-500' },
    { title: 'Placement Offers', value: '84', change: '+7', status: 'increase', icon: Briefcase, color: 'bg-purple-500' },
    { title: 'Partner Companies', value: '48', change: '+3', status: 'increase', icon: Award, color: 'bg-amber-500' },
    { title: 'Upcoming Events', value: '12', change: '+2', status: 'increase', icon: Calendar, color: 'bg-green-500' },
  ];

  const topStudents = [
    {
      id: 1,
      name: "Alex Johnson",
      degree: "B.Tech Computer Science",
      skillScore: 92,
      placementStatus: "Placed",
      company: "Microsoft"
    },
    {
      id: 2,
      name: "Sarah Williams",
      degree: "MBA",
      skillScore: 88,
      placementStatus: "Placed",
      company: "Amazon"
    },
    {
      id: 3,
      name: "Michael Brown",
      degree: "BFA Design",
      skillScore: 85,
      placementStatus: "Interviewing",
      company: ""
    },
  ];

  const upcomingEvents = [
    {
      id: 1, 
      title: "Career Fair",
      time: "May 10, 10:00 AM",
      companies: 24
    },
    {
      id: 2,
      title: "Resume Workshop",
      time: "May 5, 2:00 PM",
      type: "Workshop"
    },
    {
      id: 3,
      title: "Placement Orientation",
      time: "May 3, 3:30 PM",
      attendees: 150
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <UniversitySidebar />
      
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
                    placeholder="Search students, companies..."
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
                    <AvatarFallback>{user?.firstName?.[0]}{user?.lastName?.[0]}</AvatarFallback>
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">University Dashboard</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Welcome back! Here's an overview of your university's placement activities.
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
                  {/* Top Students */}
                  <Card className="lg:col-span-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Students</h3>
                    </div>
                    <CardContent className="p-0">
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        {topStudents.map((student) => (
                          <div 
                            key={student.id}
                            className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-white">{student.name}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{student.degree}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                {student.skillScore}% Score
                              </Badge>
                              <Badge variant={student.placementStatus === "Placed" ? "default" : "secondary"}>
                                {student.placementStatus}
                                {student.company && ` - ${student.company}`}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="outline" className="w-full">View All Students</Button>
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
                            {event.companies && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Companies attending: {event.companies}</p>
                            )}
                            {event.attendees && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Expected attendees: {event.attendees}</p>
                            )}
                            {event.type && (
                              <Badge variant="outline" className="mt-2">{event.type}</Badge>
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

export default UniversityDashboard;
