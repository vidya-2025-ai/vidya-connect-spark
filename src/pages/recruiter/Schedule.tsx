
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';

const Schedule = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  const interviews = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Software Engineer",
      time: "10:00 AM",
      type: "Technical",
    },
    {
      id: 2,
      candidate: "Sarah Williams",
      position: "Product Manager",
      time: "2:30 PM",
      type: "HR Round",
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "UI/UX Designer",
      time: "4:00 PM",
      type: "Design Task",
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Schedule</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your interview schedule
                </p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Schedule Interview
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardContent className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="pointer-events-auto"
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-lg font-medium text-gray-900">
                  Upcoming Interviews
                </h2>
                {interviews.map((interview) => (
                  <Card key={interview.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {interview.candidate}
                          </h3>
                          <p className="text-sm text-gray-600">{interview.position}</p>
                          <p className="text-sm text-gray-600 mt-1">{interview.time}</p>
                        </div>
                        <Badge>{interview.type}</Badge>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button size="sm">Join Meeting</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
