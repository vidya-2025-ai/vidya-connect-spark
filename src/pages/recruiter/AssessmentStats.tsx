
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import RecruiterSidebar from '@/components/dashboard/RecruiterSidebar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import skillAssessmentService from '@/services/api/skillAssessmentService';
import { useToast } from '@/hooks/use-toast';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d', '#ffc658'];

const AssessmentStats = () => {
  const { toast } = useToast();
  const [timeRange, setTimeRange] = useState('all');
  
  const { data: assessmentStats, isLoading, isError } = useQuery({
    queryKey: ['assessmentStats', timeRange],
    queryFn: skillAssessmentService.getAssessmentStatistics,
    meta: {
      onSettled: (data, error) => {
        if (error) {
          toast({
            title: "Error",
            description: "Failed to load assessment statistics",
            variant: "destructive"
          });
        }
      }
    }
  });

  // Format data for charts
  const topSkillsData = assessmentStats?.topSkills?.map(skill => ({
    name: skill.name,
    count: skill.userCount,
    score: Math.round(skill.averageScore * 20) // Convert to percentage (assuming level is 1-5)
  })) || [];

  const skillCategoryData = assessmentStats?.skillsByCategory?.map(category => ({
    name: category.category || 'Uncategorized',
    value: category.count
  })) || [];

  const assessmentScoreData = assessmentStats?.assessmentScores?.map(score => ({
    name: `${score.score}`,
    count: score.count
  })) || [];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
      <RecruiterSidebar />
      <div className="flex flex-col flex-1 overflow-auto">
        <div className="px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Assessment Analytics</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Insights on candidate skills, assessments, and talent pool trends
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Select
                value={timeRange}
                onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="month">Last Month</SelectItem>
                  <SelectItem value="quarter">Last Quarter</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">Export Report</Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 dark:text-gray-400">Loading assessment data...</p>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center flex-col h-64">
              <p className="text-red-500 mb-4">Failed to load assessment statistics</p>
              <Button variant="outline">Try Again</Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Top Skills Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Top Skills in Candidate Pool</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={topSkillsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="count" name="Number of Candidates" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="score" name="Average Score (%)" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Distribution Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Skill Categories Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={skillCategoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {skillCategoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name) => [`${value} skills`, name]} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Assessment Scores Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={assessmentScoreData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" label={{ value: 'Score Level', position: 'insideBottom', offset: -5 }} />
                          <YAxis label={{ value: 'Number of Assessments', angle: -90, position: 'insideLeft' }} />
                          <Tooltip />
                          <Bar dataKey="count" fill="#8884d8">
                            {assessmentScoreData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skill Gap Analysis */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Skills In Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Most Popular Skills</h3>
                      <ul className="space-y-2">
                        {topSkillsData.slice(0, 5).map((skill, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                            <span className="text-gray-500 dark:text-gray-400">{skill.count} candidates</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Highest Scoring Skills</h3>
                      <ul className="space-y-2">
                        {[...topSkillsData]
                          .sort((a, b) => b.score - a.score)
                          .slice(0, 5)
                          .map((skill, index) => (
                            <li key={index} className="flex items-center justify-between">
                              <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                              <span className="text-gray-500 dark:text-gray-400">{skill.score}% avg. score</span>
                            </li>
                          ))
                        }
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900 dark:text-white">Skill Gap Opportunities</h3>
                      <ul className="space-y-2">
                        {/* This would ideally be real data about skills in high demand but low supply */}
                        <li className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">TensorFlow</span>
                          <span className="text-red-500">High demand</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">AWS Cloud</span>
                          <span className="text-red-500">High demand</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Vue.js</span>
                          <span className="text-red-500">High demand</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">Flutter</span>
                          <span className="text-red-500">High demand</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-gray-700 dark:text-gray-300">GraphQL</span>
                          <span className="text-red-500">High demand</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssessmentStats;
