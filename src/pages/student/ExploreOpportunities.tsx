import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, Calendar, Briefcase, CheckCircle2, CircleDollarSign } from "lucide-react";
import { opportunityService } from '@/services/api/opportunityService';
import { Opportunity } from '@/services/api/types';
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const ExploreOpportunities = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const { toast } = useToast();

  const skillOptions = [
    "React", "JavaScript", "TypeScript", "Node.js", 
    "Python", "Data Analysis", "Machine Learning", 
    "UI/UX Design", "Marketing", "Research"
  ];

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        setIsLoading(true);
        
        // Build filter object
        const filters: Record<string, any> = {};
        if (searchTerm) filters.search = searchTerm;
        if (selectedType && selectedType !== 'all') filters.type = selectedType;
        if (selectedSkills.length > 0) filters.skills = selectedSkills;
        
        const data = await opportunityService.getAllOpportunities(filters);
        setOpportunities(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching opportunities:', err);
        setError('Failed to load opportunities');
        toast({
          title: "Error",
          description: "Failed to load opportunities. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, [searchTerm, selectedType, selectedSkills, toast]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The useEffect will handle the search due to searchTerm dependency
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Explore Opportunities</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Discover and apply for internships, research positions, and more
              </p>
            </div>

            {/* Search and Filter Section */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-3">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      className="pl-10"
                      placeholder="Search opportunities by title or description"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Opportunity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Filters Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Filter By Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {skillOptions.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`skill-${skill}`} 
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => toggleSkill(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`}>{skill}</Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Opportunities List */}
              <div className="md:col-span-3">
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <Card key={i}>
                        <CardHeader>
                          <Skeleton className="h-6 w-2/3 mb-2" />
                          <Skeleton className="h-4 w-1/3" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-16 w-full mb-4" />
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                          </div>
                          <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-9 w-28" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <Card className="text-center p-8">
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-gray-600">Please try again later</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </Card>
                ) : opportunities.length === 0 ? (
                  <Card className="text-center p-8">
                    <p className="text-lg font-semibold mb-2">No opportunities found</p>
                    <p className="text-gray-600">Try adjusting your search criteria</p>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {opportunities.map((opportunity) => (
                      <Card key={opportunity._id} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between">
                            <div>
                              <CardTitle>{opportunity.title}</CardTitle>
                              <CardDescription>
                                {typeof opportunity.organization === 'string'
                                  ? opportunity.organization
                                  : opportunity.organization?.organization || opportunity.organization?.name || 'Organization'}
                              </CardDescription>
                            </div>
                            <Badge>
                              {opportunity.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {opportunity.description}
                          </p>
                          
                          {/* Skills Tags */}
                          {opportunity.skillsRequired && opportunity.skillsRequired.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                              {opportunity.skillsRequired.map((skill, index) => (
                                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                            {opportunity.location && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <MapPin className="h-4 w-4" />
                                <span>{opportunity.location}</span>
                              </div>
                            )}
                            {opportunity.deadline && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>Due {new Date(opportunity.deadline).toLocaleDateString()}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 text-gray-500">
                              <Briefcase className="h-4 w-4" />
                              <span>{opportunity.duration}</span>
                            </div>
                            {opportunity.stipend && opportunity.stipend.amount > 0 && (
                              <div className="flex items-center gap-1 text-gray-500">
                                <CircleDollarSign className="h-4 w-4" />
                                <span>{opportunity.stipend.amount} {opportunity.stipend.currency}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-500">
                              Posted on {new Date(opportunity.createdAt).toLocaleDateString()}
                            </p>
                            <Link to={`/student/opportunities/${opportunity._id}`}>
                              <Button>View Details</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOpportunities;
