
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Star, Users, Pen } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Senior Product Manager",
    company: "Google",
    expertise: ["Product Strategy", "UX Research", "Go-to-Market"],
    rating: 4.9,
    reviews: 24,
    availability: "2-3 hours/week",
    image: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    name: "Rahul Khanna",
    role: "Engineering Lead",
    company: "Microsoft",
    expertise: ["Full Stack Development", "System Architecture", "Tech Leadership"],
    rating: 4.8,
    reviews: 19,
    availability: "1-2 hours/week",
    image: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    name: "Ananya Desai",
    role: "UI/UX Designer",
    company: "Figma",
    expertise: ["UI Design", "User Research", "Design Systems"],
    rating: 4.7,
    reviews: 31,
    availability: "2 hours/week",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 4,
    name: "Vikram Mehta",
    role: "Data Scientist",
    company: "Amazon",
    expertise: ["Machine Learning", "Data Analysis", "Python"],
    rating: 4.9,
    reviews: 17,
    availability: "3 hours/week",
    image: "https://randomuser.me/api/portraits/men/67.jpg"
  }
];

const upcomingSessions = [
  {
    id: 1,
    mentor: "Priya Sharma",
    topic: "Product Development Roadmap Discussion",
    date: "2025-05-03T14:00:00",
    duration: 45,
    status: "confirmed",
    mentorImage: "https://randomuser.me/api/portraits/women/65.jpg"
  },
  {
    id: 2,
    mentor: "Rahul Khanna",
    topic: "Code Review & Architecture Feedback",
    date: "2025-05-10T15:30:00",
    duration: 60,
    status: "pending",
    mentorImage: "https://randomuser.me/api/portraits/men/32.jpg"
  }
];

const pastSessions = [
  {
    id: 1,
    mentor: "Ananya Desai",
    topic: "Portfolio Review & Feedback",
    date: "2025-04-20T13:00:00",
    duration: 60,
    status: "completed",
    rating: 5,
    feedback: "Great session with actionable feedback on my design portfolio.",
    mentorImage: "https://randomuser.me/api/portraits/women/44.jpg"
  }
];

const Mentorship = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Mentorship Programs</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Connect with industry experts for personalized guidance on your career path
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button className="bg-blue-600 hover:bg-blue-700">Find a Mentor</Button>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:flex-1">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Personalized Mentorship Match</h2>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    Based on your skills, goals, and preferences, we've found the perfect mentors for you.
                  </p>
                  <div className="mt-4">
                    <Button>View Your Matches</Button>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-6 flex -space-x-2 overflow-hidden">
                  {mentors.slice(0, 4).map((mentor) => (
                    <Avatar key={mentor.id} className="inline-block border-2 border-white dark:border-gray-800 rounded-full h-10 w-10">
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                  ))}
                  <span className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-white dark:border-gray-800 text-xs font-medium h-10 w-10">
                    +12
                  </span>
                </div>
              </div>
            </div>

            <Tabs defaultValue="sessions" className="mt-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="sessions">Mentorship Sessions</TabsTrigger>
                <TabsTrigger value="mentors">Browse Mentors</TabsTrigger>
                <TabsTrigger value="groups">Mentorship Groups</TabsTrigger>
              </TabsList>

              <TabsContent value="sessions">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5" />
                        Upcoming Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {upcomingSessions.length > 0 ? (
                        <div className="space-y-4">
                          {upcomingSessions.map(session => (
                            <div key={session.id} className="flex p-4 border rounded-lg">
                              <Avatar className="h-12 w-12 mr-4">
                                <AvatarImage src={session.mentorImage} alt={session.mentor} />
                                <AvatarFallback>{session.mentor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">{session.topic}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">with {session.mentor}</p>
                                  </div>
                                  <Badge variant={session.status === 'confirmed' ? 'default' : 'outline'}>
                                    {session.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                                  </Badge>
                                </div>
                                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                                  <Calendar className="h-4 w-4 mr-1" />
                                  {new Date(session.date).toLocaleDateString()} at {new Date(session.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  <span className="mx-2">•</span>
                                  <span>{session.duration} minutes</span>
                                </div>
                                <div className="mt-3 flex space-x-2">
                                  <Button size="sm">Join Meeting</Button>
                                  <Button size="sm" variant="outline">Reschedule</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No upcoming sessions scheduled</p>
                          <Button variant="outline" className="mt-4">Schedule a Session</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Past Sessions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {pastSessions.length > 0 ? (
                        <div className="space-y-4">
                          {pastSessions.map(session => (
                            <div key={session.id} className="p-4 border rounded-lg">
                              <div className="flex items-start">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage src={session.mentorImage} alt={session.mentor} />
                                  <AvatarFallback>{session.mentor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <h4 className="font-medium">{session.topic}</h4>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">with {session.mentor}</p>
                                  <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {new Date(session.date).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`h-4 w-4 ${i < session.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                      fill={i < session.rating ? 'currentColor' : 'none'}
                                    />
                                  ))}
                                </div>
                              </div>
                              {session.feedback && (
                                <div className="mt-3 pl-13">
                                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                                    "{session.feedback}"
                                  </p>
                                </div>
                              )}
                              <div className="mt-3 flex space-x-2 justify-end">
                                <Button size="sm" variant="outline">View Notes</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500 dark:text-gray-400">No past sessions yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="mentors">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {mentors.map(mentor => (
                    <Card key={mentor.id} className="flex flex-col h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={mentor.image} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{mentor.name}</CardTitle>
                            <CardDescription>{mentor.role} at {mentor.company}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="flex items-center mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < Math.floor(mentor.rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                fill={i < Math.floor(mentor.rating) ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{mentor.rating} ({mentor.reviews} reviews)</span>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Expertise</p>
                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Availability:</span> {mentor.availability}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Request Mentorship</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="groups">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Product Management Circle</CardTitle>
                        <Badge>8 members</Badge>
                      </div>
                      <CardDescription>Weekly discussions on product management best practices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex -space-x-2 overflow-hidden my-3">
                        {[1, 2, 3, 4].map((id) => (
                          <Avatar key={id} className="inline-block border-2 border-white dark:border-gray-800 rounded-full h-8 w-8">
                            <AvatarFallback>U{id}</AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-white dark:border-gray-800 text-xs font-medium h-8 w-8">
                          +4
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                        <p className="font-medium">Next session:</p>
                        <p className="text-gray-600 dark:text-gray-400">May 5, 2025 at 4:00 PM</p>
                        <p className="text-gray-600 dark:text-gray-400">Topic: Go-to-Market Strategy</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">Frontend Developers Club</CardTitle>
                        <Badge>12 members</Badge>
                      </div>
                      <CardDescription>Code reviews and discussions on modern frontend technologies</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex -space-x-2 overflow-hidden my-3">
                        {[1, 2, 3, 4, 5].map((id) => (
                          <Avatar key={id} className="inline-block border-2 border-white dark:border-gray-800 rounded-full h-8 w-8">
                            <AvatarFallback>U{id}</AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-white dark:border-gray-800 text-xs font-medium h-8 w-8">
                          +7
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                        <p className="font-medium">Next session:</p>
                        <p className="text-gray-600 dark:text-gray-400">May 12, 2025 at 6:00 PM</p>
                        <p className="text-gray-600 dark:text-gray-400">Topic: React Server Components</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">UX Research Circle</CardTitle>
                        <Badge>6 members</Badge>
                      </div>
                      <CardDescription>Discussions on user research methodologies and findings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex -space-x-2 overflow-hidden my-3">
                        {[1, 2, 3].map((id) => (
                          <Avatar key={id} className="inline-block border-2 border-white dark:border-gray-800 rounded-full h-8 w-8">
                            <AvatarFallback>U{id}</AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-2 border-white dark:border-gray-800 text-xs font-medium h-8 w-8">
                          +3
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                        <p className="font-medium">Next session:</p>
                        <p className="text-gray-600 dark:text-gray-400">May 8, 2025 at 5:30 PM</p>
                        <p className="text-gray-600 dark:text-gray-400">Topic: Usability Testing Methods</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Group</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentorship;
