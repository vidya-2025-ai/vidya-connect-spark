
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Plus, Trash2, Download, Star, Book, Briefcase, GraduationCap } from 'lucide-react';

// Template types
type ResumeSection = {
  id: string;
  title: string;
  items: {
    id: string;
    [key: string]: any;
  }[];
};

type ResumeData = {
  basics: {
    name: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    website?: string;
  };
  sections: {
    [key: string]: ResumeSection;
  };
};

const EMPTY_RESUME: ResumeData = {
  basics: {
    name: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    website: "",
  },
  sections: {
    education: {
      id: "education",
      title: "Education",
      items: [],
    },
    experience: {
      id: "experience",
      title: "Experience",
      items: [],
    },
    skills: {
      id: "skills",
      title: "Skills",
      items: [],
    },
  },
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(EMPTY_RESUME);
  const [activeTab, setActiveTab] = useState('basics');
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');

  const updateBasics = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      basics: {
        ...prev.basics,
        [field]: value
      }
    }));
  };

  const addSectionItem = (sectionId: string) => {
    setResumeData(prev => {
      const section = prev.sections[sectionId];
      
      // Create different item templates based on section type
      let newItem: any = { id: `${sectionId}-${Date.now()}` };
      
      if (sectionId === 'education') {
        newItem = {
          ...newItem,
          institution: '',
          degree: '',
          field: '',
          startDate: '',
          endDate: '',
          description: ''
        };
      } else if (sectionId === 'experience') {
        newItem = {
          ...newItem,
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          description: ''
        };
      } else if (sectionId === 'skills') {
        newItem = {
          ...newItem,
          name: '',
          level: 'Intermediate'
        };
      }

      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...section,
            items: [...section.items, newItem]
          }
        }
      };
    });
  };

  const updateSectionItem = (sectionId: string, itemId: string, field: string, value: any) => {
    setResumeData(prev => {
      const section = prev.sections[sectionId];
      const updatedItems = section.items.map(item => 
        item.id === itemId ? { ...item, [field]: value } : item
      );

      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...section,
            items: updatedItems
          }
        }
      };
    });
  };

  const removeSectionItem = (sectionId: string, itemId: string) => {
    setResumeData(prev => {
      const section = prev.sections[sectionId];
      return {
        ...prev,
        sections: {
          ...prev.sections,
          [sectionId]: {
            ...section,
            items: section.items.filter(item => item.id !== itemId)
          }
        }
      };
    });
  };

  const getExportData = () => {
    // Simple JSON export for now
    return JSON.stringify(resumeData, null, 2);
  };

  const exportResume = () => {
    const exportData = getExportData();
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume-${resumeData.basics.name.replace(/\s+/g, '-').toLowerCase() || 'export'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'basics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={resumeData.basics.name} 
                  onChange={(e) => updateBasics('name', e.target.value)} 
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={resumeData.basics.email} 
                  onChange={(e) => updateBasics('email', e.target.value)} 
                  placeholder="johndoe@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={resumeData.basics.phone} 
                  onChange={(e) => updateBasics('phone', e.target.value)} 
                  placeholder="+1 (123) 456-7890"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  value={resumeData.basics.location} 
                  onChange={(e) => updateBasics('location', e.target.value)} 
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website/Portfolio (Optional)</Label>
              <Input 
                id="website" 
                value={resumeData.basics.website} 
                onChange={(e) => updateBasics('website', e.target.value)} 
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea 
                id="summary" 
                value={resumeData.basics.summary} 
                onChange={(e) => updateBasics('summary', e.target.value)} 
                placeholder="Write a brief professional summary..."
                className="h-32"
              />
            </div>
          </div>
        );
      
      case 'education':
        return (
          <div className="space-y-6">
            {resumeData.sections.education.items.map((edu, index) => (
              <Card key={edu.id} className="relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Education #{index + 1}</CardTitle>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeSectionItem('education', edu.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input 
                        value={edu.institution || ''} 
                        onChange={(e) => updateSectionItem('education', edu.id, 'institution', e.target.value)}
                        placeholder="University Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input 
                        value={edu.degree || ''} 
                        onChange={(e) => updateSectionItem('education', edu.id, 'degree', e.target.value)}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input 
                      value={edu.field || ''} 
                      onChange={(e) => updateSectionItem('education', edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        value={edu.startDate || ''} 
                        onChange={(e) => updateSectionItem('education', edu.id, 'startDate', e.target.value)}
                        placeholder="mm/yyyy"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date (or Expected)</Label>
                      <Input 
                        value={edu.endDate || ''} 
                        onChange={(e) => updateSectionItem('education', edu.id, 'endDate', e.target.value)}
                        placeholder="mm/yyyy or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Optional)</Label>
                    <Textarea 
                      value={edu.description || ''} 
                      onChange={(e) => updateSectionItem('education', edu.id, 'description', e.target.value)}
                      placeholder="Additional details, achievements, GPA, etc."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => addSectionItem('education')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            {resumeData.sections.experience.items.map((exp, index) => (
              <Card key={exp.id} className="relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Experience #{index + 1}</CardTitle>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeSectionItem('experience', exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company/Organization</Label>
                      <Input 
                        value={exp.company || ''} 
                        onChange={(e) => updateSectionItem('experience', exp.id, 'company', e.target.value)}
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input 
                        value={exp.position || ''} 
                        onChange={(e) => updateSectionItem('experience', exp.id, 'position', e.target.value)}
                        placeholder="Job Title"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input 
                      value={exp.location || ''} 
                      onChange={(e) => updateSectionItem('experience', exp.id, 'location', e.target.value)}
                      placeholder="City, State or Remote"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date</Label>
                      <Input 
                        value={exp.startDate || ''} 
                        onChange={(e) => updateSectionItem('experience', exp.id, 'startDate', e.target.value)}
                        placeholder="mm/yyyy"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Input 
                        value={exp.endDate || ''} 
                        onChange={(e) => updateSectionItem('experience', exp.id, 'endDate', e.target.value)}
                        placeholder="mm/yyyy or Present"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      value={exp.description || ''} 
                      onChange={(e) => updateSectionItem('experience', exp.id, 'description', e.target.value)}
                      placeholder="Describe your responsibilities and achievements"
                      className="h-32"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => addSectionItem('experience')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            {resumeData.sections.skills.items.map((skill, index) => (
              <Card key={skill.id} className="relative">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Skill #{index + 1}</CardTitle>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={() => removeSectionItem('skills', skill.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Skill Name</Label>
                    <Input 
                      value={skill.name || ''} 
                      onChange={(e) => updateSectionItem('skills', skill.id, 'name', e.target.value)}
                      placeholder="e.g., JavaScript, Project Management, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proficiency Level</Label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={skill.level || 'Intermediate'} 
                      onChange={(e) => updateSectionItem('skills', skill.id, 'level', e.target.value)}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4" 
              onClick={() => addSectionItem('skills')}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderPreview = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        {/* Header with name and contact info */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">{resumeData.basics.name || 'Your Name'}</h1>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600 dark:text-gray-400">
            {resumeData.basics.email && <div>{resumeData.basics.email}</div>}
            {resumeData.basics.phone && <div>{resumeData.basics.phone}</div>}
            {resumeData.basics.location && <div>{resumeData.basics.location}</div>}
            {resumeData.basics.website && <div>{resumeData.basics.website}</div>}
          </div>
        </div>

        {/* Summary */}
        {resumeData.basics.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3">Professional Summary</h2>
            <p className="text-sm">{resumeData.basics.summary}</p>
          </div>
        )}

        {/* Education */}
        {resumeData.sections.education.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3 flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" />
              Education
            </h2>
            <div className="space-y-4">
              {resumeData.sections.education.items.map((edu) => (
                <div key={edu.id} className="pl-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{edu.institution || 'University Name'}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {edu.startDate && edu.endDate ? `${edu.startDate} - ${edu.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-sm">{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                  {edu.description && <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience */}
        {resumeData.sections.experience.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3 flex items-center">
              <Briefcase className="mr-2 h-5 w-5" />
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.sections.experience.items.map((exp) => (
                <div key={exp.id} className="pl-2">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{exp.position || 'Position'}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exp.startDate && exp.endDate ? `${exp.startDate} - ${exp.endDate}` : ''}
                    </p>
                  </div>
                  <p className="text-sm font-medium">
                    {exp.company}{exp.location ? ` | ${exp.location}` : ''}
                  </p>
                  {exp.description && <p className="text-sm mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resumeData.sections.skills.items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold border-b pb-2 mb-3 flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Skills
            </h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {resumeData.sections.skills.items.map((skill) => (
                <div key={skill.id} className="pl-2 flex justify-between">
                  <span className="text-sm">{skill.name}</span>
                  <span className="text-xs text-gray-500">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Resume Builder</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Create a professional resume to impress recruiters
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button onClick={() => setPreviewMode(previewMode === 'edit' ? 'preview' : 'edit')}>
                  {previewMode === 'edit' ? 'Preview Resume' : 'Edit Resume'}
                </Button>
                <Button variant="outline" onClick={exportResume}>
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </div>

            <div className="mt-8">
              {previewMode === 'edit' ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-500" />
                      Resume Editor
                    </CardTitle>
                    <CardDescription>
                      Fill in your details in each section to build your resume
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="basics" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid grid-cols-3 mb-8">
                        <TabsTrigger value="basics">Basic Info</TabsTrigger>
                        <TabsTrigger value="education">Education</TabsTrigger>
                        <TabsTrigger value="experience">Experience</TabsTrigger>
                      </TabsList>
                      <TabsList className="grid grid-cols-1 mb-8">
                        <TabsTrigger value="skills">Skills</TabsTrigger>
                      </TabsList>
                      <TabsContent value={activeTab} className="pt-4">
                        {renderForm()}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-500" />
                      Resume Preview
                    </CardTitle>
                    <CardDescription>
                      Here's how your resume will look
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderPreview()}
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button onClick={() => setPreviewMode('edit')}>
                      Return to Edit Mode
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
