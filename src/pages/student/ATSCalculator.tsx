
import React, { useState } from 'react';
import StudentSidebar from '@/components/dashboard/StudentSidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

const ATSCalculator = () => {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [results, setResults] = useState<null | {
    score: number;
    matchedKeywords: string[];
    missedKeywords: string[];
    suggestions: string[];
  }>(null);

  const analyzeResume = () => {
    // This is a simplified version of ATS scoring
    // In a real app, this would use more sophisticated NLP techniques
    
    if (!resumeText || !jobDescription) return;
    
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);
    
    const matchedKeywords = jdKeywords.filter(keyword => 
      resumeKeywords.some(rk => rk.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    const missedKeywords = jdKeywords.filter(keyword => 
      !resumeKeywords.some(rk => rk.toLowerCase().includes(keyword.toLowerCase()))
    );
    
    // Calculate score based on keyword matches
    const score = Math.min(Math.round((matchedKeywords.length / (jdKeywords.length || 1)) * 100), 100);
    
    // Generate simple suggestions
    const suggestions = [];
    if (score < 60) {
      suggestions.push("Consider adding more keywords from the job description to your resume");
    }
    if (missedKeywords.length > 0) {
      suggestions.push(`Include these missing keywords: ${missedKeywords.slice(0, 3).join(', ')}${missedKeywords.length > 3 ? '...' : ''}`);
    }
    if (resumeText.length < 300) {
      suggestions.push("Your resume may be too short, consider adding more details");
    }
    
    setResults({
      score,
      matchedKeywords,
      missedKeywords,
      suggestions
    });
  };

  const extractKeywords = (text: string): string[] => {
    // A very simplified keyword extraction
    // In a real app, this would use more sophisticated NLP
    const commonWords = new Set([
      'and', 'the', 'of', 'to', 'a', 'in', 'for', 'is', 'on', 'that', 'by', 
      'this', 'with', 'i', 'you', 'it', 'not', 'or', 'be', 'are', 'from', 'at', 
      'as', 'your', 'have', 'more', 'an', 'was', 'we', 'will', 'can', 'all', 'about'
    ]);
    
    return text
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3 && !commonWords.has(word.toLowerCase()))
      .concat(
        // Extract phrases that might be skills or qualifications
        text.match(/[A-Z][a-z]+ [A-Za-z]+/g) || [], 
        text.match(/[A-Za-z]+ [A-Za-z]+ [A-Za-z]+/g) || []
      )
      .filter(Boolean);
  };
  
  const resetAnalysis = () => {
    setResults(null);
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 dark:bg-gray-900">
      <StudentSidebar />
      <div className="flex-1 overflow-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">ATS Calculator</h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Check how well your resume matches the job description
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-500" />
                    Resume Analysis
                  </CardTitle>
                  <CardDescription>Paste your resume and job description to analyze compatibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="resume">Your Resume</Label>
                      <Textarea 
                        id="resume" 
                        className="min-h-[200px]" 
                        placeholder="Paste your resume text here..."
                        value={resumeText}
                        onChange={(e) => setResumeText(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="jobDescription">Job Description</Label>
                      <Textarea 
                        id="jobDescription" 
                        className="min-h-[200px]" 
                        placeholder="Paste the job description here..."
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetAnalysis}>Reset</Button>
                  <Button onClick={analyzeResume} disabled={!resumeText || !jobDescription}>
                    Analyze Resume
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>See how your resume performs against ATS</CardDescription>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">ATS Compatibility Score</span>
                          <span className="text-sm font-medium">{results.score}%</span>
                        </div>
                        <Progress 
                          value={results.score} 
                          className="h-2"
                          style={{
                            backgroundColor: results.score < 50 ? 'rgb(239, 68, 68)' : 
                                           results.score < 70 ? 'rgb(234, 179, 8)' : 
                                           'rgb(34, 197, 94)'
                          }}
                        />
                        <div className="mt-1 text-xs text-right">
                          {results.score < 50 ? 'Poor Match' : 
                           results.score < 70 ? 'Good Match' : 
                           'Excellent Match'}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Matched Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {results.matchedKeywords.length > 0 ? 
                            results.matchedKeywords.map((keyword, i) => (
                              <Badge key={i} className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                {keyword}
                              </Badge>
                            )) : 
                            <p className="text-sm text-gray-500">No matches found</p>
                          }
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {results.missedKeywords.length > 0 ? 
                            results.missedKeywords.slice(0, 10).map((keyword, i) => (
                              <Badge key={i} variant="outline" className="border-red-300 text-red-700 dark:border-red-800 dark:text-red-400">
                                {keyword}
                              </Badge>
                            )) : 
                            <p className="text-sm text-gray-500">No missing keywords!</p>
                          }
                          {results.missedKeywords.length > 10 && (
                            <span className="text-xs text-gray-500">+{results.missedKeywords.length - 10} more</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-medium mb-2">Suggestions</h4>
                        <ul className="space-y-2">
                          {results.suggestions.map((suggestion, i) => (
                            <li key={i} className="flex items-start">
                              {results.score >= 70 ? (
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                              ) : (
                                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 shrink-0" />
                              )}
                              <span className="text-sm">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                      <FileText className="h-12 w-12 mb-4 opacity-50" />
                      <p>Paste your resume and job description, then click "Analyze Resume"</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>ATS Optimization Tips</CardTitle>
                  <CardDescription>Follow these tips to improve your resume's ATS compatibility</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <h4 className="font-medium">Use Job-Specific Keywords</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Incorporate relevant keywords from the job description that match your skills.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Choose Simple Formatting</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Avoid complex tables, headers/footers, and unique fonts that ATS may not parse correctly.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Use Standard Section Headers</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Use conventional section titles like "Work Experience" and "Education" rather than creative alternatives.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-medium">Save as Plain Text</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Submit your resume as a .docx or PDF file, avoid image formats or custom layouts.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSCalculator;
