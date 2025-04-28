
import React, { useState } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Plus, Bell, Search, Star, Video, Calendar as CalendarIcon } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const interviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Software Engineer",
      time: "10:00 AM",
      type: "Technical",
      skillMatch: 92,
      status: "Confirmed"
    },
    {
      id: 2,
      candidate: "Sarah Williams",
      position: "Product Manager",
      time: "2:30 PM",
      type: "HR Round",
      skillMatch: 88,
      status: "Confirmed"
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "UI/UX Designer",
      time: "4:00 PM",
      type: "Design Task",
      skillMatch: 75,
      status: "Pending"
    }
  ];

  const events = [
    {
      id: 1,
      title: "Corporate Challenge Kick-off",
      time: "11:00 AM",
      type: "Event",
      participants: 15,
      status: "Upcoming"
    },
    {
      id: 2,
      title: "Mentorship Program Orientation",
      time: "3:00 PM",
      type: "Training",
      participants: 8,
      status: "Upcoming"
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
                    placeholder="Search schedule..."
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

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Schedule</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage your interviews, events, and appointments
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Schedule Interview
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Calendar</h2>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow pointer-events-auto"
                    />
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Selected: {date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Badge className="mr-2">3</Badge>
                        Interviews scheduled
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Badge className="mr-2">2</Badge>
                        Events planned
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <Tabs defaultValue="interviews" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="interviews">Interviews</TabsTrigger>
                      <TabsTrigger value="events">Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="interviews">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Upcoming Interviews
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {date?.toLocaleDateString()}
                          </p>
                        </div>
                        {interviews.map((interview) => (
                          <Card key={interview.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div className="flex items-center space-x-3">
                                  <Avatar>
                                    <AvatarFallback>{interview.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                      {interview.candidate}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{interview.position}</p>
                                    <div className="flex items-center mt-1">
                                      <CalendarIcon className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                                      <p className="text-sm text-gray-600 dark:text-gray-400">{interview.time}</p>
                                      <Badge className="ml-2">{interview.type}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge 
                                    variant={interview.status === "Confirmed" ? "default" : "secondary"}
                                  >
                                    {interview.status}
                                  </Badge>
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                    <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                    {interview.skillMatch}% Match
                                  </Badge>
                                </div>
                              </div>
                              <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Reschedule
                                </Button>
                                <Button size="sm" className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  Join Meeting
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="events">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Planned Events
                          </h2>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {date?.toLocaleDateString()}
                          </p>
                        </div>
                        {events.map((event) => (
                          <Card key={event.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-medium text-gray-900 dark:text-white">
                                    {event.title}
                                  </h3>
                                  <div className="flex items-center mt-1">
                                    <CalendarIcon className="h-3 w-3 mr-1 text-gray-500 dark:text-gray-400" />
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.time}</p>
                                    <Badge className="ml-2">{event.type}</Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                    Participants: {event.participants}
                                  </p>
                                </div>
                                <Badge 
                                  variant={event.status === "Upcoming" ? "default" : "secondary"}
                                >
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button size="sm" className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  Host Event
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
