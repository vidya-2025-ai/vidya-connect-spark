
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, MapPin, GraduationCap, Code, Lightbulb } from 'lucide-react';
import { careerService } from '@/services/api/careerService';
import { skillService } from '@/services/api/skillService';
import { toast } from '@/components/ui/use-toast';

const CareerSkills = () => {
  const [mainTab, setMainTab] = useState("career");
  
  // Fetch career data
  const { data: careerData, isLoading: isCareerLoading, error: careerError } = useQuery({
    queryKey: ['careerPaths'],
    queryFn: careerService.getCareerData
  });

  // Fetch job recommendations
  const { data: recommendedJobs, isLoading: isJobsLoading, error: jobsError } = useQuery({
    queryKey: ['recommendedJobs'],
    queryFn: careerService.getRecommendedJobs
  });

  // Fetch skill assessments
  const { data: userSkills, isLoading: isSkillsLoading, error: skillsError } = useQuery({
    queryKey: ['userSkills'],
    queryFn: skillService.getUserSkills
  });

  // Fetch learning paths
  const { data: learningPaths, isLoading: isPathsLoading, error: pathsError } = useQuery({
    queryKey: ['learningPaths'],
    queryFn: careerService.getLearningPaths
  });

  // Fetch projects
  const { data: projects, isLoading: isProjectsLoading, error: projectsError } = useQuery({
    queryKey: ['careerProjects'],
    queryFn: careerService.getProjects
  });

  // Fetch recommendations
  const { data: recommendations, isLoading: isRecommendationsLoading, error: recommendationsError } = useQuery({
    queryKey: ['careerRecommendations'],
    queryFn: careerService.getRecommendations
  });

  // Handle any errors
  useEffect(() => {
    if (careerError) {
      toast({
        title: "Error loading career data",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  }, [careerError]);

  // Format skill assessments
  const skillAssessments = userSkills?.map(skill => ({
    id: skill.id,
    name: skill.skill.name,
    score: skill.level * 20, // Convert 1-5 scale to 0-100
    total: 100,
    date: skill.assessments?.[0]?.date || new Date().toISOString()
  })) || [];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Career & Skills Development
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Plan your career path and develop your skills portfolio
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>Take Skills Assessment</Button>
              </div>
            </div>

            <Tabs defaultValue="career" value={mainTab} onValueChange={setMainTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="career" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> Career Map
                </TabsTrigger>
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" /> Skills & Learning
                </TabsTrigger>
              </TabsList>

              {/* Career Map Tab */}
              <TabsContent value="career" className="space-y-6">
                <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle>Your Career Paths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isCareerLoading ? (
                          <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="animate-pulse">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2"></div>
                                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          careerData?.careerPaths.map(path => (
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
                          ))
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle>Milestones</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isCareerLoading ? (
                          <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="animate-pulse">
                                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Tabs defaultValue={careerData?.careerPaths[0]?.id.toString()} className="mt-2">
                            <TabsList className="grid grid-cols-3 mb-4">
                              {careerData?.careerPaths.map(path => (
                                <TabsTrigger key={path.id} value={path.id.toString()}>
                                  {path.name}
                                </TabsTrigger>
                              ))}
                            </TabsList>

                            {careerData?.careerPaths.map(path => (
                              <TabsContent key={path.id} value={path.id.toString()} className="space-y-4">
                                {careerData?.milestones
                                  .filter(milestone => milestone.pathId === path.id)
                                  .map(milestone => (
                                    <div key={milestone.id} className="flex items-center justify-between p-3 rounded-lg border dark:border-gray-700">
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
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-4">
                        <CardTitle>Recommended Jobs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isJobsLoading ? (
                          <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="animate-pulse">
                                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-4">
                            {recommendedJobs?.map(job => (
                              <div key={job.id} className="p-4 border rounded-lg dark:border-gray-700">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{job.title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{job.company}</p>
                                  </div>
                                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                    {job.match}% Match
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {job.skills.map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                                  ))}
                                </div>
                                <Button className="w-full mt-3" size="sm">View Details</Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Skills & Learning Tab */}
              <TabsContent value="skills" className="space-y-6">
                <Tabs defaultValue="assessments" className="w-full">
                  <TabsList className="grid grid-cols-4 mb-4">
                    <TabsTrigger value="assessments" className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> Assessments
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" /> Learning Paths
                    </TabsTrigger>
                    <TabsTrigger value="projects" className="flex items-center gap-1">
                      <Code className="h-3 w-3" /> Projects
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex items-center gap-1">
                      <Lightbulb className="h-3 w-3" /> Recommendations
                    </TabsTrigger>
                  </TabsList>

                  {/* Assessments Tab */}
                  <TabsContent value="assessments">
                    <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
                      <div className="lg:col-span-2">
                        <Card>
                          <CardHeader>
                            <CardTitle>Your Skill Assessments</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {isSkillsLoading ? (
                              <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                  <div key={i} className="animate-pulse">
                                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {skillAssessments.map(assessment => (
                                  <div key={assessment.id} className="border rounded-lg p-4 dark:border-gray-700">
                                    <div className="flex justify-between mb-2">
                                      <h3 className="font-medium">{assessment.name}</h3>
                                      <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {new Date(assessment.date).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Progress 
                                        value={(assessment.score / assessment.total) * 100} 
                                        className="h-2 flex-1" 
                                      />
                                      <span className="text-sm font-medium">
                                        {assessment.score}/{assessment.total}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                            <Button className="w-full mt-4">Take New Assessment</Button>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <Card>
                          <CardHeader>
                            <CardTitle>Skill Profile</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                              <h3 className="font-medium text-blue-900 dark:text-blue-300">Profile Completion</h3>
                              <div className="flex items-center gap-2 mt-2">
                                <Progress value={70} className="h-2 flex-1" />
                                <span className="text-sm font-medium">70%</span>
                              </div>
                              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Complete your skill profile to improve job match accuracy.
                              </p>
                              <Button className="w-full mt-4" variant="outline">Complete Profile</Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Learning Paths Tab */}
                  <TabsContent value="courses">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {isPathsLoading ? (
                        [1, 2, 3].map(i => (
                          <div key={i} className="animate-pulse">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                          </div>
                        ))
                      ) : (
                        <>
                          {learningPaths?.map(path => (
                            <Card key={path.id}>
                              <CardHeader>
                                <CardTitle>{path.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div>
                                    <div className="flex justify-between mb-1">
                                      <p className="text-sm text-gray-500 dark:text-gray-400">Progress</p>
                                      <p className="text-sm font-medium">{path.progress}%</p>
                                    </div>
                                    <Progress value={path.progress} className="h-2" />
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{path.modules} modules</p>
                                  <Button className="w-full">Continue Learning</Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                          <Card className="flex flex-col items-center justify-center border-dashed">
                            <CardContent className="pt-6 text-center">
                              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                              <h3 className="font-medium mb-2">Discover New Paths</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Explore learning paths tailored to your career goals
                              </p>
                              <Button>Explore Courses</Button>
                            </CardContent>
                          </Card>
                        </>
                      )}
                    </div>
                  </TabsContent>

                  {/* Projects Tab */}
                  <TabsContent value="projects">
                    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                      {isProjectsLoading ? (
                        [1, 2, 3].map(i => (
                          <div key={i} className="animate-pulse">
                            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                          </div>
                        ))
                      ) : (
                        <>
                          {projects?.map(project => (
                            <Card key={project.id}>
                              <CardHeader>
                                <CardTitle>{project.name}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-wrap gap-1 mb-4">
                                  {project.tags.map((tag, index) => (
                                    <Badge key={index} variant="outline">{tag}</Badge>
                                  ))}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                  Deadline: {new Date(project.deadline).toLocaleDateString()}
                                </p>
                                <Button className="w-full">View Project</Button>
                              </CardContent>
                            </Card>
                          ))}
                          <Card className="flex flex-col items-center justify-center border-dashed">
                            <CardContent className="pt-6 text-center">
                              <Code className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                              <h3 className="font-medium mb-2">Start New Project</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Create or join a hands-on project to build your portfolio
                              </p>
                              <Button>Create Project</Button>
                            </CardContent>
                          </Card>
                        </>
                      )}
                    </div>
                  </TabsContent>

                  {/* Recommendations Tab */}
                  <TabsContent value="recommendations">
                    <Card>
                      <CardHeader>
                        <CardTitle>Personalized Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isRecommendationsLoading ? (
                          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-4">
                              {[1, 2].map(i => (
                                <div key={i} className="animate-pulse">
                                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-4">
                              {[1, 2].map(i => (
                                <div key={i} className="animate-pulse">
                                  <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            <div className="space-y-4">
                              <h3 className="font-medium">Based on Your Career Goals</h3>
                              {recommendations?.careerBased.map(rec => (
                                <div key={rec.id} className="p-4 rounded-lg border dark:border-gray-700">
                                  <h4 className="font-medium mb-2">{rec.title}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {rec.description}
                                  </p>
                                  <Button size="sm">Start Learning</Button>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-4">
                              <h3 className="font-medium">Industry Trending Skills</h3>
                              {recommendations?.trending.map(rec => (
                                <div key={rec.id} className="p-4 rounded-lg border dark:border-gray-700">
                                  <h4 className="font-medium mb-2">{rec.title}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    {rec.description}
                                  </p>
                                  <Button size="sm">Start Learning</Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSkills;
