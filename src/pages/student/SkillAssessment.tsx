
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';

const skillAssessments = [
  {
    id: 1,
    name: "Frontend Development",
    description: "HTML, CSS, JavaScript, React fundamentals",
    estimated: "45 minutes",
    completed: false,
    recommended: true,
    skills: ["HTML", "CSS", "JavaScript", "React"]
  },
  {
    id: 2,
    name: "Backend Development",
    description: "Node.js, Express, databases, API design",
    estimated: "60 minutes",
    completed: false,
    recommended: true,
    skills: ["Node.js", "Express", "MongoDB", "RESTful APIs"]
  },
  {
    id: 3,
    name: "UX Design Principles",
    description: "User research, wireframing, prototyping",
    estimated: "40 minutes",
    completed: true,
    score: 87,
    skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
  },
  {
    id: 4,
    name: "Data Analysis",
    description: "Statistical analysis, data visualization",
    estimated: "55 minutes",
    completed: true,
    score: 92,
    skills: ["Excel", "SQL", "Python", "Data Visualization"]
  }
];

const SkillAssessment = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Skill Assessment</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Take assessments to verify your skills and unlock guaranteed internship opportunities
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>View All Skills</Button>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    Internship Guarantee Program
                  </CardTitle>
                  <CardDescription>Complete skill assessments with 80%+ scores to qualify</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Progress</span>
                        <span className="text-sm font-medium">2/5 completed</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-md">
                      <p className="text-sm font-medium">Your Current Status</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Complete 3 more assessments to qualify for guaranteed internship placement</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Certified Now</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Your Skill Profile</CardTitle>
                  <CardDescription>Based on completed assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      {skillAssessments
                        .filter(assessment => assessment.completed)
                        .flatMap(assessment => assessment.skills)
                        .map((skill, index) => (
                          <Badge key={index} className="justify-center py-1.5">{skill}</Badge>
                        ))
                      }
                    </div>
                    {skillAssessments.filter(assessment => assessment.completed).length === 0 && (
                      <p className="text-center text-gray-500 dark:text-gray-400 py-4">Complete assessments to build your skill profile</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Available Assessments</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillAssessments.map((assessment) => (
                <Card key={assessment.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{assessment.name}</CardTitle>
                      {assessment.recommended && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{assessment.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Estimated time: {assessment.estimated}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {assessment.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                      {assessment.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">+{assessment.skills.length - 3}</Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {assessment.completed ? (
                      <div className="w-full">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Your score</span>
                          <span className="text-sm font-medium">{assessment.score}%</span>
                        </div>
                        <Progress value={assessment.score} className="h-2 mb-2" />
                        <Button variant="outline" className="w-full mt-1">View Certificate</Button>
                      </div>
                    ) : (
                      <Button className="w-full">Start Assessment</Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;
