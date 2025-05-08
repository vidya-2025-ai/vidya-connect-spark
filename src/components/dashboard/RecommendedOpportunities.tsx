
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from 'lucide-react';
import { Opportunity } from '@/services/api/types';
import opportunityService from '@/services/api/opportunityService';

const RecommendedOpportunities: React.FC = () => {
  const navigate = useNavigate();
  
  const { data: opportunities, isLoading } = useQuery({
    queryKey: ['recommendedOpportunities'],
    queryFn: opportunityService.getRecommendedOpportunities,
  });
  
  const handleViewDetails = (id: string) => {
    navigate(`/student/opportunities/${id}`);
  };
  
  const handleViewAll = () => {
    navigate('/student/explore-opportunities');
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Recommended For You</CardTitle>
          <Button 
            variant="ghost" 
            className="flex items-center text-sm" 
            onClick={handleViewAll}
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            Loading recommendations...
          </div>
        ) : !opportunities || opportunities.length === 0 ? (
          <div className="py-6 text-center text-gray-500 dark:text-gray-400">
            No recommendations available yet. Complete your profile to get personalized recommendations.
          </div>
        ) : (
          <div className="space-y-4">
            {opportunities.map((opportunity: Opportunity) => (
              <div key={opportunity.id || opportunity._id} className="border rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{opportunity.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{opportunity.organization}</p>
                  </div>
                  <Badge variant={opportunity.type === 'Internship' ? 'default' : 'outline'}>
                    {opportunity.type}
                  </Badge>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-3.5 w-3.5 mr-1" />
                  <span>{opportunity.location}</span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
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
                  className="w-full mt-3" 
                  size="sm"
                  onClick={() => handleViewDetails(opportunity._id || opportunity.id)}
                >
                  View Details
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendedOpportunities;
