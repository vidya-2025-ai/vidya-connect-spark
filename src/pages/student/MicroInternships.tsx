
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Clock, Calendar, User } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useToast } from '@/hooks/use-toast';
import microInternshipService from '@/services/api/microInternshipService';

const MicroInternships: React.FC = () => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('available');
  
  const { data: microInternships, isLoading, isError } = useQuery({
    queryKey: ['microInternships', activeTab],
    queryFn: () => microInternshipService.getMicroInternships({ status: activeTab }),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load micro-internships.",
            variant: "destructive"
          });
        }
      }
    }
  });

  // Handle search
  const handleSearch = () => {
    // Implement search functionality
    toast({
      title: "Search",
      description: `Searching for "${searchTerm}"...`,
    });
  };

  // Handle apply to micro-internship
  const handleApply = async (internshipId: string) => {
    try {
      await microInternshipService.applyToMicroInternship(internshipId, {});
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Format date 
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Micro-Internships
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Short-term, project-based experiences that can be completed remotely
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="w-full sm:w-auto flex items-center space-x-2">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <Input
                    placeholder="Search micro-internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>
            </div>
            
            <Tabs defaultValue="available" onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="available">Available</TabsTrigger>
                <TabsTrigger value="applied">My Applications</TabsTrigger>
                <TabsTrigger value="active">Active Projects</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 dark:text-gray-400">Loading micro-internships...</p>
                  </div>
                ) : isError ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">Failed to load micro-internships. Please try again.</p>
                  </div>
                ) : !microInternships || microInternships.length === 0 ? (
                  <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500 dark:text-gray-400">
                      {activeTab === 'available' 
                        ? 'No micro-internships currently available.' 
                        : activeTab === 'applied'
                        ? 'You have not applied to any micro-internships yet.'
                        : activeTab === 'active'
                        ? 'You do not have any active micro-internship projects.'
                        : 'You have not completed any micro-internships yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {microInternships.map((internship) => (
                      <Card key={internship.id} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg font-semibold">{internship.title}</CardTitle>
                            <Badge>{internship.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{internship.company}</p>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm line-clamp-3 mb-4">
                            {internship.description}
                          </p>
                          
                          <div className="space-y-2 text-sm mb-4">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                              <span>{internship.duration} hours</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                              <span>Deadline: {formatDate(internship.deadline)}</span>
                            </div>
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                              <span>{internship.applicants || 0} applicants</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {internship.skills.slice(0, 3).map((skill, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {internship.skills.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{internship.skills.length - 3} more
                              </Badge>
                            )}
                          </div>
                          
                          {activeTab === 'available' ? (
                            <Button 
                              className="w-full" 
                              onClick={() => handleApply(internship.id)}
                            >
                              Apply Now
                            </Button>
                          ) : activeTab === 'applied' ? (
                            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                              Applied on {formatDate(internship.appliedDate || new Date().toISOString())}
                            </div>
                          ) : activeTab === 'active' ? (
                            <Button className="w-full">Continue Project</Button>
                          ) : (
                            <Button variant="outline" className="w-full">View Certificate</Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MicroInternships;
