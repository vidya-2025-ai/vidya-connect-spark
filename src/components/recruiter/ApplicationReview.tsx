
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { applicationService, ApplicationReview } from "@/services/api/applicationService";
import { useToast } from "@/hooks/use-toast";
import { Application } from "@/services/api/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ApplicationReviewProps {
  application: Application;
  onReviewSubmitted?: (updatedApplication: Application) => void;
}

const ApplicationReviewComponent: React.FC<ApplicationReviewProps> = ({ 
  application, 
  onReviewSubmitted 
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [strengths, setStrengths] = useState<string[]>(application.review?.strengths || []);
  const [weaknesses, setWeaknesses] = useState<string[]>(application.review?.weaknesses || []);
  const [overallAssessment, setOverallAssessment] = useState(application.review?.overallAssessment || '');
  const [recommendationLevel, setRecommendationLevel] = useState<
    'Highly Recommended' | 'Recommended' | 'Neutral' | 'Not Recommended'
  >(application.review?.recommendationLevel || 'Neutral');
  const [newStrength, setNewStrength] = useState('');
  const [newWeakness, setNewWeakness] = useState('');

  const addStrength = () => {
    if (newStrength.trim()) {
      setStrengths([...strengths, newStrength.trim()]);
      setNewStrength('');
    }
  };

  const addWeakness = () => {
    if (newWeakness.trim()) {
      setWeaknesses([...weaknesses, newWeakness.trim()]);
      setNewWeakness('');
    }
  };

  const removeStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  const removeWeakness = (index: number) => {
    setWeaknesses(weaknesses.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      const reviewData: ApplicationReview = {
        strengths,
        weaknesses,
        overallAssessment,
        recommendationLevel
      };
      
      const updatedApplication = await applicationService.addReview(
        application.id || application._id || '',
        reviewData
      );
      
      toast({
        title: "Review Submitted",
        description: "Your review has been saved successfully.",
      });
      
      if (onReviewSubmitted) {
        onReviewSubmitted(updatedApplication);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Candidate Review</CardTitle>
        <CardDescription>
          Provide a comprehensive review for this candidate
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Strengths Section */}
        <div className="space-y-4">
          <Label>Strengths</Label>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Add a strength"
              value={newStrength}
              onChange={(e) => setNewStrength(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addStrength()}
            />
            <Button type="button" onClick={addStrength}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {strengths.map((strength, index) => (
              <Badge 
                key={index} 
                className="px-3 py-1 bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer"
                onClick={() => removeStrength(index)}
              >
                {strength} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Weaknesses Section */}
        <div className="space-y-4">
          <Label>Areas for Improvement</Label>
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Add an area for improvement"
              value={newWeakness}
              onChange={(e) => setNewWeakness(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addWeakness()}
            />
            <Button type="button" onClick={addWeakness}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {weaknesses.map((weakness, index) => (
              <Badge 
                key={index} 
                className="px-3 py-1 bg-red-100 text-red-800 hover:bg-red-200 cursor-pointer"
                onClick={() => removeWeakness(index)}
              >
                {weakness} ×
              </Badge>
            ))}
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="space-y-2">
          <Label htmlFor="assessment">Overall Assessment</Label>
          <Textarea 
            id="assessment"
            placeholder="Provide your overall assessment of this candidate"
            rows={4}
            value={overallAssessment}
            onChange={(e) => setOverallAssessment(e.target.value)}
          />
        </div>

        {/* Recommendation Level */}
        <div className="space-y-2">
          <Label htmlFor="recommendation">Recommendation Level</Label>
          <Select 
            value={recommendationLevel} 
            onValueChange={(value) => setRecommendationLevel(value as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select recommendation level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Highly Recommended">Highly Recommended</SelectItem>
              <SelectItem value="Recommended">Recommended</SelectItem>
              <SelectItem value="Neutral">Neutral</SelectItem>
              <SelectItem value="Not Recommended">Not Recommended</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          className="w-full" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApplicationReviewComponent;
