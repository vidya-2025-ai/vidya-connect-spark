
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, Search, Star, MessageSquare, Calendar } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Mentorship = () => {
  const mentees = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineering Intern",
      goals: ["Master React & TypeScript", "System Design Skills"],
      progress: 75,
      nextMeeting: "Apr 30, 2:00 PM",
      skillGrowth: 23
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Management Intern",
      goals: ["Product Strategy", "User Research Methods"],
      progress: 60,
      nextMeeting: "May 2, 10:30 AM",
      skillGrowth: 18
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UI/UX Design Intern",
      goals: ["Advanced Figma Techniques", "User Testing"],
      progress: 40,
      nextMeeting: "May 3, 1:00 PM",
      skillGrowth: 15
    }
  ];

  const potentialMentees = [
    {
      id: 4,
      name: "Emily Chen",
      role: "Data Science Intern",
      interests: ["Machine Learning", "Data Visualization", "NLP"],
      skillMatch: 92,
      message: "I'm looking to improve my skills in machine learning and would love guidance from an experienced professional."
    },
    {
      id: 5,
      name: "David Kim",
      role: "Marketing Intern",
      interests: ["Content Strategy", "Growth Marketing", "Analytics"],
      skillMatch: 85,
      message: "I'm passionate about growth marketing and would appreciate mentorship from someone with industry experience."
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
                    placeholder="Search mentees..."
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
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mentorship Program</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Guide and support interns through personalized mentorship
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Mentees</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">3</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active mentorship relationships</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Sessions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">12</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Mentorship sessions conducted</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Skill Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">+18%</div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Average skill improvement</p>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="current" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="current">Current Mentees</TabsTrigger>
                  <TabsTrigger value="requests">Mentorship Requests</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="current">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mentees.map((mentee) => (
                      <Card key={mentee.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentee.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.role}</p>
                              <div className="flex items-center mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  +{mentee.skillGrowth}% Skill Growth
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 space-y-3">
                            <div>
                              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Goals</p>
                              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1 list-disc list-inside">
                                {mentee.goals.map((goal, index) => (
                                  <li key={index}>{goal}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</p>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{mentee.progress}%</p>
                              </div>
                              <Progress value={mentee.progress} className="h-2" />
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                              <Calendar className="h-4 w-4 mr-1" />
                              Next Meeting: {mentee.nextMeeting}
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-between">
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="requests">
                  <div className="space-y-6">
                    {potentialMentees.map((mentee) => (
                      <Card key={mentee.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{mentee.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{mentee.role}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {mentee.interests.map((interest, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                              <Star className="h-3 w-3 mr-1" fill="currentColor" />
                              {mentee.skillMatch}% Match
                            </Badge>
                          </div>
                          
                          <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              <span className="font-medium">Message: </span>
                              {mentee.message}
                            </p>
                          </div>
                          
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline">Decline</Button>
                            <Button>Accept Mentee</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="resources">
                  <Card>
                    <CardHeader>
                      <CardTitle>Mentorship Resources</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Mentorship Guidelines",
                            description: "Best practices and guidelines for effective mentorship",
                            type: "PDF Guide"
                          },
                          {
                            title: "Goal Setting Templates",
                            description: "Templates to help set and track mentorship goals",
                            type: "Templates"
                          },
                          {
                            title: "Effective Feedback Techniques",
                            description: "How to provide constructive feedback to mentees",
                            type: "Video Course"
                          },
                          {
                            title: "Mentorship Agreement",
                            description: "Standard agreement defining mentor-mentee relationship",
                            type: "Document"
                          }
                        ].map((resource, idx) => (
                          <div key={idx} className="p-4 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="font-medium text-gray-900 dark:text-white">{resource.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{resource.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="outline">{resource.type}</Badge>
                              <Button variant="outline" size="sm">View</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-4">
                        <Button variant="outline">View All Resources</Button>
                      </div>
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

export default Mentorship;
