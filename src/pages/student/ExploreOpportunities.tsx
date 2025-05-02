
import React, { useState, useEffect } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Search, BookOpen, MapPin, Calendar, Briefcase, Sliders, GraduationCap, Star, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { opportunityService } from '@/services/api/opportunityService';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const ExploreOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minStipend, setMinStipend] = useState(0);
  const [showSkillBasedMatching, setShowSkillBasedMatching] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("");
  const [applyingToOpportunity, setApplyingToOpportunity] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchOpportunities();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setIsLoading(true);
      const response = await opportunityService.getAllOpportunities();
      setOpportunities(response);
      setFilteredOpportunities(response);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      toast({
        title: "Error",
        description: "Failed to load opportunities. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = () => {
    let results = opportunities;
    
    if (searchTerm) {
      results = results.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOpportunities(results);
  };

  const handleApply = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to apply for this opportunity.",
        variant: "default"
      });
      navigate('/login');
      return;
    }

    if (!applyingToOpportunity) return;

    try {
      setIsApplying(true);
      await opportunityService.applyToOpportunity(applyingToOpportunity._id, {
        coverLetter
      });
      
      toast({
        title: "Application Submitted",
        description: "Your application was submitted successfully!",
        variant: "default"
      });
      
      setApplyingToOpportunity(null);
      setCoverLetter('');
    } catch (error) {
      console.error('Error applying to opportunity:', error);
      toast({
        title: "Application Failed",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };
  
  const calculateSkillMatch = (opportunitySkills) => {
    if (!user || !user.skills || !opportunitySkills) return 0;
    
    const userSkills = user.skills.map(skill => skill.toLowerCase());
    const matchedSkills = opportunitySkills
      .filter(skill => userSkills.includes(skill.toLowerCase()))
      .length;
    
    return Math.round((matchedSkills / opportunitySkills.length) * 100) || 0;
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Explore Opportunities</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Discover skill-matched internships, micro-projects, and challenges
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => setFilterOpen(!filterOpen)}>
                  <Sliders className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Skill Match</SelectItem>
                    <SelectItem value="deadline">Deadline</SelectItem>
                    <SelectItem value="stipend">Stipend</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search by keyword, company, or skill..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch}>Search</Button>
            </div>
            
            {filterOpen && (
              <Card className="mb-6 bg-white dark:bg-gray-800">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Opportunity Type</h3>
                      <div className="space-y-2">
                        {["Internship", "Fellowship", "Micro-Internship", "Research", "Challenge", "Teaching"].map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox id={`type-${type}`} />
                            <Label htmlFor={`type-${type}`} className="text-sm">{type}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Location</h3>
                      <div className="space-y-2">
                        {["Remote", "On-site", "Hybrid"].map((location) => (
                          <div key={location} className="flex items-center space-x-2">
                            <Checkbox id={`location-${location}`} />
                            <Label htmlFor={`location-${location}`} className="text-sm">{location}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Duration</h3>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any duration</SelectItem>
                          <SelectItem value="short">Short (&lt; 1 month)</SelectItem>
                          <SelectItem value="medium">Medium (1-3 months)</SelectItem>
                          <SelectItem value="long">Long (&gt; 3 months)</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <h3 className="mt-4 mb-3 font-medium text-gray-900 dark:text-white">Minimum Stipend</h3>
                      <div className="space-y-2">
                        <Slider 
                          defaultValue={[0]} 
                          max={50000} 
                          step={5000} 
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>₹0</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="mb-3 font-medium text-gray-900 dark:text-white">Additional Filters</h3>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch id="skill-match" defaultChecked />
                          <Label htmlFor="skill-match">Skill-based matching</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="mentor" />
                          <Label htmlFor="mentor">With dedicated mentor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="certification" />
                          <Label htmlFor="certification">Offers certification</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="guarantee" />
                          <Label htmlFor="guarantee">Internship guarantee eligible</Label>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4">Apply Filters</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-lg text-gray-600">Loading opportunities...</span>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredOpportunities.map((opportunity) => {
                  const skillMatch = calculateSkillMatch(opportunity.skillsRequired);
                  
                  return (
                    <Card key={opportunity._id} className="flex flex-col hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {opportunity.organization.firstName} {opportunity.organization.lastName} ({opportunity.organization.organization})
                            </p>
                          </div>
                          {showSkillBasedMatching && (
                            <Badge className={`flex items-center ${
                              skillMatch > 80 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              skillMatch > 50 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              <Star className="h-3 w-3 mr-1" fill="currentColor" />
                              {skillMatch}% Match
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="space-y-2">
                          <p className="text-sm text-gray-700 dark:text-gray-300">{opportunity.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {opportunity.type}
                            </Badge>
                            {opportunity.skillsRequired?.slice(0, 3).map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {opportunity.skillsRequired && opportunity.skillsRequired.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{opportunity.skillsRequired.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-4">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4 mr-1" />
                            {opportunity.location || 'Remote'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Calendar className="h-4 w-4 mr-1" />
                            {opportunity.duration}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {opportunity.stipend?.amount ? `₹${opportunity.stipend.amount}/${opportunity.stipend.currency}` : 'Unpaid'}
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <GraduationCap className="h-4 w-4 mr-1" />
                            Mentorship
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Deadline: {opportunity.deadline ? new Date(opportunity.deadline).toLocaleDateString() : 'Open'}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" onClick={() => setApplyingToOpportunity(opportunity)}>Apply Now</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Apply for {applyingToOpportunity?.title}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="cover-letter">Cover Letter</Label>
                                <Textarea
                                  id="cover-letter"
                                  placeholder="Why are you interested in this opportunity? What makes you a good fit?"
                                  value={coverLetter}
                                  onChange={(e) => setCoverLetter(e.target.value)}
                                  rows={6}
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => {
                                setApplyingToOpportunity(null);
                                setCoverLetter('');
                              }}>Cancel</Button>
                              <Button 
                                onClick={handleApply}
                                disabled={isApplying}
                              >
                                {isApplying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Application
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            )}
            
            {!isLoading && filteredOpportunities.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filters to find more opportunities
                </p>
              </div>
            )}
            
            {!isLoading && filteredOpportunities.length > 0 && (
              <div className="mt-6 flex justify-center">
                <Button variant="outline">Load More Opportunities</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOpportunities;
