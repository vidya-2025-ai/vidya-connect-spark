
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const stats = [
    { title: 'Active Jobs', value: '12', change: '+2', status: 'increase' },
    { title: 'Total Applications', value: '148', change: '+15', status: 'increase' },
    { title: 'Interviews Scheduled', value: '8', change: '+3', status: 'increase' },
    { title: 'Hired Candidates', value: '24', change: '+1', status: 'increase' },
  ];

  const recentApplications = [
    {
      id: 1,
      position: "Software Engineer",
      candidate: "Alex Johnson",
      status: "Under Review",
      date: "2025-04-24",
    },
    {
      id: 2,
      position: "Product Manager",
      candidate: "Sarah Smith",
      status: "Scheduled",
      date: "2025-04-23",
    },
    {
      id: 3,
      position: "UI/UX Designer",
      candidate: "Michael Brown",
      status: "Pending",
      date: "2025-04-22",
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                      <Badge variant={stat.status === 'increase' ? 'default' : 'destructive'} className="ml-2">
                        {stat.change}
                      </Badge>
                    </div>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Card>
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-medium">Recent Applications</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((application) => (
                      <div 
                        key={application.id}
                        className="flex items-center justify-between p-4 rounded-lg border bg-white"
                      >
                        <div>
                          <h4 className="font-medium">{application.position}</h4>
                          <p className="text-sm text-gray-600">{application.candidate}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge>{application.status}</Badge>
                          <span className="text-sm text-gray-500">
                            {new Date(application.date).toLocaleDateString()}
                          </span>
                        </div>
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

export default Dashboard;
