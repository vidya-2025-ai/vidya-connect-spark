
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Bell, Star, Sliders } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import candidateService, { CandidateFilters } from '@/services/api/candidateService';
import { User } from '@/services/api/types';

const TalentSearch = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("search");
  const [atsParameters, setAtsParameters] = useState({
    requiredSkills: "",
    preferredSkills: "",
    experienceLevel: "any",
    minEducation: "bachelor",
    keywordWeight: "medium",
    resumeFormat: "any"
  });

  // Search filters
  const [filters, setFilters] = useState<CandidateFilters>({
    role: 'student',
    page: 1,
    limit: 20,
    sortBy: 'profileCompleteness',
    sortOrder: 'desc'
  });
  
  // Fetch candidates
  const {
    data: candidates,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['talentSearch', filters],
    queryFn: () => candidateService.searchCandidates(filters),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Could not load candidates. Please try again.",
            variant: "destructive"
          });
        }
      }
    }
  });

  const handleAtsParameterChange = (param: string, value: string) => {
    setAtsParameters(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const applyATSParameters = () => {
    // Convert ATS parameters to search filters
    const requiredSkillsArray = atsParameters.requiredSkills
      .split('\n')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    setFilters(prev => ({
      ...prev,
      skills: requiredSkillsArray,
      experienceLevel: atsParameters.experienceLevel !== 'any' ? atsParameters.experienceLevel : undefined
    }));
    
    setActiveTab("search");
    
    toast({
      title: "ATS Parameters Applied",
      description: "Candidates are now filtered based on your ATS criteria."
    });
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      name: searchTerm || undefined,
      page: 1
    }));
  };

  const getAtsScore = (candidate: User) => {
    // Calculate ATS score based on profile completeness and skill match
    // This is a simplified version
    const profileScore = candidate.profileCompleteness || 0;
    
    // Check required skills match
    const requiredSkills = atsParameters.requiredSkills
      .split('\n')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
    
    const candidateSkills = candidate.skills || [];
    
    let skillMatchScore = 0;
    if (requiredSkills.length > 0) {
      const matchingSkills = requiredSkills.filter(skill => 
        candidateSkills.some(cs => cs.toLowerCase().includes(skill.toLowerCase()))
      );
      skillMatchScore = (matchingSkills.length / requiredSkills.length) * 100;
    } else {
      skillMatchScore = 60; // Default if no skills specified
    }
    
    // Combine scores (weighted average)
    return Math.round((profileScore * 0.4) + (skillMatchScore * 0.6));
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 border-b border-gray-200">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex">
              <div className="w-full flex md:ml-0">
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Search className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <Input
                    className="block w-full h-full pl-10 pr-3 py-2 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    placeholder="Search talent by skills, education, or experience..."
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
              </div>
            </div>
            <div className="ml-4 flex items-center md:ml-6 space-x-3">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">View notifications</span>
                <Bell className="h-5 w-5" aria-hidden="true" />
              </Button>

              <div className="relative">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SR</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Talent Search & ATS</h1>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Find talented candidates based on skills, qualifications, and your ATS criteria
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => setFilterOpen(!filterOpen)}>
                    <Filter className="h-4 w-4" />
                    {filterOpen ? 'Hide Filters' : 'Show Filters'}
                  </Button>
                  <Button 
                    variant={activeTab === "ats" ? "default" : "outline"}
                    className="flex items-center gap-2" 
                    onClick={() => setActiveTab(activeTab === "ats" ? "search" : "ats")}
                  >
                    <Sliders className="h-4 w-4" />
                    ATS Parameters
                  </Button>
                </div>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="search">Candidate Search</TabsTrigger>
                  <TabsTrigger value="ats">ATS Configuration</TabsTrigger>
                </TabsList>
                <TabsContent value="search">
                  {filterOpen && (
                    <Card className="mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div>
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Skill-Based Search</h3>
                            <div className="relative">
                              <Input 
                                placeholder="Enter skills (e.g., React, Python, UI Design)"
                                className="pl-10"
                                value={filters.skills?.join(', ') || ''}
                                onChange={(e) => {
                                  const skillsArray = e.target.value
                                    .split(',')
                                    .map(s => s.trim())
                                    .filter(s => s.length > 0);
                                  setFilters(prev => ({ ...prev, skills: skillsArray.length > 0 ? skillsArray : undefined }));
                                }}
                              />
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Location Filter</h3>
                            <div className="relative">
                              <Input 
                                placeholder="City, state, or country"
                                className="pl-10"
                                value={filters.location || ''}
                                onChange={(e) => setFilters(prev => ({ 
                                  ...prev, 
                                  location: e.target.value || undefined 
                                }))}
                              />
                              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-2 font-medium text-gray-900 dark:text-white">Experience Level</h3>
                            <Select
                              value={filters.experienceLevel || ''}
                              onValueChange={(value) => setFilters(prev => ({ 
                                ...prev, 
                                experienceLevel: value || undefined 
                              }))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="">Any Level</SelectItem>
                                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                                <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Button onClick={handleSearch}>Search Talent</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-gray-500 dark:text-gray-400">Loading candidates...</p>
                    </div>
                  ) : isError ? (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-red-500">Error loading candidates. Please try again.</p>
                    </div>
                  ) : candidates && candidates.length === 0 ? (
                    <div className="flex justify-center items-center h-64">
                      <p className="text-gray-500 dark:text-gray-400">No candidates match your filters.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {candidates?.map((candidate) => (
                        <Card key={candidate.id} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                              <div className="flex items-start space-x-4">
                                <Avatar className="h-12 w-12">
                                  {candidate.avatar ? (
                                    <AvatarImage src={candidate.avatar} alt={candidate.firstName} />
                                  ) : (
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                      {candidate.firstName.charAt(0)}{candidate.lastName.charAt(0)}
                                    </AvatarFallback>
                                  )}
                                </Avatar>
                                <div>
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {candidate.firstName} {candidate.lastName}
                                  </h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{candidate.jobTitle || 'Student'}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {candidate.education && candidate.education.length > 0
                                      ? candidate.education[0].institution
                                      : candidate.location || 'Location not specified'}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                                  <Star className="h-3 w-3 mr-1" fill="currentColor" />
                                  {candidate.profileCompleteness || 0}% Match
                                </Badge>
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 flex items-center">
                                  <Sliders className="h-3 w-3 mr-1" />
                                  {getAtsScore(candidate)}% ATS Score
                                </Badge>
                              </div>
                            </div>
                            <div className="mt-4 space-y-3">
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {(candidate.skills || []).slice(0, 6).map((skill, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {(candidate.skills || []).length > 6 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{(candidate.skills || []).length - 6} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</p>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                  {(candidate.experience || []).slice(0, 2).map((exp, index) => (
                                    <li key={index} className="mb-1">
                                      {exp.position} at {exp.company}
                                    </li>
                                  ))}
                                  {candidate.experience && candidate.experience.length === 0 && (
                                    <li>No experience listed</li>
                                  )}
                                </ul>
                              </div>
                            </div>
                            <div className="mt-4 flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => {
                                  window.location.href = `/recruiter/candidates/${candidate.id}`;
                                }}
                              >
                                View Profile
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  toast({
                                    title: "Contact Initiated",
                                    description: "You can now message this candidate."
                                  });
                                }}
                              >
                                Contact
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="ats">
                  <Card>
                    <CardHeader>
                      <CardTitle>Configure ATS Parameters</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="requiredSkills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Required Skills (one per line)
                            </label>
                            <Textarea 
                              id="requiredSkills"
                              placeholder="Enter required skills, one per line"
                              className="min-h-[120px]"
                              value={atsParameters.requiredSkills}
                              onChange={(e) => handleAtsParameterChange("requiredSkills", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">These skills are mandatory for candidates</p>
                          </div>
                          
                          <div>
                            <label htmlFor="preferredSkills" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Preferred Skills (one per line)
                            </label>
                            <Textarea 
                              id="preferredSkills"
                              placeholder="Enter preferred skills, one per line"
                              className="min-h-[120px]"
                              value={atsParameters.preferredSkills}
                              onChange={(e) => handleAtsParameterChange("preferredSkills", e.target.value)}
                            />
                            <p className="text-xs text-gray-500 mt-1">These skills will boost candidate rankings</p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Experience Level
                            </label>
                            <Select 
                              value={atsParameters.experienceLevel}
                              onValueChange={(value) => handleAtsParameterChange("experienceLevel", value)}
                            >
                              <SelectTrigger id="experienceLevel">
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                                <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                                <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                                <SelectItem value="any">Any Experience Level</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="minEducation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Minimum Education
                            </label>
                            <Select 
                              value={atsParameters.minEducation}
                              onValueChange={(value) => handleAtsParameterChange("minEducation", value)}
                            >
                              <SelectTrigger id="minEducation">
                                <SelectValue placeholder="Select minimum education" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="highschool">High School</SelectItem>
                                <SelectItem value="associate">Associate Degree</SelectItem>
                                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                                <SelectItem value="master">Master's Degree</SelectItem>
                                <SelectItem value="phd">PhD</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="keywordWeight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Keyword Matching Weight
                            </label>
                            <Select 
                              value={atsParameters.keywordWeight}
                              onValueChange={(value) => handleAtsParameterChange("keywordWeight", value)}
                            >
                              <SelectTrigger id="keywordWeight">
                                <SelectValue placeholder="Select keyword weight" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="low">Low - More candidates, less focused</SelectItem>
                                <SelectItem value="medium">Medium - Balanced approach</SelectItem>
                                <SelectItem value="high">High - Fewer candidates, highly focused</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div>
                            <label htmlFor="resumeFormat" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Resume Format Preference
                            </label>
                            <Select 
                              value={atsParameters.resumeFormat}
                              onValueChange={(value) => handleAtsParameterChange("resumeFormat", value)}
                            >
                              <SelectTrigger id="resumeFormat">
                                <SelectValue placeholder="Select resume format" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="any">Any Format</SelectItem>
                                <SelectItem value="chronological">Chronological</SelectItem>
                                <SelectItem value="functional">Functional</SelectItem>
                                <SelectItem value="combination">Combination</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end mt-6">
                        <Button 
                          variant="outline" 
                          className="mr-2" 
                          onClick={() => {
                            setAtsParameters({
                              requiredSkills: "",
                              preferredSkills: "",
                              experienceLevel: "any",
                              minEducation: "bachelor",
                              keywordWeight: "medium",
                              resumeFormat: "any"
                            });
                          }}
                        >
                          Reset to Default
                        </Button>
                        <Button onClick={applyATSParameters}>Apply ATS Parameters</Button>
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

export default TalentSearch;
