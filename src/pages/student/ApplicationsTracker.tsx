
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FileText, Activity, CheckCircle, Clock, XCircle, Filter } from 'lucide-react';
import { applicationService } from '@/services/api/applicationService';
import { Application } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ApplicationsTracker = () => {
  const [activeTab, setActiveTab] = useState("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const data = await applicationService.getStudentApplications();
        setApplications(data);
        
        // Process application data to generate activity records
        const activityRecords = data.flatMap(app => {
          // Create initial application activity
          const initialActivity = {
            id: `${app._id}-submit`,
            type: "Application Submitted",
            opportunity: typeof app.opportunity === 'string' ? 'Opportunity' : app.opportunity.title,
            date: new Date(app.appliedDate).toISOString(),
          };
          
          // Add status update activities if available
          const statusActivities = app.activities ? 
            app.activities.map((activity, idx) => ({
              id: `${app._id}-${idx}`,
              type: activity.type,
              opportunity: typeof app.opportunity === 'string' ? 'Opportunity' : app.opportunity.title,
              date: new Date(activity.date).toISOString(),
            })) : [];
          
          return [initialActivity, ...statusActivities];
        });
        
        // Sort activities by date (most recent first) and limit to a reasonable number
        const sortedActivities = activityRecords
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 10);
        
        setActivities(sortedActivities);
        
        // Generate activity chart data
        const monthsData = generateActivityChartData(data);
        setActivityData(monthsData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to load applications data');
        toast({
          title: "Error",
          description: "Failed to load your application history. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, [toast]);
  
  const generateActivityChartData = (applications: Application[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Initialize data for the last 6 months
    const chartData = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentDate.getMonth() - i + 12) % 12;
      chartData.push({
        month: months[monthIndex],
        applications: 0,
        interviews: 0
      });
    }
    
    // Count applications by month
    applications.forEach(app => {
      const appDate = new Date(app.appliedDate);
      // Only include applications from current year and last 6 months
      if (appDate.getFullYear() === currentYear) {
        const monthName = months[appDate.getMonth()];
        const monthEntry = chartData.find(m => m.month === monthName);
        
        if (monthEntry) {
          monthEntry.applications += 1;
          
          // Count interviews (assuming activities track interviews)
          const hasInterview = app.activities?.some(activity => 
            activity.type.toLowerCase().includes('interview')
          );
          
          if (hasInterview) {
            monthEntry.interviews += 1;
          }
        }
      }
    });
    
    return chartData;
  };

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
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Applications & Activity Tracker</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Track and manage your applications and activities
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> Filter
                </Button>
                <Link to="/student/explore-opportunities">
                  <Button>Find Opportunities</Button>
                </Link>
              </div>
            </div>

            <Tabs defaultValue="applications" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
                <TabsTrigger value="applications" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" /> Applications
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" /> Activity
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="applications" className="space-y-4">
                {isLoading ? (
                  <>
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
                  </>
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
                  <>
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
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="activity" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Activity Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      {isLoading ? (
                        <div className="h-full w-full flex items-center justify-center">
                          <Skeleton className="h-full w-full" />
                        </div>
                      ) : error ? (
                        <div className="h-full w-full flex items-center justify-center text-red-500">
                          Failed to load chart data
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={activityData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line 
                              type="monotone" 
                              dataKey="applications" 
                              stroke="#8884d8" 
                              name="Applications"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="interviews" 
                              stroke="#82ca9d" 
                              name="Interviews"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="p-4 rounded-lg border dark:border-gray-700">
                            <div className="flex justify-between items-center">
                              <div>
                                <Skeleton className="h-5 w-36 mb-2" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                              <Skeleton className="h-4 w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : error ? (
                      <div className="text-center p-4">
                        <p className="text-red-500">Failed to load activity data</p>
                      </div>
                    ) : activities.length === 0 ? (
                      <div className="text-center p-4">
                        <p className="text-gray-600">No recent activities found</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {activities.map((activity) => (
                          <div 
                            key={activity.id}
                            className="flex justify-between items-center p-4 rounded-lg bg-white dark:bg-gray-800 border dark:border-gray-700"
                          >
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{activity.type}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{activity.opportunity}</p>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(activity.date).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
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

export default ApplicationsTracker;
