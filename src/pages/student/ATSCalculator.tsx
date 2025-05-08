
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useMutation } from '@tanstack/react-query';
import { FileText, Upload, CheckCircle, XCircle, Info, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import atsService from '@/services/api/atsService';

const ATSCalculator: React.FC = () => {
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const { mutate: analyzeResume, isLoading, data: analysis } = useMutation({
    mutationFn: () => atsService.analyzeResume({
      resumeText,
      jobDescription
    }),
    meta: {
      onSuccess: () => {
        toast({
          title: "Analysis Complete",
          description: "Your resume has been successfully analyzed.",
        });
      },
      onError: () => {
        toast({
          title: "Analysis Failed",
          description: "There was a problem analyzing your resume. Please try again.",
          variant: "destructive"
        });
      }
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeText || !jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both your resume content and the job description.",
        variant: "destructive"
      });
      return;
    }
    analyzeResume();
  };
  
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real implementation, this would parse the document
    // For now, we'll just show a toast notification
    toast({
      title: "Resume Uploaded",
      description: "Your resume has been uploaded successfully.",
    });
    
    // Simulate parsing text from the resume
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setResumeText(text || 'Sample resume content from uploaded file');
    };
    reader.readAsText(file);
  };
  
  const handleJobDescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    toast({
      title: "Job Description Uploaded",
      description: "The job description has been uploaded successfully.",
    });
    
    // Simulate parsing text
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      setJobDescription(text || 'Sample job description from uploaded file');
    };
    reader.readAsText(file);
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
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              ATS Resume Scanner
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Check if your resume will get past the Applicant Tracking System (ATS)
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Resume Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="resume-text" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Your Resume Content
                        </label>
                        <div className="flex items-center mb-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Paste your resume content or
                          </p>
                          <div className="relative ml-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => document.getElementById('resume-upload')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Upload Resume
                            </Button>
                            <input 
                              id="resume-upload" 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={handleResumeUpload}
                            />
                          </div>
                        </div>
                        <Textarea
                          id="resume-text"
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                          placeholder="Paste your resume content here..."
                          className="min-h-[200px]"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="job-description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Job Description
                        </label>
                        <div className="flex items-center mb-2">
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Paste the job description or
                          </p>
                          <div className="relative ml-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm"
                              className="flex items-center"
                              onClick={() => document.getElementById('job-upload')?.click()}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Upload Job Description
                            </Button>
                            <input 
                              id="job-upload" 
                              type="file" 
                              className="hidden" 
                              accept=".pdf,.doc,.docx,.txt"
                              onChange={handleJobDescriptionUpload}
                            />
                          </div>
                        </div>
                        <Textarea
                          id="job-description"
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          placeholder="Paste the job description here..."
                          className="min-h-[150px]"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading || !resumeText || !jobDescription}
                      >
                        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>How ATS Works</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                      Most companies use Applicant Tracking Systems (ATS) to filter resumes before a human ever sees them. Our tool helps you optimize your resume to pass through these systems.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Keyword Matching</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            ATS systems scan for industry keywords and skills that match the job description.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <XCircle className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Formatting Issues</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Complex formatting, tables, and images can confuse ATS systems.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <Info className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Section Headers</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Clear section headers like "Experience," "Education," and "Skills" help ATS organize your information.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">Tailoring is Key</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Different jobs require different versions of your resume for the best results.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {analysis && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Analysis Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">ATS Compatibility Score</span>
                            <span className="text-sm font-medium">{analysis.score}%</span>
                          </div>
                          <Progress value={analysis.score} className="h-2" />
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Missing Keywords</h4>
                          {analysis.missingKeywords && analysis.missingKeywords.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {analysis.missingKeywords.map((keyword, idx) => (
                                <span key={idx} className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Great job! No critical keywords missing.
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                          <ul className="space-y-1 list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                            {analysis.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSCalculator;
