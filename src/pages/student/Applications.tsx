
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const applications = [
  {
    id: 1,
    opportunity: "Summer Research Internship",
    organization: "Tech Research Labs",
    status: "Under Review",
    appliedDate: "2025-04-20",
    statusColor: "bg-yellow-100 text-yellow-800"
  },
  {
    id: 2,
    opportunity: "Teaching Assistant Program",
    organization: "Global Education Institute",
    status: "Accepted",
    appliedDate: "2025-04-15",
    statusColor: "bg-green-100 text-green-800"
  },
  {
    id: 3,
    opportunity: "Social Impact Fellowship",
    organization: "Community First",
    status: "Pending",
    appliedDate: "2025-04-22",
    statusColor: "bg-blue-100 text-blue-800"
  }
];

const Applications = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Applications</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Track and manage your applications
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {applications.map((application) => (
                <Card key={application.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <h3 className="font-semibold">{application.opportunity}</h3>
                      <p className="text-sm text-gray-600">{application.organization}</p>
                    </div>
                    <Badge className={application.statusColor}>
                      {application.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
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
