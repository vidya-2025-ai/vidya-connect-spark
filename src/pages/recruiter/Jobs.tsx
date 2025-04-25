
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';

const Jobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      applications: 45,
      status: "Active",
      postedDate: "2025-04-15"
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      applications: 32,
      status: "Active",
      postedDate: "2025-04-18"
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "On-site",
      type: "Contract",
      applications: 28,
      status: "Closed",
      postedDate: "2025-04-10"
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Posted Jobs</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage your job postings and track applications
                </p>
              </div>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Post New Job
              </Button>
            </div>

            <div className="space-y-4">
              {jobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-600">
                            {job.department} • {job.location} • {job.type}
                          </p>
                          <p className="text-sm text-gray-600">
                            Posted on: {new Date(job.postedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                          {job.status}
                        </Badge>
                        <span className="text-sm text-gray-600">
                          {job.applications} applications
                        </span>
                      </div>
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

export default Jobs;
