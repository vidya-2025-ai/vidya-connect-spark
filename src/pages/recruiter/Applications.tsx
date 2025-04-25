
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Filter } from 'lucide-react';

const Applications = () => {
  const applications = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Software Engineer",
      appliedDate: "2025-04-20",
      status: "Under Review",
    },
    {
      id: 2,
      candidate: "Sarah Williams",
      position: "Product Manager",
      appliedDate: "2025-04-19",
      status: "Shortlisted",
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "UI/UX Designer",
      appliedDate: "2025-04-18",
      status: "Rejected",
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
                <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Manage and track candidate applications
                </p>
              </div>
              <div className="flex gap-4">
                <div className="relative w-64">
                  <Input
                    type="search"
                    placeholder="Search applications..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Applied Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-medium">{application.candidate}</TableCell>
                      <TableCell>{application.position}</TableCell>
                      <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            application.status === "Shortlisted"
                              ? "default"
                              : application.status === "Under Review"
                              ? "secondary"
                              : "destructive"
                          }
                        >
                          {application.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
