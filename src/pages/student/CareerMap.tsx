
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CareerMap = () => {
  const careerPaths = [
    { id: 1, name: "Frontend Development", progress: 65, level: "Intermediate" },
    { id: 2, name: "UX/UI Design", progress: 42, level: "Beginner" },
    { id: 3, name: "Data Analysis", progress: 28, level: "Beginner" },
  ];

  const milestones = [
    { id: 1, name: "HTML & CSS Mastery", completed: true, pathId: 1 },
    { id: 2, name: "JavaScript Fundamentals", completed: true, pathId: 1 },
    { id: 3, name: "React Basics", completed: true, pathId: 1 },
    { id: 4, name: "Redux & State Management", completed: false, pathId: 1 },
    { id: 5, name: "Advanced React Patterns", completed: false, pathId: 1 },
    { id: 6, name: "UI Design Principles", completed: true, pathId: 2 },
    { id: 7, name: "User Research Methods", completed: true, pathId: 2 },
    { id: 8, name: "Wireframing & Prototyping", completed: false, pathId: 2 },
    { id: 9, name: "Figma Advanced Techniques", completed: false, pathId: 2 },
    { id: 10, name: "Excel & SQL Basics", completed: true, pathId: 3 },
    { id: 11, name: "Data Visualization", completed: false, pathId: 3 },
    { id: 12, name: "Python for Data Analysis", completed: false, pathId: 3 },
  ];

  const recommendedOpportunities = [
    {
      id: 1,
      title: "Frontend Developer Intern",
      company: "TechCorp",
      match: 92,
      skills: ["React", "JavaScript", "CSS"]
    },
    {
      id: 2,
      title: "UI/UX Design Assistant",
      company: "DesignStudio",
      match: 85,
      skills: ["Figma", "UI Design", "Wireframing"]
    },
    {
      id: 3,
      title: "Junior Data Analyst",
      company: "DataInsights",
      match: 78,
      skills: ["Excel", "SQL", "Data Visualization"]
    }
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  AI-Powered Career Progression Map
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Track your skill progression and career path recommendations based on your profile
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <Button variant="outline">Take Career Quiz</Button>
                <Button>Update Preferences</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Your Career Paths</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {careerPaths.map(path => (
                      <div key={path.id} className="mb-6 last:mb-0">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h3 className="font-medium">{path.name}</h3>
                            <div className="flex items-center mt-1">
                              <Badge variant={
                                path.level === "Beginner" ? "outline" : 
                                path.level === "Intermediate" ? "secondary" : "default"
                              }>
                                {path.level}
                              </Badge>
                            </div>
                          </div>
                          <span className="text-sm">{path.progress}%</span>
                        </div>
                        <Progress value={path.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Your Learning Journey</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="1" className="mt-2">
                      <TabsList className="grid grid-cols-3 mb-4">
                        {careerPaths.map(path => (
                          <TabsTrigger key={path.id} value={path.id.toString()}>
                            {path.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      {careerPaths.map(path => (
                        <TabsContent key={path.id} value={path.id.toString()} className="space-y-4">
                          {milestones
                            .filter(milestone => milestone.pathId === path.id)
                            .map(milestone => (
                              <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border">
                                <div className="flex items-center">
                                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                                    milestone.completed ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-400 dark:bg-gray-800'
                                  }`}>
                                    {milestone.completed ? (
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    ) : (
                                      milestone.id
                                    )}
                                  </div>
                                  <span className={milestone.completed ? "line-through text-gray-500" : ""}>
                                    {milestone.name}
                                  </span>
                                </div>
                                {!milestone.completed && (
                                  <Button variant="outline" size="sm">Start Learning</Button>
                                )}
                              </div>
                            ))
                          }
                        </TabsContent>
                      ))}
                    </Tabs>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Recommended Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recommendedOpportunities.map(opportunity => (
                        <div key={opportunity.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{opportunity.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.company}</p>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              {opportunity.match}% Match
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {opportunity.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                          <Button className="w-full mt-3" size="sm">View Details</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle>Future Vision</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                      <h3 className="font-medium text-blue-900 dark:text-blue-300">Career Insurance</h3>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Complete your verified skill profile to qualify for our Career Insurance program - guaranteeing job placement within 6 months of graduation.
                      </p>
                      <Button className="w-full mt-4" variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerMap;
