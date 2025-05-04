
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, CheckCircle, Clock, Award } from 'lucide-react';
import { applicationService } from '@/services/api/applicationService';
import { Application } from '@/services/api/types';
import { Skeleton } from '@/components/ui/skeleton';

const StudentStats = () => {
  const [stats, setStats] = useState({
    applications: 0,
    inProgress: 0,
    completed: 0,
    certificates: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // Fetch applications
        const applications = await applicationService.getStudentApplications();
        
        // Calculate stats
        const inProgress = applications.filter(app => 
          app.status === 'Pending' || app.status === 'Under Review'
        ).length;
        
        const completed = applications.filter(app => 
          app.status === 'Accepted' || app.status === 'Rejected'
        ).length;
        
        // Set stats (certificates count will be 0 for now)
        setStats({
          applications: applications.length,
          inProgress,
          completed,
          certificates: 0, // Can be updated when certificate service is implemented
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Set default values in case of error
        setStats({
          applications: 0,
          inProgress: 0,
          completed: 0,
          certificates: 0,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsConfig = [
    {
      name: 'Applications',
      value: stats.applications.toString(),
      icon: Briefcase,
      iconColor: 'bg-vs-green-100 text-vs-green-600'
    },
    {
      name: 'In Progress',
      value: stats.inProgress.toString(),
      icon: Clock,
      iconColor: 'bg-amber-100 text-amber-600'
    },
    {
      name: 'Completed',
      value: stats.completed.toString(),
      icon: CheckCircle,
      iconColor: 'bg-blue-100 text-blue-600'
    },
    {
      name: 'Certificates',
      value: stats.certificates.toString(),
      icon: Award,
      iconColor: 'bg-vs-purple-100 text-vs-purple-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="vs-card">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-gray-100 mr-3">
                  <Skeleton className="h-5 w-5" />
                </div>
                <div>
                  <Skeleton className="h-6 w-8 mb-1" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsConfig.map((stat) => (
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
