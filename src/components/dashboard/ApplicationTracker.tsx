
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileTextIcon } from 'lucide-react';
import { Application } from '@/services/api/types';
import applicationService from '@/services/api/applicationService';

const ApplicationTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const { data: applications, isLoading } = useQuery({
    queryKey: ['studentApplications', activeTab],
    queryFn: () => applicationService.getStudentApplications({ 
      status: activeTab !== 'all' ? activeTab : undefined 
    }),
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'accepted':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'under review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'interview':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'shortlisted':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Application Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="under review">Under Review</TabsTrigger>
            <TabsTrigger value="interview">Interview</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                Loading applications...
              </div>
            ) : !applications || applications.length === 0 ? (
              <div className="py-6 text-center text-gray-500 dark:text-gray-400">
                No applications found. Start applying for opportunities!
              </div>
            ) : (
              <div className="space-y-3">
                {applications.slice(0, 5).map((application: Application) => (
                  <div key={application._id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">
                          {typeof application.opportunity !== 'string' ? application.opportunity?.title : 'Unknown Opportunity'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {typeof application.opportunity !== 'string' ? application.opportunity?.organization : 'Unknown Organization'}
                        </p>
                      </div>
                      <Badge className={getStatusColor(application.status)}>
                        {application.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center">
                        <FileTextIcon className="h-3.5 w-3.5 mr-1" />
                        <span>Applied: {formatDate(application.appliedDate.toString())}</span>
                      </div>
                      
                      {application.interviewDate && (
                        <div className="flex items-center">
                          <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                          <span>Interview: {formatDate(application.interviewDate.toString())}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Application Progress */}
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">Application Progress</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {application.status === 'Pending' ? '25%' : 
                           application.status === 'Under Review' ? '50%' : 
                           application.status === 'Interview' ? '75%' : '100%'}
                        </span>
                      </div>
                      <Progress 
                        value={
                          application.status === 'Pending' ? 25 : 
                          application.status === 'Under Review' ? 50 : 
                          application.status === 'Interview' ? 75 : 100
                        } 
                        className="h-1" 
                      />
                    </div>
                  </div>
                ))}
                
                {applications.length > 5 && (
                  <div className="text-center text-xs text-gray-500 dark:text-gray-400">
                    +{applications.length - 5} more application(s)
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationTracker;
