
import React from 'react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';

const applications = [
  {
    id: 1,
    title: 'Web Developer',
    organization: 'Rural Tech Solutions',
    appliedDate: 'Apr 2, 2025',
    status: 'In Progress',
    statusIcon: Clock,
    statusColor: 'bg-amber-100 text-amber-800'
  },
  {
    id: 2,
    title: 'Research Assistant',
    organization: 'Climate Action Network',
    appliedDate: 'Mar 28, 2025',
    status: 'Selected',
    statusIcon: CheckCircle,
    statusColor: 'bg-green-100 text-green-800'
  },
  {
    id: 3,
    title: 'Content Writer',
    organization: 'Education First NGO',
    appliedDate: 'Mar 15, 2025',
    status: 'Rejected',
    statusIcon: XCircle,
    statusColor: 'bg-red-100 text-red-800'
  }
];

const ApplicationTracker = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
        <a href="/student/applications" className="text-vs-green-600 hover:text-vs-green-700 text-sm font-medium">
          View All
        </a>
      </div>

      <div className="space-y-4">
        {applications.map((application) => (
          <Card key={application.id} className="vs-card">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900">{application.title}</h3>
                  <p className="text-sm text-gray-600">{application.organization}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${application.statusColor} flex items-center gap-1`}
                >
                  <application.statusIcon className="h-3 w-3" />
                  {application.status}
                </Badge>
              </div>
              <div className="mt-2 flex items-center text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                Applied on {application.appliedDate}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApplicationTracker;
