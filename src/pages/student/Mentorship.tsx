import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";
import { mentorshipService } from '@/services/api/mentorshipService';
import { MentorshipRequest } from '@/services/api/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const Mentorship = () => {
  const [mentorships, setMentorships] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [requestText, setRequestText] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedMentor, setSelectedMentor] = useState('');

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        setIsLoading(true);
        const data = await mentorshipService.getMyMentorships();
        setMentorships(data);
      } catch (error) {
        console.error('Error fetching mentorships:', error);
        toast({
          title: "Error",
          description: "Failed to load mentorship data. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  const handleSubmitRequest = async () => {
    if (!selectedMentor || !topic || !requestText) {
      toast({
        title: "Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const newMentorship = await mentorshipService.createMentorshipRequest({
        mentor: selectedMentor,
        topic,
        message: requestText
      });
      
      setMentorships(prev => [...prev, newMentorship]);
      setDialogOpen(false);
      setRequestText('');
      setTopic('');
      setSelectedMentor('');
      
      toast({
        title: "Success",
        description: "Mentorship request has been sent.",
      });
    } catch (error) {
      console.error('Error sending mentorship request:', error);
      toast({
        title: "Error",
        description: "Failed to send mentorship request. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-6">Mentorship</h1>
              <Tabs defaultValue="requests" className="mb-6">
                <TabsList>
                  <TabsTrigger value="requests">My Requests</TabsTrigger>
                  <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
                </TabsList>
                <TabsContent value="requests" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 mb-4">
                            <Skeleton className="h-10 w-10 rounded-full" />
                            <div>
                              <Skeleton className="h-4 w-24 mb-1" />
                              <Skeleton className="h-3 w-20" />
                            </div>
                          </div>
                          <Skeleton className="h-4 w-full mb-3" />
                          <Skeleton className="h-4 w-5/6 mb-3" />
                          <Skeleton className="h-8 w-24 mt-4" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="mentors" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-64 w-full rounded-lg" />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">Mentorship</h1>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Request Mentorship</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Mentorship</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Topic
                      </label>
                      <Input 
                        placeholder="e.g., Career Advice, Technical Skills" 
                        value={topic} 
                        onChange={(e) => setTopic(e.target.value)} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea 
                        placeholder="Describe what you're looking for help with" 
                        value={requestText} 
                        onChange={(e) => setRequestText(e.target.value)}
                        className="min-h-[100px]" 
                      />
                    </div>
                    <Button 
                      className="w-full" 
                      onClick={handleSubmitRequest}
                    >
                      Send Request
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <Tabs defaultValue="requests" className="mb-6">
              <TabsList>
                <TabsTrigger value="requests">My Requests</TabsTrigger>
                <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
              </TabsList>
              <TabsContent value="requests" className="mt-4">
                {mentorships.length === 0 ? (
                  <Card>
                    <CardContent className="pt-6 text-center">
                      <div className="flex justify-center mb-4">
                        <Users className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No mentorship requests yet</h3>
                      <p className="text-gray-500 mb-4">Request mentorship to get guidance from industry experts</p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>Request Mentorship</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Request Mentorship</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Topic
                              </label>
                              <Input 
                                placeholder="e.g., Career Advice, Technical Skills" 
                                value={topic} 
                                onChange={(e) => setTopic(e.target.value)} 
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Message
                              </label>
                              <Textarea 
                                placeholder="Describe what you're looking for help with" 
                                value={requestText} 
                                onChange={(e) => setRequestText(e.target.value)}
                                className="min-h-[100px]" 
                              />
                            </div>
                            <Button 
                              className="w-full" 
                              onClick={handleSubmitRequest}
                            >
                              Send Request
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mentorships.map((mentorship) => (
                      <Card key={mentorship._id}>
                        <CardHeader>
                          <CardTitle>{mentorship.topic}</CardTitle>
                          <CardDescription>{new Date(mentorship.createdAt).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-4 mb-4">
                            <Avatar>
                              <AvatarFallback>{typeof mentorship.mentor === 'string' ? 'M' : 
                                `${mentorship.mentor.firstName?.charAt(0)}${mentorship.mentor.lastName?.charAt(0)}`}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {typeof mentorship.mentor === 'string' ? 'Mentor' : 
                                  `${mentorship.mentor.firstName} ${mentorship.mentor.lastName}`}
                              </p>
                              <p className="text-sm text-gray-500">
                                {typeof mentorship.mentor === 'string' ? '' : mentorship.mentor.jobTitle}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            {mentorship.message}
                          </p>
                          <Badge className={
                            mentorship.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            mentorship.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-amber-100 text-amber-800'
                          }>
                            {mentorship.status.charAt(0).toUpperCase() + mentorship.status.slice(1)}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="mentors" className="mt-4">
                <div className="mb-4">
                  <Input placeholder="Search mentors by name, skills, or industry" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Sample mentors - this would be fetched from the API in a real application */}
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center mb-4">
                          <Avatar className="h-20 w-20 mb-3">
                            <AvatarFallback>M{i}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-semibold text-lg">Mentor {i}</h3>
                          <p className="text-gray-500">Senior Developer</p>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-center text-gray-600">
                            Experienced in web development, UI/UX design, and cloud architecture
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                          <Badge variant="outline">React</Badge>
                          <Badge variant="outline">Node.js</Badge>
                          <Badge variant="outline">AWS</Badge>
                        </div>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => {
                            setDialogOpen(true);
                            setSelectedMentor(`mentor-${i}`);
                          }}
                        >
                          Request Mentorship
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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
