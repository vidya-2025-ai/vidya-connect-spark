
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { applicationService } from '@/services/api/applicationService';
import { Application } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getStudentApplications();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
        toast({
          title: "Error",
          description: "Failed to load your applications. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'Under Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'Pending':
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-500';
      case 'Rejected':
        return 'bg-red-500';
      case 'Under Review':
        return 'bg-amber-500';
      case 'Pending':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Applications</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Track and manage your applications
                </p>
              </div>
              <Link to="/student/explore-opportunities">
                <Button>Find Opportunities</Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="border border-gray-200 dark:border-gray-700">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div>
                        <Skeleton className="h-6 w-40 mb-2" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="text-center p-8">
                <p className="text-red-500 mb-2">{error}</p>
                <p className="text-gray-600">Please try again later</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </Card>
            ) : applications.length === 0 ? (
              <Card className="text-center p-8">
                <p className="text-lg font-semibold mb-2">No applications found</p>
                <p className="text-gray-600 mb-4">You haven't applied to any opportunities yet.</p>
                <Link to="/student/explore-opportunities">
                  <Button>Browse Opportunities</Button>
                </Link>
              </Card>
            ) : (
              <div className="space-y-4">
                {applications.map((application) => {
                  const opportunityTitle = typeof application.opportunity === 'string' 
                    ? 'Opportunity' 
                    : application.opportunity.title;
                  
                  const organizationName = typeof application.opportunity === 'string'
                    ? ''
                    : application.opportunity.organization?.organization || '';
                    
                  const statusColor = getStatusColor(application.status);
                  const borderColor = getStatusBorder(application.status);

                  return (
                    <Card key={application._id} className="hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700">
                      <div className={`w-1 absolute left-0 top-0 bottom-0 ${borderColor}`}></div>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{opportunityTitle}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{organizationName}</p>
                        </div>
                        <Badge className={statusColor}>
                          {application.status}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Applied on: {new Date(application.appliedDate).toLocaleDateString()}
                          </p>
                          <Link to={`/student/applications/${application._id}`}>
                            <Button variant="outline" size="sm">View Details</Button>
                          </Link>
                        </div>
                      </CardContent>
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

export default Applications;
