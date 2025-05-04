
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, CalendarIcon } from "lucide-react";
import { calendarService } from '@/services/api/calendarService';
import { Event } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';

const getEventColorByType = (type: string) => {
  switch(type) {
    case 'Interview':
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case 'Deadline':
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case 'Event':
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case 'Meeting':
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const formattedDate = date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '';

  // Filter events for selected date
  const selectedDateEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return date && 
      eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear();
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await calendarService.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar events. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
        <StudentSidebar />
        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Manage your schedule and upcoming events
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="p-4">
                    <Skeleton className="h-72 w-full" />
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-4" />
                    {[1, 2, 3].map(i => (
                      <div key={i} className="mb-4">
                        <Skeleton className="h-20 w-full rounded-lg" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Manage your schedule and upcoming events
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border-none"
                  />
                </CardContent>
              </Card>

              <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                <CardContent className="p-4">
                  <h3 className="font-medium text-lg mb-4">{formattedDate}</h3>
                  {selectedDateEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <CalendarIcon className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-500">No events scheduled for this date</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div 
                          key={event._id}
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
                        >
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{event.title}</p>
                            <Badge className={getEventColorByType(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                          <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {event.time || 'All day'}
                          </div>
                          {event.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                              {event.description}
                            </p>
                          )}
                          {event.location && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              Location: {event.location}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
