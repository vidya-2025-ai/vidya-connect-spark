
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShieldCheck } from 'lucide-react';

const grievances = [
  {
    id: 1,
    title: "Unpaid overtime hours during internship",
    company: "TechSolutions Inc.",
    dateSubmitted: "2025-04-10",
    status: "In Progress",
    lastUpdated: "2025-04-20",
    priority: "High",
    category: "Payment Issues"
  },
  {
    id: 2,
    title: "Mentor unresponsive to messages",
    company: "Global Finance Group",
    dateSubmitted: "2025-04-15",
    status: "Resolved",
    lastUpdated: "2025-04-22",
    priority: "Medium",
    category: "Mentorship"
  },
  {
    id: 3,
    title: "Work assigned beyond agreed scope",
    company: "DigitalEdge Corp.",
    dateSubmitted: "2025-04-18",
    status: "Under Review",
    lastUpdated: "2025-04-25",
    priority: "High",
    category: "Work Conditions"
  }
];

const resolvedGrievances = [
  {
    id: 4,
    title: "Inadequate training provided",
    company: "InnoTech Solutions",
    dateSubmitted: "2025-03-25",
    dateResolved: "2025-04-15",
    resolution: "Company has developed a structured onboarding program for all new interns and provided additional training sessions.",
    rating: 4,
    category: "Training & Development"
  }
];

const GrievanceSystem = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <ShieldCheck className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                  <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Grievance Redressal System</h1>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Report and track issues with your internship for fair resolution
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Button>File New Grievance</Button>
              </div>
            </div>

            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Rights as an Intern</h2>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Protected
                </Badge>
              </div>
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300">
                <p>
                  As an intern, you are entitled to fair treatment, a safe working environment, and adherence to the terms 
                  outlined in your internship agreement. Our grievance system ensures that any issues are addressed promptly.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Fair compensation per agreement</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Safe working conditions</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Access to promised resources</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Mentorship & guidance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Protection from harassment</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-blue-600 dark:text-blue-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="ml-2 text-sm">Reasonable working hours</p>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Learn more about the grievance redressal process
                </p>
                <Button variant="link" className="p-0 h-auto">View Policy Document</Button>
              </div>
            </div>

            <Tabs defaultValue="active" className="mt-8">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="active">Active Grievances</TabsTrigger>
                <TabsTrigger value="resolved">Resolved Issues</TabsTrigger>
                <TabsTrigger value="file">File a Grievance</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-6">
                {grievances.length > 0 ? (
                  <div className="space-y-4">
                    {grievances.map(grievance => (
                      <Card key={grievance.id}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{grievance.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <span>Against: {grievance.company}</span>
                                <span className="mx-2">•</span>
                                <span>Submitted: {new Date(grievance.dateSubmitted).toLocaleDateString()}</span>
                              </CardDescription>
                            </div>
                            <Badge 
                              className={
                                grievance.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                grievance.status === 'Resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300'
                              }
                            >
                              {grievance.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Category</p>
                                <p className="text-sm">{grievance.category}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</p>
                                <p className={`text-sm ${
                                  grievance.priority === 'High' ? 'text-red-600 dark:text-red-400' :
                                  grievance.priority === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' :
                                  'text-green-600 dark:text-green-400'
                                }`}>
                                  {grievance.priority}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                              <p className="text-sm">{new Date(grievance.lastUpdated).toLocaleDateString()}</p>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button size="sm">Add Comment</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="flex justify-center">
                      <ShieldCheck className="h-12 w-12 text-gray-300 dark:text-gray-600" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No Active Grievances</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      You don't have any active grievance cases at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resolved" className="space-y-6">
                {resolvedGrievances.length > 0 ? (
                  <div className="space-y-4">
                    {resolvedGrievances.map(grievance => (
                      <Card key={grievance.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{grievance.title}</CardTitle>
                              <CardDescription className="flex items-center mt-1">
                                <span>Against: {grievance.company}</span>
                                <span className="mx-2">•</span>
                                <span>Category: {grievance.category}</span>
                              </CardDescription>
                            </div>
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                              Resolved
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Submitted</p>
                                <p className="text-sm">{new Date(grievance.dateSubmitted).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                                <p className="text-sm">{new Date(grievance.dateResolved).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolution</p>
                              <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{grievance.resolution}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Your Rating</p>
                              <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`h-5 w-5 ${i < grievance.rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'}`}
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Full Case Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">You don't have any resolved grievances yet.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="file">
                <Card>
                  <CardHeader>
                    <CardTitle>File a New Grievance</CardTitle>
                    <CardDescription>
                      Provide details about your concern for prompt resolution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name *</Label>
                        <Input id="company" placeholder="Enter the company name" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">Grievance Title *</Label>
                        <Input id="title" placeholder="Provide a brief title for your grievance" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="category">Category *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="payment">Payment Issues</SelectItem>
                              <SelectItem value="workload">Workload & Hours</SelectItem>
                              <SelectItem value="mentorship">Mentorship</SelectItem>
                              <SelectItem value="training">Training & Development</SelectItem>
                              <SelectItem value="harassment">Harassment & Discrimination</SelectItem>
                              <SelectItem value="resources">Access to Resources</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority *</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Detailed Description *</Label>
                        <Textarea 
                          id="description" 
                          placeholder="Provide a detailed description of the issue..."
                          rows={5} 
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="evidence">Evidence (Optional)</Label>
                        <Input id="evidence" type="file" className="cursor-pointer" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Upload any supporting documents, screenshots, or evidence (max 5MB)
                        </p>
                      </div>

                      <div className="flex items-start">
                        <input
                          id="confidential"
                          type="checkbox"
                          className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="confidential" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                          Keep my identity confidential from the company
                        </label>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Save as Draft</Button>
                    <Button>Submit Grievance</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceSystem;
