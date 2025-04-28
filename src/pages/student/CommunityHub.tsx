
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Clock, Users } from 'lucide-react';

const communityPosts = [
  {
    id: 1,
    author: "Neha Gupta",
    role: "Product Design Intern",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    content: "Just completed my first month at my UX design internship! Here are 5 key learnings that helped me make an impact from day one...",
    image: "https://images.unsplash.com/photo-1603401546565-e33d336f8e2a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzV8fGRlc2lnbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    tags: ["design", "internship", "uxdesign"]
  },
  {
    id: 2,
    author: "Arjun Sharma",
    role: "Software Developer Intern",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    content: "I've been struggling with imposter syndrome during my internship. Any advice on how to overcome this feeling and gain more confidence?",
    image: "",
    likes: 32,
    comments: 15,
    time: "8 hours ago",
    tags: ["mentalhealth", "impostersyndrome", "techinternship"]
  },
  {
    id: 3,
    author: "Priya Mehta",
    role: "Marketing Intern",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    content: "Just finished my internship at a major FMCG company. Here's my detailed experience and tips for anyone looking to break into marketing...",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmtldGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
    likes: 45,
    comments: 12,
    time: "1 day ago",
    tags: ["marketing", "internshipdiaries", "careeradvice"]
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Resume Review Workshop",
    date: "2025-05-05T16:00:00",
    attendees: 42,
    type: "Workshop",
    description: "Get personalized feedback on your resume from industry professionals."
  },
  {
    id: 2,
    title: "Interview Preparation AMA",
    date: "2025-05-08T18:00:00",
    attendees: 87,
    type: "AMA",
    description: "Ask Me Anything session with recruiters from top tech companies."
  },
  {
    id: 3,
    title: "Networking for Introverts",
    date: "2025-05-12T17:30:00",
    attendees: 35,
    type: "Workshop",
    description: "Learn effective networking strategies designed specifically for introverts."
  }
];

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिन्दी (Hindi)" },
  { value: "ta", label: "தமிழ் (Tamil)" },
  { value: "te", label: "తెలుగు (Telugu)" },
  { value: "mr", label: "मराठी (Marathi)" },
  { value: "bn", label: "বাংলা (Bengali)" },
];

const CommunityHub = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Community Hub</h1>
                  <select className="ml-3 bg-transparent border-none text-sm font-medium text-gray-500 dark:text-gray-400 focus:outline-none focus:ring-0">
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Connect with peers, share experiences, and learn together
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>Create Post</Button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Avatar>
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Input 
                          placeholder="Share your internship experience or ask a question..." 
                          className="bg-gray-100 dark:bg-gray-800 border-0"
                        />
                        <div className="flex justify-between mt-3">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              Photo
                            </Button>
                            <Button variant="outline" size="sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                              </svg>
                              Video
                            </Button>
                            <Button variant="outline" size="sm">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                              Link
                            </Button>
                          </div>
                          <Button>Post</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  {communityPosts.map(post => (
                    <Card key={post.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={post.avatar} alt={post.author} />
                              <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{post.author}</CardTitle>
                              <CardDescription>{post.role}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.time}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-700 dark:text-gray-300">
                          {post.content}
                        </p>
                        {post.image && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <img 
                              src={post.image} 
                              alt="Post attachment" 
                              className="w-full h-auto object-cover"
                            />
                          </div>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {post.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">#{tag}</Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-3">
                        <div className="flex justify-between w-full">
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button variant="ghost" size="sm">
                            Share
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Upcoming Community Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingEvents.map(event => (
                        <div key={event.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium">{event.title}</h3>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {event.description}
                          </p>
                          <div className="flex justify-between items-center mt-3 text-sm">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-gray-500 dark:text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">{event.attendees}</span>
                            </div>
                          </div>
                          <Button className="w-full mt-2" size="sm">RSVP</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Digital Badges</CardTitle>
                    <CardDescription>Earned through your contributions and achievements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">Profile Complete</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">First Skill Test</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">Mentor Contributor</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">Active Commenter</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">Resume Reviewer</span>
                      </div>
                      <div className="flex flex-col items-center opacity-40">
                        <div className="w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </div>
                        <span className="text-xs text-center">Community Leader</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Language Preference</CardTitle>
                    <CardDescription>Select your preferred language for content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {languageOptions.map(option => (
                        <div key={option.value} className="flex items-center">
                          <input
                            type="radio"
                            id={option.value}
                            name="language"
                            value={option.value}
                            defaultChecked={option.value === "en"}
                            className="h-4 w-4 text-blue-600"
                          />
                          <label htmlFor={option.value} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Apply Language Preference</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHub;
