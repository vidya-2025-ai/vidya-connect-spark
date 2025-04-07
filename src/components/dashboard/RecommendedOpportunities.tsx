
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Briefcase, Star, Clock } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    title: 'Environmental Impact Research Assistant',
    organization: 'Green Earth Foundation',
    type: 'Internship',
    location: 'Remote',
    duration: '3 months',
    matchScore: 92,
    category: 'Environmental',
    isNew: true
  },
  {
    id: 2,
    title: 'Mobile App Developer for Education Platform',
    organization: 'LearnTech Startup',
    type: 'Project',
    location: 'Hybrid',
    duration: '2 months',
    matchScore: 88,
    category: 'Technology',
    isNew: true
  },
  {
    id: 3,
    title: 'Community Outreach Coordinator',
    organization: 'Village Empowerment Trust',
    type: 'Internship',
    location: 'On-site',
    duration: '4 months',
    matchScore: 85,
    category: 'Social Work',
    isNew: false
  },
  {
    id: 4,
    title: 'Content Creator for Social Media',
    organization: 'Digital Rights NGO',
    type: 'Project',
    location: 'Remote',
    duration: '1 month',
    matchScore: 81,
    category: 'Digital Media',
    isNew: false
  }
];

const RecommendedOpportunities = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Recommended For You</h2>
        <a href="/student/explore" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className="vs-card">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                  <CardDescription>{opportunity.organization}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="bg-vs-purple-50 text-vs-purple-700 border-vs-purple-200">
                    {opportunity.type}
                  </Badge>
                  {opportunity.isNew && (
                    <Badge className="bg-vs-green-500">New</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.location}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.duration}
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  {opportunity.category}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>{opportunity.matchScore}% Match</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full vs-btn-primary">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecommendedOpportunities;
