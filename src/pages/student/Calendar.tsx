
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Technical Interview",
    date: "2025-04-26",
    time: "10:30 AM",
    type: "Interview",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  },
  {
    id: 2,
    title: "Application Deadline",
    date: "2025-04-28",
    time: "11:59 PM",
    type: "Deadline",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  },
  {
    id: 3,
    title: "Orientation Session",
    date: "2025-04-30",
    time: "2:00 PM",
    type: "Event",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  }
];

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const formattedDate = date ? date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : '';

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
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div 
                        key={event.id}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <p className="font-medium">{event.title}</p>
                          <Badge className={event.color}>
                            {event.type}
                          </Badge>
                        </div>
                        <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-400">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
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
};

export default CalendarPage;
