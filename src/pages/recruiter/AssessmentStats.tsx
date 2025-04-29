
import React, { useState } from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Search, Download, Users, BookOpen, Award } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const AssessmentStats = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const topPerformers = [
    {
      id: 1,
      name: "Alex Johnson",
      field: "Software Engineering",
      assessmentScore: 92,
      completedCourses: 8,
      skillsGained: ["React", "Node.js", "TypeScript", "MongoDB"],
      improvement: 38,
    },
    {
      id: 2,
      name: "Emily Chen",
      field: "Data Science",
      assessmentScore: 96,
      completedCourses: 12,
      skillsGained: ["Python", "Machine Learning", "TensorFlow", "Data Visualization"],
      improvement: 42,
    },
    {
      id: 3,
      name: "Michael Brown",
      field: "UI/UX Design",
      assessmentScore: 89,
      completedCourses: 6,
      skillsGained: ["Figma", "Wireframing", "User Testing", "Design Systems"],
      improvement: 27,
    }
  ];

  const courseCompletionData = [
    { name: "Software Development Essentials", students: 245, completionRate: 78 },
    { name: "Data Science Fundamentals", students: 186, completionRate: 65 },
    { name: "UX Design Principles", students: 154, completionRate: 82 },
    { name: "Project Management Basics", students: 173, completionRate: 73 },
    { name: "Cloud Computing Foundations", students: 198, completionRate: 69 },
  ];

  const skillDistributionData = [
    { skill: "Programming", count: 325, growth: 24 },
    { skill: "Data Analysis", count: 278, growth: 32 },
    { skill: "UI/UX Design", count: 202, growth: 18 },
    { skill: "Project Management", count: 186, growth: 15 },
    { skill: "Cloud Technologies", count: 223, growth: 29 },
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
                    placeholder="Search candidates..."
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
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Candidate Assessment Statistics</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Track candidates' progress in skills, assessments, and upskilling initiatives
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => window.location.href = "/recruiter/talent-search"}>
                    <Users className="h-4 w-4" />
                    Talent Search
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Candidates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-3xl font-bold">
                        1,248
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium dark:bg-green-900 dark:text-green-300">
                        +12% this month
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Assessment Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-3xl font-bold">
                        76%
                      </div>
                      <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium dark:bg-blue-900 dark:text-blue-300">
                        +5% from last month
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Avg. Skill Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-3xl font-bold">
                        34%
                      </div>
                      <div className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium dark:bg-purple-900 dark:text-purple-300">
                        +8% from baseline
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="courses">Course Completion</TabsTrigger>
                  <TabsTrigger value="skills">Skill Distribution</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Top Performers
                      </CardTitle>
                      <CardDescription>
                        Candidates with the highest assessment scores and skill improvements
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topPerformers.map(performer => (
                          <Card key={performer.id} className="border border-gray-200 dark:border-gray-700">
                            <CardContent className="p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <Avatar>
                                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                    {performer.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-gray-900 dark:text-white">{performer.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{performer.field}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Assessment Score</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{performer.assessmentScore}%</span>
                                  </div>
                                  <Progress value={performer.assessmentScore} className="h-2" />
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Courses Completed</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{performer.completedCourses}</span>
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Skill Improvement</span>
                                    <span className="font-semibold text-green-600 dark:text-green-400">+{performer.improvement}%</span>
                                  </div>
                                  <Progress value={performer.improvement} className="h-2 bg-gray-200 dark:bg-gray-700" />
                                </div>
                                
                                <div>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">Skills Gained</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {performer.skillsGained.map((skill, idx) => (
                                      <Badge key={idx} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="courses" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Course Completion Statistics
                      </CardTitle>
                      <CardDescription>
                        Data on candidate engagement with upskilling courses
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Enrolled Students</TableHead>
                            <TableHead>Completion Rate</TableHead>
                            <TableHead>Progress</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {courseCompletionData.map((course, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{course.name}</TableCell>
                              <TableCell>{course.students}</TableCell>
                              <TableCell>{course.completionRate}%</TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <Progress value={course.completionRate} className="h-2" />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Skill Distribution & Growth
                      </CardTitle>
                      <CardDescription>
                        Breakdown of skill acquisition across candidate pool
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Skill Category</TableHead>
                            <TableHead>Candidates</TableHead>
                            <TableHead>Growth Rate</TableHead>
                            <TableHead>Distribution</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {skillDistributionData.map((item, idx) => (
                            <TableRow key={idx}>
                              <TableCell className="font-medium">{item.skill}</TableCell>
                              <TableCell>{item.count}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                  +{item.growth}%
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <Progress 
                                    value={(item.count / 325) * 100} 
                                    className="h-2" 
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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

export default AssessmentStats;
