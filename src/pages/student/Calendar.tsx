
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const events = [
  {
    id: 1,
    title: "Technical Interview",
    date: "2025-04-26",
    type: "Interview"
  },
  {
    id: 2,
    title: "Application Deadline",
    date: "2025-04-28",
    type: "Deadline"
  },
  {
    id: 3,
    title: "Orientation Session",
    date: "2025-04-30",
    type: "Event"
  }
];

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your schedule and upcoming events
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-2">
                <CardContent className="p-4">
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-4">Upcoming Events</h3>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div 
                        key={event.id}
                        className="p-3 rounded-lg border"
                      >
                        <p className="font-medium">{event.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          {event.type}
                        </span>
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
