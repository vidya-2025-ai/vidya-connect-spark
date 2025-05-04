
import React, { useState } from 'react';
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

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const applications = [
    {
      id: 1,
      candidate: "Alex Johnson",
      position: "Senior Software Engineer",
      appliedDate: "2025-04-20",
      status: "Under Review",
      skillMatch: 92,
      education: "B.Tech Computer Science",
      experience: "5 years"
    },
    {
      id: 2,
      candidate: "Sarah Williams",
      position: "Product Manager",
      appliedDate: "2025-04-19",
      status: "Shortlisted",
      skillMatch: 88,
      education: "MBA",
      experience: "3 years"
    },
    {
      id: 3,
      candidate: "Michael Brown",
      position: "UI/UX Designer",
      appliedDate: "2025-04-18",
      status: "Rejected",
      skillMatch: 75,
      education: "BFA Graphic Design",
      experience: "2 years"
    },
    {
      id: 4,
      candidate: "Emily Chen",
      position: "Data Science Intern",
      appliedDate: "2025-04-22",
      status: "Under Review",
      skillMatch: 96,
      education: "MS Data Science",
      experience: "1 year"
    },
    {
      id: 5,
      candidate: "David Kim",
      position: "Marketing Challenge",
      appliedDate: "2025-04-23",
      status: "Shortlisted",
      skillMatch: 90,
      education: "BA Marketing",
      experience: "4 years"
    }
  ];

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
                  <Select defaultValue="newest">
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
                          {["Under Review", "Shortlisted", "Scheduled", "Rejected"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox id={`status-${status}`} />
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
                          <Button className="w-full">Apply Filters</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="mt-4">
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
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>{application.candidate.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{application.candidate}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{application.education}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{application.position}</TableCell>
                        <TableCell>{new Date(application.appliedDate).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                            <Star className="h-3 w-3 mr-1" fill="currentColor" />
                            {application.skillMatch}%
                          </Badge>
                        </TableCell>
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
    </div>
  );
};

export default Applications;
