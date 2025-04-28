
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

const challenges = [
  {
    id: 1,
    title: "Web App Accessibility Challenge",
    company: "Microsoft",
    logo: "https://logo.clearbit.com/microsoft.com",
    description: "Improve the accessibility of our demo web application for users with disabilities",
    deadline: "2025-05-20",
    difficulty: "Intermediate",
    participants: 145,
    prize: "Paid Internship Opportunity",
    skills: ["Web Accessibility", "HTML", "JavaScript", "ARIA"]
  },
  {
    id: 2,
    title: "Customer Engagement Data Analysis",
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    description: "Analyze customer engagement data and provide actionable insights for increasing retention",
    deadline: "2025-05-15",
    difficulty: "Advanced",
    participants: 87,
    prize: "₹25,000 + Interview Fast-Track",
    skills: ["Data Analysis", "Python", "SQL", "Data Visualization"]
  },
  {
    id: 3,
    title: "Mobile UI Design Sprint",
    company: "Flipkart",
    logo: "https://logo.clearbit.com/flipkart.com", 
    description: "Design a new feature for our mobile app that enhances the shopping experience",
    deadline: "2025-05-25",
    difficulty: "Beginner",
    participants: 203,
    prize: "₹15,000 + Design Internship",
    skills: ["UI Design", "Mobile UX", "Figma", "Prototyping"]
  }
];

const activeChallenges = [
  {
    id: 4,
    title: "AI Product Recommendation Engine",
    company: "TechCorp",
    logo: "https://logo.clearbit.com/techcrunch.com",
    description: "Build an AI-powered recommendation engine for an e-commerce platform",
    deadline: "2025-05-10",
    progress: 65,
    remainingDays: 8,
    stage: "Implementation Phase"
  }
];

const pastChallenges = [
  {
    id: 5,
    title: "Sustainable Supply Chain Challenge",
    company: "Unilever",
    logo: "https://logo.clearbit.com/unilever.com",
    description: "Proposed solutions for optimizing supply chain sustainability",
    result: "Finalist",
    feedback: "Creative solution with strong implementation plan. Could improve on cost analysis."
  },
  {
    id: 6,
    title: "Green Energy Mobile App",
    company: "Tata Power",
    logo: "https://logo.clearbit.com/tatapower.com",
    description: "Designed a mobile app to help users monitor and reduce their energy consumption",
    result: "Winner",
    feedback: "Exceptional UX design with innovative features. Your team demonstrated strong collaboration skills."
  }
];

const leaderboard = [
  { rank: 1, name: "Team Innovators", avatar: "", points: 325, members: 4 },
  { rank: 2, name: "Data Wizards", avatar: "", points: 298, members: 3 },
  { rank: 3, name: "UX Maestros", avatar: "", points: 276, members: 3 },
  { rank: 4, name: "Code Crafters", avatar: "", points: 242, members: 4 },
  { rank: 5, name: "AI Explorers", avatar: "", points: 217, members: 3 }
];

const InternshipChallenges = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Corporate Internship Challenges</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Showcase your skills through gamified hiring challenges from top companies
                </p>
              </div>
              <Button className="mt-4 md:mt-0">Form a Team</Button>
            </div>

            <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Challenge of the Month: Sustainable Innovation
                  </h2>
                  <p className="mt-2 text-gray-700 dark:text-gray-300">
                    Design a sustainable solution for reducing waste in corporate environments. 
                    Top 3 teams will receive internship offers and cash prizes!
                  </p>
                  <div className="flex mt-4 space-x-3">
                    <Button className="bg-indigo-600 hover:bg-indigo-700">View Challenge</Button>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
                <div className="md:w-1/3 flex justify-center">
                  <div className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm w-full max-w-xs">
                    <h3 className="font-medium text-gray-900 dark:text-white">Challenge Stats</h3>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Participants</p>
                        <p className="text-xl font-semibold">312</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Teams</p>
                        <p className="text-xl font-semibold">78</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Days Left</p>
                        <p className="text-xl font-semibold">14</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Prize Pool</p>
                        <p className="text-xl font-semibold">₹50K</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Tabs defaultValue="explore" className="mt-8">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="explore">Explore Challenges</TabsTrigger>
                <TabsTrigger value="active">My Active Challenges</TabsTrigger>
                <TabsTrigger value="past">Past Submissions</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>

              <TabsContent value="explore" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {challenges.map(challenge => (
                    <Card key={challenge.id} className="flex flex-col h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            {challenge.logo ? (
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarImage src={challenge.logo} alt={challenge.company} />
                                <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            ) : (
                              <Avatar className="h-10 w-10 mr-3">
                                <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                            )}
                            <div>
                              <CardTitle className="text-base">{challenge.title}</CardTitle>
                              <CardDescription>{challenge.company}</CardDescription>
                            </div>
                          </div>
                          <Badge className={
                            challenge.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                            challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                          }>
                            {challenge.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                          {challenge.description}
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Deadline</span>
                            <span className="font-medium">{new Date(challenge.deadline).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Participants</span>
                            <span className="font-medium">{challenge.participants}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">Prize</span>
                            <span className="font-medium text-green-600 dark:text-green-400">{challenge.prize}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-4">
                          {challenge.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Join Challenge</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="active" className="space-y-6">
                {activeChallenges.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {activeChallenges.map(challenge => (
                      <Card key={challenge.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {challenge.logo ? (
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={challenge.logo} alt={challenge.company} />
                                  <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <CardTitle className="text-base">{challenge.title}</CardTitle>
                                <CardDescription>{challenge.company}</CardDescription>
                              </div>
                            </div>
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                              {challenge.stage}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            {challenge.description}
                          </p>
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                <span>{challenge.progress}%</span>
                              </div>
                              <Progress value={challenge.progress} className="h-2" />
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Time Remaining</span>
                              <span className="font-medium">{challenge.remainingDays} days</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Deadline</span>
                              <span className="font-medium">{new Date(challenge.deadline).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">Team Dashboard</Button>
                          <Button>Continue Working</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Active Challenges</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                      You're not currently participating in any challenges. Explore available challenges and join one to showcase your skills!
                    </p>
                    <Button className="mt-6">Explore Challenges</Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="past" className="space-y-6">
                {pastChallenges.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    {pastChallenges.map(challenge => (
                      <Card key={challenge.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div className="flex items-center">
                              {challenge.logo ? (
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={challenge.logo} alt={challenge.company} />
                                  <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              ) : (
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarFallback>{challenge.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                              )}
                              <div>
                                <CardTitle className="text-base">{challenge.title}</CardTitle>
                                <CardDescription>{challenge.company}</CardDescription>
                              </div>
                            </div>
                            <Badge className={
                              challenge.result === 'Winner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                              challenge.result === 'Finalist' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                              'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                            }>
                              {challenge.result}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                            {challenge.description}
                          </p>
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                            <p className="text-sm font-medium mb-1">Feedback</p>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                              {challenge.feedback}
                            </p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline">View Submission</Button>
                          <Button variant="outline">View Certificate</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400">You haven't participated in any challenges yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="leaderboard">
                <Card>
                  <CardHeader>
                    <CardTitle>Challenge Leaderboard - This Month</CardTitle>
                    <CardDescription>Top performing teams based on challenge participation and outcomes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-4 py-3 w-16 text-center">Rank</th>
                            <th scope="col" className="px-4 py-3">Team</th>
                            <th scope="col" className="px-4 py-3">Members</th>
                            <th scope="col" className="px-4 py-3 text-right">Points</th>
                            <th scope="col" className="px-4 py-3"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {leaderboard.map((team) => (
                            <tr key={team.rank} className="bg-white dark:bg-gray-900 border-b dark:border-gray-800">
                              <td className="px-4 py-4 text-center">
                                <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center ${
                                  team.rank === 1 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' :
                                  team.rank === 2 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400' :
                                  team.rank === 3 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500' :
                                  'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                                }`}>
                                  {team.rank}
                                </div>
                              </td>
                              <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                                {team.name}
                              </td>
                              <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                                {team.members}
                              </td>
                              <td className="px-4 py-4 text-right font-semibold">
                                {team.points} pts
                              </td>
                              <td className="px-4 py-4 text-right">
                                <Button variant="link" className="p-0 h-auto">View Profile</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipChallenges;
