
import React from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Search } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    title: "Summer Research Internship",
    organization: "Tech Research Labs",
    type: "Research",
    duration: "3 months",
    deadline: "2025-05-15",
    description: "Join our cutting-edge research program in artificial intelligence and machine learning.",
  },
  {
    id: 2,
    title: "Teaching Assistant Program",
    organization: "Global Education Institute",
    type: "Teaching",
    duration: "6 months",
    deadline: "2025-06-01",
    description: "Help shape the future of education by assisting in undergraduate computer science courses.",
  },
  {
    id: 3,
    title: "Social Impact Fellowship",
    organization: "Community First",
    type: "Fellowship",
    duration: "12 months",
    deadline: "2025-05-30",
    description: "Work on projects that make a real difference in local communities.",
  }
];

const ExploreOpportunities = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Explore Opportunities</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Discover and apply for opportunities that match your interests
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1 max-w-xl">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="Search opportunities..." 
                  className="pl-10"
                />
              </div>
              <Button>Search</Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="flex flex-col hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">{opportunity.title}</h3>
                    <p className="text-sm text-gray-600">{opportunity.organization}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <p className="text-sm">{opportunity.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {opportunity.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {opportunity.duration}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">
                      Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                    </p>
                    <Button size="sm">Apply Now</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreOpportunities;
