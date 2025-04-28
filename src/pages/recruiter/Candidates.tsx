
import React, { useState } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail, Star, Bell, Download } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);

  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      experience: "5 years",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      status: "Available",
      education: "B.Tech in Computer Science",
      skillAssessmentScore: 92,
      certifications: ["AWS Certified Developer", "MongoDB Professional"],
      mentorshipInterest: true,
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager",
      experience: "7 years",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
      status: "In Process",
      education: "MBA",
      skillAssessmentScore: 88,
      certifications: ["Certified Scrum Product Owner"],
      mentorshipInterest: true,
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UI/UX Designer",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "User Testing", "Wireframing"],
      status: "Hired",
      education: "BFA in Graphic Design",
      skillAssessmentScore: 85,
      certifications: ["Adobe Certified Expert"],
      mentorshipInterest: false,
    },
    {
      id: 4,
      name: "Emily Chen",
      role: "Data Scientist",
      experience: "3 years",
      skills: ["Python", "ML/AI", "TensorFlow", "SQL"],
      status: "Available",
      education: "MS in Data Science",
      skillAssessmentScore: 96,
      certifications: ["TensorFlow Developer Certificate", "SQL Expert"],
      mentorshipInterest: true,
    },
    {
      id: 5,
      name: "David Kim",
      role: "Marketing Specialist",
      experience: "6 years",
      skills: ["Content Strategy", "SEO", "Social Media", "Analytics"],
      status: "In Process",
      education: "BA in Marketing",
      skillAssessmentScore: 90,
      certifications: ["Google Analytics Certified", "HubSpot Certified"],
      mentorshipInterest: true,
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
                    placeholder="Search candidates by name, skills, or role..."
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Candidates</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Browse and manage candidate profiles
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Select defaultValue="skillscore">
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="skillscore">Skill Score</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="alphabetical">Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 bg-white dark:bg-gray-800">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Candidate Status</h3>
                        <div className="space-y-2">
                          {["Available", "In Process", "Hired"].map((status) => (
                            <div key={status} className="flex items-center space-x-2">
                              <Checkbox id={`status-${status}`} />
                              <Label htmlFor={`status-${status}`} className="text-sm">{status}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Skills</h3>
                        <div className="space-y-2">
                          {["React", "Python", "Product Management", "UX Design", "Data Science", "Marketing"].map((skill) => (
                            <div key={skill} className="flex items-center space-x-2">
                              <Checkbox id={`skill-${skill}`} />
                              <Label htmlFor={`skill-${skill}`} className="text-sm">{skill}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Experience Level</h3>
                        <Select>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select experience" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All experience levels</SelectItem>
                            <SelectItem value="entry">Entry (0-2 years)</SelectItem>
                            <SelectItem value="mid">Mid (3-5 years)</SelectItem>
                            <SelectItem value="senior">Senior (6+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Additional Filters</h3>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox id="mentor" />
                            <Label htmlFor="mentor" className="text-sm">Interested in Mentoring</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="certifications" />
                            <Label htmlFor="certifications" className="text-sm">Has Certifications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox id="highscore" />
                            <Label htmlFor="highscore" className="text-sm">Skill Score 90%+</Label>
                          </div>
                        </div>
                        <div className="mt-4">
                          <Button className="w-full">Apply Filters</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                  <Card key={candidate.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{candidate.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.role}</p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            candidate.status === "Available"
                              ? "default"
                              : candidate.status === "In Process"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {candidate.status}
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Experience: {candidate.experience}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Education: {candidate.education}</p>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills Assessment</p>
                            <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                              <Star className="h-3 w-3 mr-1" fill="currentColor" />
                              {candidate.skillAssessmentScore}%
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        {candidate.certifications.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Certifications</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {candidate.certifications.map((cert, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button variant="outline" size="sm" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Contact
                        </Button>
                        <Button size="sm">View Profile</Button>
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

export default Candidates;
