
import React, { useState, useEffect } from 'react';
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
import { Search, Filter, Bell, Star } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuery } from '@tanstack/react-query';
import { applicationService } from '@/services/api/exportServices';
import { useToast } from '@/hooks/use-toast';
import { Application } from '@/services/api/types';

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const { toast } = useToast();
  
  // Fetch all applications for recruiter
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ['recruiterApplications', statusFilter, sortBy],
    queryFn: async () => {
      let filters: any = {};
      
      if (statusFilter) {
        filters.status = statusFilter;
      }
      
      if (sortBy === 'newest') {
        filters.sortBy = 'appliedDate';
        filters.sortOrder = 'desc';
      } else if (sortBy === 'skillmatch') {
        filters.sortBy = 'skillMatch';
        filters.sortOrder = 'desc';
      } else if (sortBy === 'alphabetical') {
        filters.sortBy = 'student.firstName';
        filters.sortOrder = 'asc';
      }
      
      if (searchTerm) {
        filters.search = searchTerm;
      }
      
      return await applicationService.getRecruiterApplications(filters);
    },
    onError: (error: any) => {
      console.error('Error fetching applications:', error);
      toast({
        title: "Error",
        description: "Failed to load applications",
        variant: "destructive"
      });
    }
  });

  const handleUpdateStatus = async (applicationId: string, newStatus: string) => {
    try {
      await applicationService.updateApplicationStatus(applicationId, newStatus);
      toast({
        title: "Status Updated",
        description: "Application status has been updated",
      });
      refetch();
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
    }
  };

  const applyFilters = () => {
    refetch();
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search applications..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center">
                  <Avatar>
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applications</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage and track candidate applications
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="skillmatch">Skill Match</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Status</h3>
                        <div className="space-y-2">
                          {["Under Review", "Shortlisted", "Interview", "Rejected", "Pending", "Accepted"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`status-${status}`} 
                                checked={statusFilter === status}
                                onCheckedChange={() => setStatusFilter(statusFilter === status ? '' : status)}
                              />
                              <Label htmlFor={`status-${status}`} className="text-sm">{status}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Job Position</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all_positions">All positions</SelectItem>
                            <SelectItem value="engineer">Software Engineer</SelectItem>
                            <SelectItem value="pm">Product Manager</SelectItem>
                            <SelectItem value="designer">UI/UX Designer</SelectItem>
                            <SelectItem value="datascience">Data Science</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Skill Match</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all_ranges">All ranges</SelectItem>
                            <SelectItem value="high">90-100%</SelectItem>
                            <SelectItem value="medium">80-89%</SelectItem>
                            <SelectItem value="low">Below 80%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Date Applied</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select timeframe" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all_time">All time</SelectItem>
                            <SelectItem value="today">Today</SelectItem>
                            <SelectItem value="week">This week</SelectItem>
                            <SelectItem value="month">This month</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="mt-4">
                          <Button className="w-full" onClick={applyFilters}>Apply Filters</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">Loading applications...</p>
                  </div>
                ) : applications.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400">No applications found</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Skill Match</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {applications.map((application: any) => (
                        <TableRow key={application._id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>
                                  {application.student?.firstName ? application.student.firstName[0] : ''}
                                  {application.student?.lastName ? application.student.lastName[0] : ''}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  {application.student?.firstName} {application.student?.lastName}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {application.student?.education?.[0]?.degree || 'No education info'}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {application.opportunity?.title || 'Unknown Position'}
                          </TableCell>
                          <TableCell>
                            {new Date(application.appliedDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {application.skillMatch && (
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                {application.skillMatch}%
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Select defaultValue={application.status} onValueChange={(value) => handleUpdateStatus(application._id, value)}>
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Pending">Pending</SelectItem>
                                <SelectItem value="Under Review">Under Review</SelectItem>
                                <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                                <SelectItem value="Interview">Interview</SelectItem>
                                <SelectItem value="Accepted">Accepted</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => window.location.href = `/recruiter/applications/${application._id}`}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
