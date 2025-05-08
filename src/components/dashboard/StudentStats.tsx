
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BriefcaseIcon, CalendarIcon, FileCheckIcon, BookOpenIcon } from 'lucide-react';
import dashboardService from '@/services/api/dashboardService';

const StudentStats: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['studentDashboardStats'],
    queryFn: dashboardService.getStudentDashboard,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications Sent</CardTitle>
          <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "Loading..." : stats?.applicationsSent || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {((stats?.applicationsSent || 0) > 0) ? "Track your applications progress" : "Start applying to opportunities"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "Loading..." : stats?.interviewsScheduled || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {((stats?.interviewsScheduled || 0) > 0) ? "Prepare for your interviews" : "No upcoming interviews"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saved Opportunities</CardTitle>
          <FileCheckIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "Loading..." : stats?.savedOpportunities || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {((stats?.savedOpportunities || 0) > 0) ? "Review your saved opportunities" : "Save opportunities for later"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Internships</CardTitle>
          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {isLoading ? "Loading..." : stats?.completedInternships || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {((stats?.completedInternships || 0) > 0) ? "View your experience history" : "Complete internships to build your resume"}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentStats;
