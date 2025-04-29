
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FileText, Activity, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';

// Application data
const applications = [
  {
    id: 1,
    opportunity: "Summer Research Internship",
    organization: "Tech Research Labs",
    status: "Under Review",
    appliedDate: "2025-04-20",
    statusColor: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
  },
  {
    id: 2,
    opportunity: "Teaching Assistant Program",
    organization: "Global Education Institute",
    status: "Accepted",
    appliedDate: "2025-04-15",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
  },
  {
    id: 3,
    opportunity: "Social Impact Fellowship",
    organization: "Community First",
    status: "Pending",
    appliedDate: "2025-04-22",
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
  }
];

// Activity data
const activityData = [
  { month: 'Jan', applications: 4, interviews: 2 },
  { month: 'Feb', applications: 6, interviews: 3 },
  { month: 'Mar', applications: 8, interviews: 4 },
  { month: 'Apr', applications: 5, interviews: 2 },
];

const activities = [
  {
    id: 1,
    type: "Application Submitted",
    opportunity: "Summer Research Internship",
    date: "2025-04-22",
  },
  {
    id: 2,
    type: "Interview Scheduled",
    opportunity: "Teaching Assistant Program",
    date: "2025-04-24",
  },
  {
    id: 3,
    type: "Application Status Updated",
    opportunity: "Social Impact Fellowship",
    date: "2025-04-23",
  }
];

const ApplicationsTracker = () => {
  const [activeTab, setActiveTab] = useState("applications");

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applications & Activity Tracker</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Track and manage your applications and activities
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Button>New Application</Button>
              </div>
            </div>

            <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Applications
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="space-y-4">
                {applications.map((application) => (
                  <Card key={application.id} className="hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700">
                    <div className={`w-1 absolute left-0 top-0 bottom-0 ${application.status === 'Accepted' ? 'bg-green-500' : application.status === 'Under Review' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <h3 className="font-semibold text-lg">{application.opportunity}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{application.organization}</p>
                      </div>
                      <Badge className={application.statusColor}>
                        {application.status}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                        </p>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={activityData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="applications" 
                            stroke="#8884d8" 
                            name="Applications"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="interviews" 
                            stroke="#82ca9d" 
                            name="Interviews"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex justify-between items-center p-4 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
                        >
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">{activity.type}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{activity.opportunity}</p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsTracker;
