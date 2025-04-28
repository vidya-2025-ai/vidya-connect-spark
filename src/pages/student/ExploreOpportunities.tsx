
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Search, BookOpen, MapPin, Calendar, Briefcase, Sliders, GraduationCap, Star } from 'lucide-react';
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

const opportunities = [
  {
    id: 1,
    title: "Summer Research Internship",
    organization: "Tech Research Labs",
    type: "Research",
    duration: "3 months",
    deadline: "2025-05-15",
    description: "Join our cutting-edge research program in artificial intelligence and machine learning.",
    location: "Remote",
    stipend: "₹25,000/month",
    skillMatch: 92,
    skills: ["Python", "Machine Learning", "Data Analysis", "Research"]
  },
  {
    id: 2,
    title: "Teaching Assistant Program",
    organization: "Global Education Institute",
    type: "Teaching",
    duration: "6 months",
    deadline: "2025-06-01",
    description: "Help shape the future of education by assisting in undergraduate computer science courses.",
    location: "Hybrid",
    stipend: "₹20,000/month",
    skillMatch: 85,
    skills: ["Communication", "Computer Science", "Teaching", "Mentoring"]
  },
  {
    id: 3,
    title: "Social Impact Fellowship",
    organization: "Community First",
    type: "Fellowship",
    duration: "12 months",
    deadline: "2025-05-30",
    description: "Work on projects that make a real difference in local communities.",
    location: "On-site",
    stipend: "₹30,000/month",
    skillMatch: 78,
    skills: ["Project Management", "Social Work", "Communication", "Leadership"]
  },
  {
    id: 4,
    title: "Frontend Developer Internship",
    organization: "WebTech Solutions",
    type: "Technical",
    duration: "4 months",
    deadline: "2025-05-25",
    description: "Work on real-world projects using React, TypeScript and modern frontend technologies.",
    location: "Remote",
    stipend: "₹35,000/month",
    skillMatch: 96,
    skills: ["React", "TypeScript", "CSS", "UI/UX"]
  },
  {
    id: 5,
    title: "Product Management Micro-Internship",
    organization: "StartupHub",
    type: "Micro-Internship",
    duration: "2 weeks",
    deadline: "2025-05-10",
    description: "Short-term project to develop product roadmap for an early-stage startup.",
    location: "Remote",
    stipend: "₹15,000 (total)",
    skillMatch: 88,
    skills: ["Product Strategy", "Market Research", "User Experience", "Analytics"]
  },
  {
    id: 6,
    title: "Data Science Challenge",
    organization: "AnalyticsPro",
    type: "Challenge",
    duration: "3 weeks",
    deadline: "2025-05-20",
    description: "Participate in our data challenge to solve real business problems using data analysis.",
    location: "Remote",
    stipend: "₹20,000 (prize)",
    skillMatch: 94,
    skills: ["Python", "Data Science", "Statistics", "Data Visualization"]
  }
];

const ExploreOpportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filteredOpportunities, setFilteredOpportunities] = useState(opportunities);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [minStipend, setMinStipend] = useState(0);
  const [showSkillBasedMatching, setShowSkillBasedMatching] = useState(true);
  const [selectedDuration, setSelectedDuration] = useState("");
  
  const handleSearch = () => {
    let results = opportunities;
    
    if (searchTerm) {
      results = results.filter(opp => 
        opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredOpportunities(results);
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

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredOpportunities.map((opportunity) => (
                <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{opportunity.organization}</p>
                      </div>
                      {showSkillBasedMatching && (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                          <Star className="h-3 w-3 mr-1" fill="currentColor" />
                          {opportunity.skillMatch}% Match
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
                        {opportunity.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {opportunity.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{opportunity.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {opportunity.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {opportunity.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Briefcase className="h-4 w-4 mr-1" />
                        {opportunity.stipend}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        Mentorship
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </p>
                    <Button size="sm">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredOpportunities.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filters to find more opportunities
                </p>
              </div>
            )}
            
            <div className="mt-6 flex justify-center">
              <Button variant="outline">Load More Opportunities</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOpportunities;
