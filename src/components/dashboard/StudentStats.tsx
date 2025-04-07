
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, CheckCircle, Clock, Award } from 'lucide-react';

const stats = [
  {
    name: 'Applications',
    value: '8',
    icon: Briefcase,
    iconColor: 'bg-vs-green-100 text-vs-green-600'
  },
  {
    name: 'In Progress',
    value: '3',
    icon: Clock,
    iconColor: 'bg-amber-100 text-amber-600'
  },
  {
    name: 'Completed',
    value: '4',
    icon: CheckCircle,
    iconColor: 'bg-blue-100 text-blue-600'
  },
  {
    name: 'Certificates',
    value: '3',
    icon: Award,
    iconColor: 'bg-vs-purple-100 text-vs-purple-600'
  }
];

const StudentStats = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.name} className="vs-card">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className={`p-2 rounded-full ${stat.iconColor} mr-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.name}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StudentStats;
