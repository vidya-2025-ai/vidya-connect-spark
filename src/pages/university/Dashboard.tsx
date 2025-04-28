
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/settings/ThemeToggle';
import { Search, GraduationCap, Users, BookOpen, Calendar, FileText, Settings, Bell, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

const UniversityDashboard = () => {
  const stats = [
    { title: 'Total Students', value: '1,248', change: '+74', status: 'increase', icon: Users },
    { title: 'Active Internships', value: '427', change: '+32', status: 'increase', icon: BookOpen },
    { title: 'Partner Companies', value: '85', change: '+3', status: 'increase', icon: FileText },
    { title: 'Avg. Placement Rate', value: '94%', change: '+2%', status: 'increase', icon: GraduationCap },
  ];
  
  const departments = [
    { id: 1, name: 'Computer Science', students: 320, placements: 285, ratio: '89%' },
    { id: 2, name: 'Electrical Engineering', students: 275, placements: 251, ratio: '91%' },
    { id: 3, name: 'Mechanical Engineering', students: 210, placements: 196, ratio: '93%' },
    { id: 4, name: 'Civil Engineering', students: 183, placements: 164, ratio: '90%' },
    { id: 5, name: 'Business Administration', students: 260, placements: 249, ratio: '96%' },
  ];
  
  const recentActivities = [
    { 
      id: 1, 
      type: 'placement', 
      student: 'Anika Sharma',
      department: 'Computer Science',
      company: 'Google',
      role: 'Software Engineering Intern',
      date: '2025-04-26',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg'
    },
    { 
      id: 2, 
      type: 'certification', 
      student: 'Vikram Singh',
      department: 'Mechanical Engineering',
      certification: 'Advanced CAD Design',
      date: '2025-04-25',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    { 
      id: 3, 
      type: 'placement', 
      student: 'Priya Patel',
      department: 'Business Administration',
      company: 'Amazon',
      role: 'Business Analyst Intern',
      date: '2025-04-24',
      avatar: 'https://randomuser.me/api/portraits/women/56.jpg'
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col h-screen w-64 border-r bg-white dark:bg-gray-900 dark:border-gray-800">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">InternMatch</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">University Portal</p>
        </div>
        
        <div className="flex-1 overflow-auto py-2">
          <nav className="space-y-1 px-3">
            {[
              { label: 'Dashboard', icon: Home, href: '/university/dashboard', active: true },
              { label: 'Students', icon: Users, href: '/university/students' },
              { label: 'Companies', icon: FileText, href: '/university/companies' },
              { label: 'Internships', icon: BookOpen, href: '/university/internships' },
              { label: 'Placements', icon: GraduationCap, href: '/university/placements' },
              { label: 'Events', icon: Calendar, href: '/university/events' },
              { label: 'Settings', icon: Settings, href: '/university/settings' },
            ].map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md group transition-colors ${
                  item.active 
                    ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-blue-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t dark:border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                RU
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-700 dark:text-gray-300">Rajiv University</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-gray-900 shadow dark:border-b dark:border-gray-800">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-vs-green-500 focus:border-vs-green-500 sm:text-sm"
                    placeholder="Search students, companies..."
                    type="search"
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-vs-green-500"
              >
                <span className="sr-only">View notifications</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-3 relative">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://randomuser.me/api/portraits/men/22.jpg" alt="Admin" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:flex md:items-center">
                    <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900">
                      Ajay Sharma
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">University Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Overview of student internships, placements, and industry partnerships
                </p>
              </div>
              <div className="mt-4 flex space-x-3 md:mt-0">
                <Button variant="outline">Generate Report</Button>
                <Button>Export Data</Button>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <stat.icon className="h-6 w-6" />
                      </div>
                      <Badge variant={stat.status === 'increase' ? 'default' : 'destructive'} className="ml-2">
                        {stat.change}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-3">{stat.title}</h3>
                    <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Department wise placement stats */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Department-wise Placement Statistics</CardTitle>
                  <CardDescription>Current academic year placement performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departments.map(dept => (
                      <div key={dept.id}>
                        <div className="flex justify-between items-center mb-1">
                          <div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{dept.name}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">({dept.students} students)</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{dept.ratio}</span>
                        </div>
                        <div className="flex items-center">
                          <Progress 
                            value={parseFloat(dept.ratio)} 
                            className="h-2 flex-grow mr-2" 
                          />
                          <span className="text-xs text-gray-500 dark:text-gray-400">{dept.placements}/{dept.students}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Detailed Reports</Button>
                </CardFooter>
              </Card>

              {/* Recent activities */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    {recentActivities.map(activity => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarImage src={activity.avatar} alt={activity.student} />
                          <AvatarFallback>{activity.student.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {activity.student} ({activity.department})
                          </p>
                          {activity.type === 'placement' ? (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Secured internship at <span className="font-medium">{activity.company}</span> as {activity.role}
                            </p>
                          ) : (
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Completed <span className="font-medium">{activity.certification}</span> certification
                            </p>
                          )}
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            {new Date(activity.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Activities</Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-6">
              <Tabs defaultValue="active">
                <TabsList className="grid grid-cols-3 w-full md:w-auto">
                  <TabsTrigger value="active">Active Programs</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Industry Partnerships</CardTitle>
                      <CardDescription>Active collaborations with industry partners</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { name: 'Microsoft', program: 'Technical Internship Program', students: 24, logo: 'https://logo.clearbit.com/microsoft.com' },
                          { name: 'TCS', program: 'Campus Recruitment Drive', students: 36, logo: 'https://logo.clearbit.com/tcs.com' },
                          { name: 'Infosys', program: 'InfyTQ Certification Program', students: 42, logo: 'https://logo.clearbit.com/infosys.com' },
                          { name: 'Flipkart', program: 'Summer Internship', students: 18, logo: 'https://logo.clearbit.com/flipkart.com' },
                          { name: 'Accenture', program: 'Technology Consulting Program', students: 29, logo: 'https://logo.clearbit.com/accenture.com' },
                          { name: 'Wipro', program: 'Elite Graduate Hire', students: 31, logo: 'https://logo.clearbit.com/wipro.com' },
                        ].map((partner, idx) => (
                          <Card key={idx} className="bg-white dark:bg-gray-800">
                            <CardContent className="p-4 flex items-center space-x-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={partner.logo} alt={partner.name} />
                                <AvatarFallback>{partner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium text-gray-900 dark:text-white">{partner.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{partner.program}</p>
                                <Badge className="mt-1">{partner.students} students</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="mr-2">Manage Partnerships</Button>
                      <Button>Add New Partner</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="upcoming" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events & Workshops</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { title: 'Campus Recruitment Drive', company: 'Amazon', date: '2025-05-10', type: 'Recruitment', attendees: 120 },
                          { title: 'Technical Workshop on Cloud Computing', company: 'Microsoft Azure', date: '2025-05-15', type: 'Workshop', attendees: 85 },
                          { title: 'Resume Building Workshop', company: 'Internal', date: '2025-05-18', type: 'Workshop', attendees: 150 },
                          { title: 'Mock Interview Sessions', company: 'HR Experts Panel', date: '2025-05-20', type: 'Training', attendees: 60 },
                        ].map((event, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-800 border rounded-lg">
                            <div>
                              <h3 className="font-medium text-gray-900 dark:text-white">{event.title}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">By {event.company}</p>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(event.date).toLocaleDateString()}</span>
                                <span className="mx-2">•</span>
                                <Users className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400 mr-1" />
                                <span className="text-xs text-gray-500 dark:text-gray-400">{event.attendees} registered</span>
                              </div>
                            </div>
                            <Badge variant="outline">{event.type}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Schedule Event</Button>
                      <Button>View Calendar</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="analytics" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>Internship and placement metrics over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                      <div className="text-center">
                        <GraduationCap className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto" />
                        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Analytics Dashboard</h3>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-md">
                          Detailed charts and metrics showing placement trends, salary distributions, and company-wise internship statistics.
                        </p>
                        <Button className="mt-4">View Analytics</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityDashboard;
