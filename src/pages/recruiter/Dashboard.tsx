
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Calendar, User, Clock, Plus, ArrowRight, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import dashboardService from '@/services/api/dashboardService';
import opportunityService from '@/services/api/opportunityService';
import { useNavigate } from 'react-router-dom';

// Colors for charts
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const RecruiterDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Fetch dashboard data
  const { data: dashboardData, isLoading: isDashboardLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: dashboardService.getRecruiterDashboard,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load dashboard data. Please refresh the page.",
            variant: "destructive"
          });
        }
      }
    }
  });
  
  // Fetch recent applications
  const { data: recentApplications, isLoading: isApplicationsLoading } = useQuery({
    queryKey: ['recentApplications'],
    queryFn: () => opportunityService.getRecentApplications(5),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load recent applications.",
            variant: "destructive"
          });
        }
      }
    }
  });
  
  // Mock data for charts
  const applicationStats = [
    { name: 'Jan', applications: 65 },
    { name: 'Feb', applications: 80 },
    { name: 'Mar', applications: 90 },
    { name: 'Apr', applications: 75 },
    { name: 'May', applications: 100 },
    { name: 'Jun', applications: 85 }
  ];
  
  const positionData = [
    { name: 'Software Dev', value: 35 },
    { name: 'Data Science', value: 25 },
    { name: 'Design', value: 15 },
    { name: 'Marketing', value: 10 },
    { name: 'Operations', value: 15 }
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Recruiter Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Overview of your recruitment activities and metrics
                </p>
              </div>
              <div className="mt-4 sm:mt-0">
                <Button className="flex items-center gap-2" onClick={() => navigate('/recruiter/post-internship')}>
                  <Plus className="h-4 w-4" />
                  Post New Job
                </Button>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Active Jobs
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isDashboardLoading ? '...' : dashboardData?.activeJobs || 0}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center dark:bg-blue-900">
                      <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Applications
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isDashboardLoading ? '...' : dashboardData?.totalApplications || 0}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center dark:bg-green-900">
                      <User className="h-6 w-6 text-green-600 dark:text-green-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Interviews Scheduled
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isDashboardLoading ? '...' : dashboardData?.interviewsScheduled || 0}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center dark:bg-purple-900">
                      <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Average Time to Hire
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {isDashboardLoading ? '...' : '14 days'}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center dark:bg-yellow-900">
                      <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Charts & Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Applications Over Time */}
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Applications Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={applicationStats}
                        margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="applications" 
                          stroke="#8884d8" 
                          activeDot={{ r: 8 }} 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              {/* Position Distribution */}
              <Card>
                <CardHeader className="pb-0">
                  <CardTitle>Position Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={positionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {positionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Recent Applications */}
            <div className="mb-8">
              <Card>
                <CardHeader className="pb-0">
                  <div className="flex justify-between items-center">
                    <CardTitle>Recent Applications</CardTitle>
                    <Button 
                      variant="ghost" 
                      className="flex items-center text-sm"
                      onClick={() => navigate('/recruiter/applications')}
                    >
                      View All
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isApplicationsLoading ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">Loading recent applications...</p>
                  ) : !recentApplications || recentApplications.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">No recent applications found</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Candidate
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Position
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                          {recentApplications?.map((app) => (
                            <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300">
                                    {app.applicantName ? app.applicantName.charAt(0).toUpperCase() : 'A'}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                      {app.applicantName || 'Anonymous Candidate'}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                      {app.applicantEmail || 'No email provided'}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900 dark:text-white">{app.positionTitle || 'Unknown Position'}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500 dark:text-gray-400">{formatDate(app.date || new Date().toString())}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                  ${app.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                                    app.status === 'Under Review' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                    app.status === 'Interview' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                                    app.status === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                    'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                  }`}>
                                  {app.status || 'Pending'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
