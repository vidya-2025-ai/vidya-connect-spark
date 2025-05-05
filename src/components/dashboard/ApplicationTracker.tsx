
import React, { useEffect, useState } from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { applicationService } from '@/services/api/applicationService';
import { Application } from '@/services/api/types';
import { Skeleton } from '@/components/ui/skeleton';

const ApplicationTracker = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getStudentApplications();
        setApplications(data.slice(0, 3)); // Only show the 3 most recent applications
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications');
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Accepted':
        return { icon: CheckCircle, color: 'bg-green-100 text-green-800' };
      case 'Rejected':
        return { icon: XCircle, color: 'bg-red-100 text-red-800' };
      case 'Under Review':
        return { icon: AlertCircle, color: 'bg-amber-100 text-amber-800' };
      case 'Pending':
      default:
        return { icon: Clock, color: 'bg-blue-100 text-blue-800' };
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="vs-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-5 w-36 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="mt-2">
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
          <a href="/student/applications" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
            View All
          </a>
        </div>
        <Card className="vs-card">
          <CardContent className="p-6 text-center">
            <p className="text-red-500">{error}</p>
            <p className="mt-2 text-gray-600">Please try again later</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
          <a href="/student/applications" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
            View All
          </a>
        </div>
        <Card className="vs-card">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">No applications found</p>
            <p className="mt-2 text-gray-500">Start applying for opportunities!</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
        <a href="/student/applications" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {applications.map((application) => {
          const { icon: StatusIcon, color: statusColor } = getStatusIcon(application.status);
          
          let opportunityTitle = 'Opportunity';
          let organizationName = '';
          
          if (typeof application.opportunity !== 'string') {
            opportunityTitle = application.opportunity.title || 'Opportunity';
            
            if (application.opportunity.organization) {
              if (typeof application.opportunity.organization === 'string') {
                organizationName = application.opportunity.organization;
              } else {
                organizationName = application.opportunity.organization.organization || 
                                  application.opportunity.organization.name || '';
              }
            }
          }

          return (
            <Card key={application.id || application._id} className="vs-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-medium text-gray-900">{opportunityTitle}</h3>
                    <p className="text-sm text-gray-600">{organizationName}</p>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`${statusColor} flex items-center gap-1`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {application.status}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <Calendar className="h-3.5 w-3.5 mr-1" />
                  Applied on {new Date(application.appliedDate).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ApplicationTracker;
