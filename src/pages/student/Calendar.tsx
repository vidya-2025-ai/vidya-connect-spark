
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { calendarService } from '@/services/api/calendarService';
import { Event } from '@/services/api/types';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const Calendar = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const data = await calendarService.getAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
        toast({
          title: "Error",
          description: "Failed to load calendar events",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events for the selected date
  const selectedDateEvents = events.filter((event) => {
    const eventDate = new Date(event.startDate);
    return eventDate.getDate() === date.getDate() &&
      eventDate.getMonth() === date.getMonth() &&
      eventDate.getFullYear() === date.getFullYear();
  });

  // Get event dots for the calendar
  const getEventDotsForDate = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.startDate);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'interview':
        return 'bg-blue-500';
      case 'deadline':
        return 'bg-red-500';
      case 'reminder':
        return 'bg-amber-500';
      default:
        return 'bg-green-500';
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Calendar</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <Skeleton className="h-96 w-full" />
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <Skeleton className="h-8 w-48" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))}
                    </div>
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
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-8">Calendar</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-md border"
                    modifiers={{
                      event: (date) => getEventDotsForDate(date).length > 0,
                    }}
                    modifiersStyles={{
                      event: {
                        fontWeight: 'bold',
                      }
                    }}
                    components={{
                      DayContent: (props) => {
                        const eventsForDay = getEventDotsForDate(props.date);
                        return (
                          <div className="relative w-full h-full flex items-center justify-center">
                            {props.date.getDate()}
                            {eventsForDay.length > 0 && (
                              <div className="absolute bottom-1 flex gap-1 justify-center">
                                {eventsForDay.slice(0, 3).map((event, i) => (
                                  <span 
                                    key={i} 
                                    className={`inline-block w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
                                  ></span>
                                ))}
                                {eventsForDay.length > 3 && (
                                  <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateEvents.length === 0 ? (
                    <p className="text-gray-500">No events for this date</p>
                  ) : (
                    <div className="space-y-4">
                      {selectedDateEvents.map((event) => (
                        <div key={event._id} className="border-l-4 pl-4 py-2" style={{ borderColor: getEventTypeColor(event.type).replace('bg-', 'rgb(var(--') + '))' }}>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-gray-600">
                            {format(new Date(event.startDate), 'h:mm a')}
                            {event.endDate && ` - ${format(new Date(event.endDate), 'h:mm a')}`}
                          </p>
                          {event.location && (
                            <p className="text-xs text-gray-500">{event.location}</p>
                          )}
                          <div className="mt-1">
                            <Badge className={getEventTypeColor(event.type).replace('bg-', 'bg-') + ' text-white'}>
                              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                            </Badge>
                          </div>
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

export default Calendar;
