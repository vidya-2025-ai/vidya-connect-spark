
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Calendar, 
  MapPin, 
  Briefcase, 
  Clock, 
  CheckCircle,
  ChevronLeft, 
  Star,
  Share,
  FileText
} from 'lucide-react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import opportunityService from '@/services/api/opportunityService';

const OpportunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  
  const { data: opportunity, isLoading, isError } = useQuery({
    queryKey: ['opportunity', id],
    queryFn: () => opportunityService.getOpportunityById(id || ''),
    enabled: !!id,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Could not load opportunity details. Please try again.",
            variant: "destructive"
          });
        }
      }
    }
  });

  const handleApply = async () => {
    if (!id) return;

    setIsApplying(true);
    try {
      await opportunityService.applyToOpportunity(id, {});
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      navigate('/student/applications');
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "There was a problem submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleSaveOpportunity = async () => {
    if (!id) return;

    try {
      await opportunityService.saveOpportunity(id);
      toast({
        title: "Opportunity Saved",
        description: "This opportunity has been added to your saved list.",
      });
    } catch (error) {
      toast({
        title: "Action Failed",
        description: "Could not save this opportunity. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };
  
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      <div className="flex-1 overflow-auto">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 dark:text-gray-400">Loading opportunity details...</p>
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-64 flex-col">
              <p className="text-red-500 mb-4">Failed to load opportunity details</p>
              <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
          ) : opportunity ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Button 
                  variant="ghost" 
                  className="flex items-center text-gray-600 dark:text-gray-400 mb-4"
                  onClick={() => navigate(-1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Back to Opportunities
                </Button>
                
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {opportunity.title}
                    </h1>
                    <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400">
                      <span className="text-lg">{opportunity.organization}</span>
                      <span className="mx-2">•</span>
                      <Badge variant={opportunity.type === "Internship" ? "default" : "outline"}>
                        {opportunity.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 sm:mt-0 flex space-x-2">
                    <Button variant="outline" className="flex items-center" onClick={handleSaveOpportunity}>
                      <Star className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Share className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <Card>
                    <Tabs defaultValue="description" className="w-full">
                      <TabsList className="grid grid-cols-3 mb-0">
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="requirements">Requirements</TabsTrigger>
                        <TabsTrigger value="company">Company</TabsTrigger>
                      </TabsList>
                      <TabsContent value="description" className="p-6">
                        <div className="prose dark:prose-invert max-w-none">
                          <p>{opportunity.description}</p>
                        </div>
                      </TabsContent>
                      <TabsContent value="requirements" className="p-6">
                        <h3 className="text-lg font-medium mb-4">Requirements</h3>
                        <ul className="space-y-2">
                          {opportunity.requirements && opportunity.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <h3 className="text-lg font-medium mt-6 mb-4">Skills Required</h3>
                        <div className="flex flex-wrap gap-2">
                          {opportunity.skillsRequired && opportunity.skillsRequired.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="company" className="p-6">
                        <h3 className="text-lg font-medium mb-4">About {opportunity.organization}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">
                          Information about the company would be displayed here.
                        </p>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </div>
                
                <div>
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Opportunity Overview</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                            <p className="font-medium">{opportunity.location}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="font-medium">{opportunity.duration}</p>
                          </div>
                        </div>
                        
                        {opportunity.stipend && (
                          <div className="flex items-center">
                            <Briefcase className="w-5 h-5 text-gray-500 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Stipend</p>
                              <p className="font-medium">
                                {opportunity.stipend.amount} {opportunity.stipend.currency}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 text-gray-500 mr-3" />
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Application Deadline</p>
                            <p className="font-medium">
                              {opportunity.deadline ? formatDate(opportunity.deadline) : 'Open'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-6" 
                        onClick={handleApply}
                        disabled={isApplying}
                      >
                        {isApplying ? "Applying..." : "Apply Now"}
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 flex items-center justify-center"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Check ATS Score
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-gray-500 dark:text-gray-400">Opportunity not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
