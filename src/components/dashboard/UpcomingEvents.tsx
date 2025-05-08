
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video } from 'lucide-react';
import calendarService from '@/services/api/calendarService';
import { Event } from '@/services/api/types';

const UpcomingEvents: React.FC = () => {
  const { data: events, isLoading } = useQuery({
    queryKey: ['upcomingEvents'],
    queryFn: calendarService.getUpcomingEvents,
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };
  
  const getEventTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'workshop':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'webinar':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            Loading events...
          </div>
        ) : !events || events.length === 0 ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            No upcoming events. Check back soon!
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-700">
            {events.map((event: Event) => (
              <div key={event._id || event.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.description}</p>
                  </div>
                  <Badge className={getEventTypeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
                
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(event.startTime.toString())}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{formatTime(event.startTime.toString())} - {formatTime(event.endTime.toString())}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    {event.isVirtual ? (
                      <>
                        <Video className="h-4 w-4 mr-2" />
                        <span>Virtual</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{event.location || 'Location not specified'}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
