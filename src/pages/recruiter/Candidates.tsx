
import React from 'react';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Mail } from 'lucide-react';

const Candidates = () => {
  const candidates = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Software Engineer",
      experience: "5 years",
      skills: ["React", "Node.js", "TypeScript"],
      status: "Available",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager",
      experience: "7 years",
      skills: ["Product Strategy", "Agile", "User Research"],
      status: "In Process",
    },
    {
      id: 3,
      name: "Michael Brown",
      role: "UI/UX Designer",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "User Testing"],
      status: "Hired",
    },
  ];

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <RecruiterSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Candidates</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Browse and manage candidate profiles
                </p>
              </div>
              <div className="flex gap-4">
                <div className="relative w-64">
                  <Input
                    type="search"
                    placeholder="Search candidates..."
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate) => (
                <Card key={candidate.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{candidate.role}</p>
                        <p className="text-sm text-gray-600">{candidate.experience} experience</p>
                      </div>
                      <Badge
                        variant={
                          candidate.status === "Available"
                            ? "default"
                            : candidate.status === "In Process"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Contact
                      </Button>
                      <Button size="sm">View Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Candidates;
