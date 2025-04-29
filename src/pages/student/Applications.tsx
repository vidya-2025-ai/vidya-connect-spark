
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

const Applications = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Track and manage your applications
                </p>
              </div>
              <Button>New Application</Button>
            </div>

            <div className="space-y-4">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
