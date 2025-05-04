
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users, Calendar, Clock } from "lucide-react";
import { mentorshipService } from '@/services/api/mentorshipService';
import { MentorshipRequest } from '@/services/api/types';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';

const MentorshipPage = () => {
  const [mentorships, setMentorships] = useState<MentorshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
          description: "Failed to load mentorship requests. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentorships();
  }, []);

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'accepted':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'rejected':
        return "bg-red-100 text-red-800 hover:bg-red-200";
      case 'pending':
      default:
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
    }
  };

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Mentorship</h1>
                  <p className="mt-1 text-sm text-gray-600">
                    Connect with industry professionals as mentors
                  </p>
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-5 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                      <div className="mt-4">
                        <Skeleton className="h-20 w-full" />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Skeleton className="h-9 w-full" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
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
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Mentorship</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Connect with industry professionals as mentors
                </p>
              </div>
              <Button>Request Mentorship</Button>
            </div>
            
            {mentorships.length === 0 ? (
              <Card className="p-6 text-center">
                <div className="flex flex-col items-center">
                  <users className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No mentorship requests yet</h3>
                  <p className="text-gray-500 mb-4">
                    Connect with industry professionals to help guide your career journey
                  </p>
                  <Button>Find Mentors</Button>
                </div>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mentorships.map((mentorship) => {
                  const mentorName = typeof mentorship.mentor === 'string' 
                    ? 'Unknown Mentor'
                    : `${mentorship.mentor.firstName} ${mentorship.mentor.lastName}`;
                  
                  const mentorJob = typeof mentorship.mentor === 'string'
                    ? ''
                    : mentorship.mentor.jobTitle;
                  
                  const mentorOrg = typeof mentorship.mentor === 'string'
                    ? ''
                    : mentorship.mentor.organization;
                  
                  const mentorInitials = typeof mentorship.mentor === 'string'
                    ? 'UN'
                    : `${mentorship.mentor.firstName?.[0] || ''}${mentorship.mentor.lastName?.[0] || ''}`;
                  
                  const mentorAvatar = typeof mentorship.mentor === 'string'
                    ? undefined
                    : mentorship.mentor.avatar;

                  return (
                    <Card key={mentorship._id} className="shadow-sm">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              {mentorAvatar && <AvatarImage src={mentorAvatar} />}
                              <AvatarFallback>{mentorInitials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{mentorName}</h3>
                              <p className="text-xs text-gray-500">
                                {mentorJob}{mentorJob && mentorOrg ? ', ' : ''}{mentorOrg}
                              </p>
                            </div>
                          </div>
                          <Badge className={getStatusBadgeClass(mentorship.status)}>
                            {mentorship.status.charAt(0).toUpperCase() + mentorship.status.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-500 mb-3 flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          Requested on {formatDate(mentorship.createdAt.toString())}
                        </div>
                        <div className="border-t border-gray-100 pt-3">
                          <h4 className="text-sm font-medium mb-1">Message</h4>
                          <p className="text-sm text-gray-600">{mentorship.message}</p>
                        </div>
                      </CardContent>
                      <CardFooter>
                        {mentorship.status === 'accepted' && (
                          <Button className="w-full">Schedule Meeting</Button>
                        )}
                        {mentorship.status === 'rejected' && (
                          <Button variant="outline" className="w-full">Find Other Mentors</Button>
                        )}
                        {mentorship.status === 'pending' && (
                          <Button variant="outline" className="w-full" disabled>Awaiting Response</Button>
                        )}
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorshipPage;
