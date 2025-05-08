
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Clock, CalendarIcon, Briefcase } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import opportunityService, { OpportunityFilters } from '@/services/api/opportunityService';
import { Opportunity } from '@/services/api/types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ExploreOpportunities: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<OpportunityFilters>({
    type: '',
    page: 1,
    limit: 12
  });
  
  const { data: opportunities, isLoading, isError } = useQuery({
    queryKey: ['opportunities', filters],
    queryFn: () => opportunityService.getAllOpportunities(filters),
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Could not load opportunities. Please try again.",
            variant: "destructive"
          });
        }
      }
    }
  });

  const handleViewOpportunity = (id: string) => {
    navigate(`/student/opportunities/${id}`);
  };
  
  const handleSearch = () => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
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
                Explore Opportunities
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Discover internships, research positions, and other opportunities tailored to your profile
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <div className="w-full sm:w-auto flex items-center space-x-2">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <Input
                    placeholder="Search opportunities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="pl-10"
                  />
                </div>
                <Button onClick={handleSearch}>Search</Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </Button>
                <Select 
                  value={filters.type || ''} 
                  onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Opportunity Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Research">Research</SelectItem>
                    <SelectItem value="Volunteer">Volunteer</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 dark:text-gray-400">Loading opportunities...</p>
              </div>
            ) : isError ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-red-500">Failed to load opportunities. Please try again.</p>
              </div>
            ) : opportunities && opportunities.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500 dark:text-gray-400">No opportunities found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities && opportunities.map((opportunity: Opportunity) => (
                  <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold">{opportunity.title}</CardTitle>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.organization}</p>
                        </div>
                        <Badge variant={opportunity.type === "Internship" ? "default" : "outline"}>
                          {opportunity.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm line-clamp-3 mb-4">
                        {opportunity.description}
                      </p>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                          <span>{opportunity.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                          <span>{opportunity.duration}</span>
                        </div>
                        {opportunity.stipend && (
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <span>
                              {opportunity.stipend.amount} {opportunity.stipend.currency}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {opportunity.skillsRequired && opportunity.skillsRequired.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {opportunity.skillsRequired && opportunity.skillsRequired.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{opportunity.skillsRequired.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <Button 
                        className="w-full mt-4" 
                        onClick={() => handleViewOpportunity(opportunity._id || opportunity.id)}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOpportunities;
