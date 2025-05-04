
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Download, PlusCircle, Copy, Trash, Eye, FileCheck } from "lucide-react";
import { resumeService } from '@/services/api/resumeService';
import { Resume } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ResumeBuilder = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("my-resumes");
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState('');
  const [editResume, setEditResume] = useState<Resume | null>(null);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        setIsLoading(true);
        const data = await resumeService.getAllResumes();
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        toast({
          title: "Error",
          description: "Failed to load resumes. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchResumes();
  }, []);

  const handleCreateResume = async () => {
    if (!newResumeTitle.trim()) {
      toast({
        title: "Error",
        description: "Please enter a resume title",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create a basic resume template
      const newResumeData = {
        title: newResumeTitle,
        personalInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          website: ""
        },
        education: [],
        experience: [],
        skills: [],
        projects: [],
        certifications: []
      };

      const createdResume = await resumeService.createResume(newResumeData);
      setResumes([...resumes, createdResume]);
      setIsCreatingResume(false);
      setNewResumeTitle('');
      
      toast({
        title: "Success",
        description: "New resume created successfully!",
      });

      // Set the edit state to open the resume editor
      setEditResume(createdResume);
    } catch (error) {
      console.error('Error creating resume:', error);
      toast({
        title: "Error",
        description: "Failed to create resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateResume = async (resume: Resume) => {
    try {
      const duplicatedData = {
        ...resume,
        title: `${resume.title} (Copy)`
      };
      delete duplicatedData._id; // Remove the ID to create a new entry

      const duplicatedResume = await resumeService.createResume(duplicatedData);
      setResumes([...resumes, duplicatedResume]);
      
      toast({
        title: "Success",
        description: "Resume duplicated successfully!",
      });
    } catch (error) {
      console.error('Error duplicating resume:', error);
      toast({
        title: "Error",
        description: "Failed to duplicate resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex overflow-hidden bg-gray-50">
        <StudentSidebar />
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Resume Builder</h1>
            
            <Tabs value={activeTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              
              <TabsContent value="my-resumes" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-col space-y-1.5">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <div className="flex space-x-2 mt-6">
                            <Skeleton className="h-9 w-9 rounded-md" />
                            <Skeleton className="h-9 w-9 rounded-md" />
                            <Skeleton className="h-9 w-9 rounded-md" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="templates" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-64 w-full rounded-lg" />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Resume Builder</h1>
            <Dialog open={isCreatingResume} onOpenChange={setIsCreatingResume}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Resume
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Resume</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <Label htmlFor="title">Resume Title</Label>
                    <Input 
                      id="title"
                      placeholder="e.g., Software Developer Resume"
                      value={newResumeTitle}
                      onChange={(e) => setNewResumeTitle(e.target.value)}
                    />
                  </div>
                  <Button className="w-full" onClick={handleCreateResume}>
                    Create Resume
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="my-resumes">My Resumes</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="my-resumes" className="mt-4">
              {resumes.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center text-center p-6">
                    <FileCheck className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No resumes yet</h3>
                    <p className="text-gray-500 mb-4">Create your first resume to get started</p>
                    <Button onClick={() => setIsCreatingResume(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Create Resume
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {resumes.map((resume) => (
                    <Card key={resume._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{resume.title}</CardTitle>
                        <CardDescription>
                          Last updated: {formatDate(resume.lastUpdated || resume.updatedAt)}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-gray-600 mb-4">
                          <p>Experience: {(resume.experience || resume.content?.experience || []).length} entries</p>
                          <p>Education: {(resume.education || resume.content?.education || []).length} entries</p>
                          <p>Skills: {(resume.skills || resume.content?.skills || []).length} skills</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => setEditResume(resume)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDuplicateResume(resume)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="templates" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Template examples */}
                {["Professional", "Modern", "Creative", "Technical", "Academic", "Minimalist"].map((template) => (
                  <Card key={template} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{template}</CardTitle>
                      <CardDescription>Resume Template</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                      <div className="h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">{template} Preview</p>
                      </div>
                      <Button onClick={() => {
                        setNewResumeTitle(`${template} Resume`);
                        setIsCreatingResume(true);
                      }}>
                        Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Resume Editor Dialog */}
          {editResume && (
            <Dialog 
              open={!!editResume} 
              onOpenChange={(open) => !open && setEditResume(null)}
            >
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Edit Resume: {editResume.title}</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[70vh] overflow-y-auto">
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="personal">Personal Info</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" defaultValue={editResume.personalInfo?.name || editResume.content?.personalInfo?.name} />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue={editResume.personalInfo?.email || editResume.content?.personalInfo?.email} />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue={editResume.personalInfo?.phone || editResume.content?.personalInfo?.phone} />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input id="linkedin" defaultValue={editResume.personalInfo?.linkedin || editResume.content?.personalInfo?.linkedin} />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue={editResume.personalInfo?.address || editResume.content?.personalInfo?.address} />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" defaultValue={editResume.personalInfo?.website || editResume.content?.personalInfo?.website} />
                      </div>
                    </TabsContent>
                    
                    {/* Other tabs would be implemented with similar input fields */}
                    <TabsContent value="education">
                      <p className="text-center text-gray-500 my-6">
                        Education section editor would be implemented here
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="experience">
                      <p className="text-center text-gray-500 my-6">
                        Experience section editor would be implemented here
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="skills">
                      <p className="text-center text-gray-500 my-6">
                        Skills section editor would be implemented here
                      </p>
                    </TabsContent>
                    
                    <TabsContent value="projects">
                      <p className="text-center text-gray-500 my-6">
                        Projects section editor would be implemented here
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
                <div className="flex justify-end space-x-2 mt-4">
                  <Button variant="outline" onClick={() => setEditResume(null)}>Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
