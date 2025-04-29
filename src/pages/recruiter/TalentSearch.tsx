
import React, { useState } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bell, Star, BookOpen, GraduationCap } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TalentSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  
  const searchResults = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      university: "MIT",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      skillScore: 92,
      achievements: ["Top 10% in AI Challenge", "3 Industry Certifications"]
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager",
      university: "Stanford",
      skills: ["Product Strategy", "Agile", "User Research", "Data Analysis"],
      skillScore: 88,
      achievements: ["Led 5+ Product Launches", "Product Management Certification"]
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UI/UX Designer",
      university: "RISD",
      skills: ["Figma", "Adobe XD", "User Testing", "Wireframing"],
      skillScore: 85,
      achievements: ["Design Excellence Award", "UX Research Certificate"]
    },
    {
      id: 4,
      name: "Emily Chen",
      role: "Data Scientist",
      university: "UC Berkeley",
      skills: ["Python", "ML/AI", "TensorFlow", "SQL"],
      skillScore: 96,
      achievements: ["ML Competition Winner", "Published Research Paper"]
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search talent by skills, education, or experience..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
              </Button>

              <div className="relative">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
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
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Talent Search</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find talented candidates based on skills and qualifications
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4" />
                    {filterOpen ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                </div>
              </div>

              {filterOpen && (
                <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Skill-Based Search</h3>
                        <div className="relative">
                          <Input 
                            placeholder="Enter skills (e.g., React, Python, UI Design)"
                            className="pl-10"
                          />
                          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Education Filter</h3>
                        <div className="relative">
                          <Input 
                            placeholder="University, degree, or field of study"
                            className="pl-10"
                          />
                          <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        </div>
                      </div>
                      <div>
                        <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Experience Level</h3>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="entry">Entry Level</SelectItem>
                            <SelectItem value="mid">Mid Level</SelectItem>
                            <SelectItem value="senior">Senior Level</SelectItem>
                            <SelectItem value="any">Any Level</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button>Search Talent</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {searchResults.map((candidate) => (
                  <Card key={candidate.id} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{candidate.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.role}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.university}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                          <Star className="h-3 w-3 mr-1" fill="currentColor" />
                          {candidate.skillScore}% Match
                        </Badge>
                      </div>
                      <div className="mt-4 space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {candidate.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Achievements</p>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside">
                            {candidate.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end gap-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button size="sm">Contact</Button>
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

export default TalentSearch;
