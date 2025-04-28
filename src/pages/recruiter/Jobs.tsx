
import React, { useState } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Users, 
  Star,
  Bell 
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const jobs = [
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      applications: 45,
      status: "Active",
      postedDate: "2025-04-15",
      skills: ["React", "TypeScript", "Node.js"],
      description: "We are looking for an experienced software engineer to join our team and help build robust applications.",
      requiredSkills: ["JavaScript", "React", "TypeScript", "Node.js"],
      mentorshipAvailable: true,
      certificationOffered: true
    },
    {
      id: 2,
      title: "Product Manager",
      department: "Product",
      location: "Hybrid",
      type: "Full-time",
      applications: 32,
      status: "Active",
      postedDate: "2025-04-18",
      skills: ["Product Strategy", "User Research", "Analytics"],
      description: "Lead product development from concept to launch, working closely with engineering and design teams.",
      requiredSkills: ["Product Management", "Agile", "Data Analysis"],
      mentorshipAvailable: true,
      certificationOffered: false
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "On-site",
      type: "Contract",
      applications: 28,
      status: "Closed",
      postedDate: "2025-04-10",
      skills: ["UI Design", "Figma", "User Testing"],
      description: "Design beautiful and functional interfaces for our web and mobile applications.",
      requiredSkills: ["UI/UX", "Figma", "Adobe Creative Suite"],
      mentorshipAvailable: false,
      certificationOffered: true
    },
    {
      id: 4,
      title: "Data Science Intern",
      department: "Analytics",
      location: "Remote",
      type: "Internship",
      applications: 64,
      status: "Active",
      postedDate: "2025-04-20",
      skills: ["Python", "Data Analysis", "Machine Learning"],
      description: "Join our data team to gain hands-on experience in analyzing large datasets and building predictive models.",
      requiredSkills: ["Python", "Statistics", "SQL"],
      mentorshipAvailable: true,
      certificationOffered: true
    },
    {
      id: 5,
      title: "Marketing Challenge",
      department: "Marketing",
      location: "Remote",
      type: "Challenge",
      applications: 39,
      status: "Active",
      postedDate: "2025-04-22",
      skills: ["Content Creation", "Social Media", "Analytics"],
      description: "A 2-week challenge to develop a comprehensive social media campaign for our new product launch.",
      requiredSkills: ["Marketing", "Content Creation", "Social Media"],
      mentorshipAvailable: true,
      certificationOffered: true
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
                    placeholder="Search jobs..."
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Posted Jobs</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Manage your job postings and track applications
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="applications">Most Applications</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Job Type</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All types</SelectItem>
                            <SelectItem value="fulltime">Full-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="internship">Internship</SelectItem>
                            <SelectItem value="challenge">Challenge</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Location</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All locations</SelectItem>
                            <SelectItem value="remote">Remote</SelectItem>
                            <SelectItem value="onsite">On-site</SelectItem>
                            <SelectItem value="hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Status</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                            <SelectItem value="draft">Draft</SelectItem>
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

              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{job.title}</h3>
                          <div className="mt-1 space-y-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {job.department} • {job.location} • {job.type}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="h-4 w-4 mr-1" />
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Users className="h-4 w-4 mr-1" />
                          {job.applications} applications
                        </div>
                        {job.mentorshipAvailable && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Star className="h-4 w-4 mr-1" />
                            Mentorship
                          </div>
                        )}
                        {job.certificationOffered && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Briefcase className="h-4 w-4 mr-1" />
                            Certification
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex flex-wrap justify-end gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm">View Applicants</Button>
                      <Button size="sm">{job.status === 'Active' ? 'Close Job' : 'Reopen Job'}</Button>
                    </CardFooter>
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

export default Jobs;
