
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { opportunityService } from '@/services/api/opportunityService';
import { applicationService } from '@/services/api/applicationService';
import { resumeService } from '@/services/api/resumeService';
import { Opportunity, Resume } from '@/services/api/types';
import { MapPin, Calendar, Briefcase, CircleDollarSign, Building, FileCheck } from "lucide-react";

const OpportunityDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [selectedResume, setSelectedResume] = useState<string>('');
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch opportunity details
  useEffect(() => {
    const fetchOpportunityDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const data = await opportunityService.getOpportunityById(id);
        console.log("Fetched opportunity details:", data);
        setOpportunity(data);
      } catch (err) {
        console.error('Error fetching opportunity details:', err);
        setError('Failed to load opportunity details');
        toast({
          title: "Error",
          description: "Failed to load opportunity details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunityDetails();
  }, [id, toast]);

  // Fetch user's resumes for application
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const data = await resumeService.getAllResumes();
        setResumes(data);
        if (data.length > 0) {
          setSelectedResume(data[0]._id || data[0].id);
        }
      } catch (err) {
        console.error('Error fetching resumes:', err);
        toast({
          title: "Warning",
          description: "Failed to load your resumes. You may need to create a resume first.",
          variant: "destructive",
        });
      }
    };

    fetchResumes();
  }, [toast]);

  const handleApply = () => {
    if (resumes.length === 0) {
      toast({
        title: "Resume Required",
        description: "Please create a resume before applying for opportunities.",
        variant: "destructive",
      });
      navigate('/student/resume-builder');
      return;
    }
    
    setIsApplyDialogOpen(true);
  };

  const handleCheckATSScore = () => {
    if (!id) return;
    navigate(`/student/ats-calculator?opportunityId=${id}`);
  };

  const handleSubmitApplication = async () => {
    if (!id || !selectedResume) {
      toast({
        title: "Error",
        description: "Missing required information for application.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await applicationService.createApplication(id, {
        resumeId: selectedResume,
        coverLetter: coverLetter
      });
      
      setIsApplyDialogOpen(false);
      setCoverLetter('');
      
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!",
      });
      
      // Navigate to applications tracker
      navigate('/student/applications-tracker');
    } catch (err) {
      console.error('Error submitting application:', err);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Card>
              <CardHeader>
                <Skeleton className="h-7 w-1/2 mb-2" />
                <Skeleton className="h-5 w-1/3" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20 rounded-full" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error || !opportunity) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-4xl mx-auto">
            <Card className="text-center p-8">
              <p className="text-red-500 mb-2">{error || "Opportunity not found"}</p>
              <p className="text-gray-600 mb-4">Unable to load the opportunity details</p>
              <Button 
                variant="outline" 
                onClick={() => navigate('/student/explore-opportunities')}
              >
                Back to Opportunities
              </Button>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-2" 
              onClick={() => navigate('/student/explore-opportunities')}
            >
              ← Back to Opportunities
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">{opportunity.title}</h1>
            <div className="flex items-center mt-1 text-gray-600">
              <Building className="h-4 w-4 mr-1" />
              <span>
                {typeof opportunity.organization === 'string'
                  ? opportunity.organization
                  : opportunity.organization?.organization || opportunity.organization?.name || 'Organization'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <p className="whitespace-pre-line">{opportunity.description}</p>
                  </div>

                  {opportunity.requirements && opportunity.requirements.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {opportunity.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-2">Skills Required</h3>
                      <div className="flex flex-wrap gap-2">
                        {opportunity.skillsRequired.map((skill, index) => (
                          <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={handleCheckATSScore}
                    className="flex items-center gap-1"
                  >
                    <FileCheck className="h-4 w-4" />
                    Check ATS Score
                  </Button>
                  <Button onClick={handleApply}>Apply Now</Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Opportunity Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Type</p>
                      <p className="font-medium">{opportunity.type}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{opportunity.duration}</p>
                    </div>
                    
                    {opportunity.location && (
                      <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <p className="font-medium">{opportunity.location}</p>
                        </div>
                      </div>
                    )}
                    
                    {opportunity.deadline && (
                      <div>
                        <p className="text-sm text-gray-500">Application Deadline</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <p className="font-medium">{new Date(opportunity.deadline).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                    
                    {opportunity.stipend && (
                      <div>
                        <p className="text-sm text-gray-500">Stipend</p>
                        <div className="flex items-center gap-1">
                          <CircleDollarSign className="h-4 w-4 text-gray-500" />
                          <p className="font-medium">
                            {opportunity.stipend.amount > 0 
                              ? `${opportunity.stipend.amount} ${opportunity.stipend.currency}` 
                              : 'Unpaid'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div>
                      <p className="text-sm text-gray-500">Posted On</p>
                      <p className="font-medium">{new Date(opportunity.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Apply for {opportunity.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this opportunity
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Resume</label>
              <Select
                value={selectedResume}
                onValueChange={setSelectedResume}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a resume" />
                </SelectTrigger>
                <SelectContent>
                  {resumes.length === 0 ? (
                    <SelectItem value="no_resumes" disabled>No resumes available</SelectItem>
                  ) : (
                    resumes.map((resume) => (
                      <SelectItem key={resume._id || resume.id} value={resume._id || resume.id}>
                        {resume.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Cover Letter (Optional)</label>
              <Textarea
                placeholder="Tell the recruiter why you're interested in this opportunity..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsApplyDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitApplication}
              disabled={isSubmitting || !selectedResume}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default OpportunityDetail;
