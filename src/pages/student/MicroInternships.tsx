
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, MapPin } from 'lucide-react';

const microInternships = [
  {
    id: 1,
    title: "AI Chatbot Improvement Project",
    company: "Tech Solutions Inc.",
    description: "Help improve our customer service chatbot by analyzing conversation data and suggesting improvements to response patterns.",
    duration: "2 weeks",
    compensation: "$250",
    type: "Remote",
    skills: ["Data Analysis", "NLP", "Python"],
    status: "open"
  },
  {
    id: 2,
    title: "Marketing Campaign Analysis",
    company: "Brand Boost Agency",
    description: "Analyze the performance of our recent social media marketing campaign and provide insights for future improvements.",
    duration: "1 week",
    compensation: "$150",
    type: "Remote",
    skills: ["Marketing Analytics", "Social Media", "Data Visualization"],
    status: "open"
  },
  {
    id: 3,
    title: "Mobile App UX Review",
    company: "AppWorks Studio",
    description: "Conduct a comprehensive UX review of our mobile app and provide actionable recommendations to improve user experience.",
    duration: "3 days",
    compensation: "$100",
    type: "Remote",
    skills: ["UX Design", "Mobile Apps", "User Testing"],
    status: "open"
  },
  {
    id: 4,
    title: "Content Creation for Tech Blog",
    company: "TechInsight",
    description: "Create 3 blog posts about emerging technologies and their potential impact on the future of work.",
    duration: "1 week",
    compensation: "$120",
    type: "Remote",
    skills: ["Content Writing", "Research", "SEO"],
    status: "open"
  },
  {
    id: 5,
    title: "E-commerce Data Analysis",
    company: "ShopSmart",
    description: "Analyze customer purchase patterns to identify products that could be cross-sold effectively.",
    duration: "2 weeks",
    compensation: "$200",
    type: "Hybrid",
    skills: ["Data Analysis", "Excel", "SQL"],
    status: "active",
    progress: 35
  },
  {
    id: 6,
    title: "Financial Report Preparation",
    company: "Global Finance",
    description: "Assist in preparing quarterly financial reports and creating visualizations for stakeholder presentation.",
    duration: "1 week",
    compensation: "$175",
    type: "Remote",
    skills: ["Financial Analysis", "Excel", "Data Visualization"],
    status: "completed",
    rating: 4.8
  }
];

const MicroInternships = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Micro-Internships & Live Projects</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Short-term, professional projects that can be completed in 5-40 hours
                </p>
              </div>
              <Button className="mt-4 md:mt-0">Create Project Request</Button>
            </div>

            <Tabs defaultValue="available" className="mt-6">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="available">Available Projects</TabsTrigger>
                <TabsTrigger value="active">Active Projects</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="available" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {microInternships
                    .filter(project => project.status === "open")
                    .map(project => (
                      <Card key={project.id} className="flex flex-col h-full">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{project.company}</p>
                            </div>
                            <Badge>{project.compensation}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {project.description}
                          </p>
                          <div className="flex items-center gap-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {project.duration}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {project.type}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Apply Now</Button>
                        </CardFooter>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {microInternships
                    .filter(project => project.status === "active")
                    .map(project => (
                      <Card key={project.id} className="flex flex-col h-full">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{project.company}</p>
                            </div>
                            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              In Progress
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            {project.description}
                          </p>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full mt-1 dark:bg-gray-700">
                                <div 
                                  className="h-2 bg-blue-600 rounded-full" 
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">Continue Working</Button>
                        </CardFooter>
                      </Card>
                    ))
                  }
                  {microInternships.filter(project => project.status === "active").length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">You don't have any active micro-internships at the moment.</p>
                      <Button variant="outline" className="mt-4">Browse Available Projects</Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="completed" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {microInternships
                    .filter(project => project.status === "completed")
                    .map(project => (
                      <Card key={project.id} className="flex flex-col h-full">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{project.title}</CardTitle>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{project.company}</p>
                            </div>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Completed
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center mb-4">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < Math.floor(project.rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                  fill={i < Math.floor(project.rating) ? 'currentColor' : 'none'}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{project.rating}</span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                            {project.description}
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Certificate</Button>
                        </CardFooter>
                      </Card>
                    ))
                  }
                  {microInternships.filter(project => project.status === "completed").length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 dark:text-gray-400">You haven't completed any micro-internships yet.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

import { Star } from 'lucide-react';
export default MicroInternships;
