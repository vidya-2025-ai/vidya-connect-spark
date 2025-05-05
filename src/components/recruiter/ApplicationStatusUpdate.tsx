
import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { applicationService } from '@/services/api/applicationService';
import { useToast } from '@/hooks/use-toast';
import { Application } from '@/services/api/types';

interface ApplicationStatusUpdateProps {
  application: Application;
  onStatusUpdated?: (updatedApplication: Application) => void;
  variant?: 'default' | 'compact';
}

const ApplicationStatusUpdate: React.FC<ApplicationStatusUpdateProps> = ({ 
  application, 
  onStatusUpdated,
  variant = 'default'
}) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(application.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: 'Pending', label: 'Pending' },
    { value: 'Under Review', label: 'Under Review' },
    { value: 'Shortlisted', label: 'Shortlisted' },
    { value: 'Interview', label: 'Interview' },
    { value: 'Accepted', label: 'Accepted' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const handleStatusChange = async (newStatus: string) => {
    if (newStatus === status) return;
    
    setStatus(newStatus);
    
    if (variant === 'compact') {
      await updateStatus(newStatus);
    }
  };

  const updateStatus = async (statusToUpdate: string) => {
    try {
      setIsSubmitting(true);
      
      const updatedApplication = await applicationService.updateApplicationStatus(
        application.id || application._id || '',
        statusToUpdate
      );
      
      toast({
        title: "Status Updated",
        description: `Application status updated to ${statusToUpdate}`,
      });
      
      if (onStatusUpdated) {
        onStatusUpdated(updatedApplication);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      });
      // Revert to original status on error
      setStatus(application.status);
    } finally {
      setIsSubmitting(false);
    }
  };

  return variant === 'compact' ? (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {statusOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <div className="flex items-center space-x-2">
      <Select value={status} onValueChange={setStatus} disabled={isSubmitting}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        onClick={() => updateStatus(status)}
        disabled={status === application.status || isSubmitting}
      >
        {isSubmitting ? "Updating..." : "Update Status"}
      </Button>
    </div>
  );
};

export default ApplicationStatusUpdate;
