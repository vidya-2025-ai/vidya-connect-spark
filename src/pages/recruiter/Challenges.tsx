
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, Plus, Calendar, Users, Trophy } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Challenges = () => {
  const activeChallenges = [
    {
      id: 1,
      title: "Full-Stack Application Development",
      description: "Build a responsive web application with React frontend and Node.js backend",
      participants: 38,
      startDate: "Apr 15, 2025",
      endDate: "Apr 30, 2025",
      status: "Active",
      progress: 70,
      skills: ["React", "Node.js", "MongoDB", "API Integration"],
      prizes: ["Full-time job offer", "$1,000 cash prize", "Industry certification"]
    },
    {
      id: 2,
      title: "UX Design Challenge",
      description: "Design a mobile app interface for a sustainable living application",
      participants: 24,
      startDate: "Apr 20, 2025",
      endDate: "May 5, 2025",
      status: "Active",
      progress: 40,
      skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
      prizes: ["Design internship", "$800 cash prize", "UX certification"]
    }
  ];

  const pastChallenges = [
    {
      id: 3,
      title: "Data Science Hackathon",
      description: "Analyze customer data to predict buying patterns",
      participants: 45,
      startDate: "Mar 10, 2025",
      endDate: "Mar 25, 2025",
      status: "Completed",
      winners: [
        { name: "Emily Chen", project: "Predictive AI Model" },
        { name: "David Kim", project: "Visual Data Analysis" },
        { name: "Sarah Williams", project: "Customer Segmentation Algorithm" }
      ],
      hires: 3
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
                    placeholder="Search challenges..."
                    type="search"
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Corporate Challenges</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Create interactive challenges to identify and recruit top talent
                  </p>
                </div>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create Challenge
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">3</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2 active, 1 completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">107</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total participants across all challenges</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Hiring Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">6.7%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Conversion from challenges to hires</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="active" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="active">Active Challenges</TabsTrigger>
                  <TabsTrigger value="past">Past Challenges</TabsTrigger>
                  <TabsTrigger value="draft">Draft Challenges</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active">
                  <div className="space-y-6">
                    {activeChallenges.map((challenge) => (
                      <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{challenge.title}</CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                            </div>
                            <Badge variant="default">
                              {challenge.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.startDate} - {challenge.endDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.participants} participants
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.prizes.length} prizes
                              </span>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Challenge progress</span>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{challenge.progress}%</span>
                            </div>
                            <Progress value={challenge.progress} className="h-2" />
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {challenge.skills.map((skill, idx) => (
                                <Badge key={idx} variant="outline">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Prizes</p>
                            <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
                              {challenge.prizes.map((prize, idx) => (
                                <li key={idx}>{prize}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">View Submissions</Button>
                          <Button>Manage Challenge</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="past">
                  <div className="space-y-6">
                    {pastChallenges.map((challenge) => (
                      <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{challenge.title}</CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                            </div>
                            <Badge variant="secondary">
                              {challenge.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.startDate} - {challenge.endDate}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.participants} participants
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Trophy className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {challenge.hires} candidates hired
                              </span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Winners</p>
                            <div className="space-y-3">
                              {challenge.winners.map((winner, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                                  <Avatar>
                                    <AvatarFallback>{winner.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-white">{winner.name}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">{winner.project}</p>
                                  </div>
                                  {idx === 0 && (
                                    <Badge className="ml-auto">1st Place</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">View All Submissions</Button>
                          <Button>Challenge Report</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="draft">
                  <Card>
                    <CardContent className="p-12 flex flex-col items-center justify-center text-center">
                      <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">Create a New Challenge</h3>
                      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-6">
                        Draft a new corporate challenge to identify talented candidates through hands-on projects
                      </p>
                      <Button>Create Challenge</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
