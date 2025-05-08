
import api from './index';

interface ATSAnalysisInput {
  resumeText: string;
  jobDescription: string;
}

interface ATSAnalysisResult {
  score: number; // 0-100
  missingKeywords?: string[];
  recommendations: string[];
  keywordMatches?: Record<string, number>;
  sectionsDetected?: string[];
  formattingIssues?: string[];
}

// Mock ATS analysis result
const mockAnalysisResult: ATSAnalysisResult = {
  score: 74,
  missingKeywords: ['Docker', 'AWS', 'Unit Testing', 'UI/UX'],
  recommendations: [
    'Add missing keywords like Docker and AWS if you have those skills',
    'Include more quantifiable achievements in your experience section',
    'Make sure your contact information is clearly visible at the top',
    'Use standard section headings for better parsing',
    'Consider adding a skills summary section'
  ],
  keywordMatches: {
    'React': 3,
    'JavaScript': 5,
    'TypeScript': 2,
    'CSS': 2
  },
  sectionsDetected: [
    'Contact Information',
    'Education',
    'Experience',
    'Skills'
  ],
  formattingIssues: [
    'Avoid using tables for layout',
    'Some text may be in image format which ATS cannot read'
  ]
};

const atsService = {
  analyzeResume: async (input: ATSAnalysisInput): Promise<ATSAnalysisResult> => {
    try {
      const response = await api.post<ATSAnalysisResult>('/ats/analyze', input);
      return response.data;
    } catch (error) {
      console.error('Error analyzing resume with ATS:', error);
      console.warn('Returning mock ATS analysis result since backend is unavailable');
      return mockAnalysisResult;
    }
  },
  
  getATSParameters: async (): Promise<any[]> => {
    try {
      const response = await api.get('/ats/parameters');
      return response.data;
    } catch (error) {
      console.error('Error fetching ATS parameters:', error);
      return [
        { id: 'param1', name: 'Keyword Matching', weight: 30, description: 'Matching job-specific keywords' },
        { id: 'param2', name: 'Formatting', weight: 25, description: 'Resume formatting and readability' },
        { id: 'param3', name: 'Education Match', weight: 15, description: 'Matching required education' },
        { id: 'param4', name: 'Experience Match', weight: 30, description: 'Matching required experience' }
      ];
    }
  },
  
  saveResumeAnalysis: async (analysis: ATSAnalysisResult): Promise<{ message: string }> => {
    try {
      const response = await api.post('/ats/save-analysis', analysis);
      return response.data;
    } catch (error) {
      console.error('Error saving resume analysis:', error);
      throw error;
    }
  },
  
  improveResume: async (resumeText: string, jobDescription: string): Promise<{ 
    improvedResumeText: string;
    improvements: string[];
  }> => {
    try {
      const response = await api.post('/ats/improve-resume', { resumeText, jobDescription });
      return response.data;
    } catch (error) {
      console.error('Error getting resume improvements:', error);
      throw error;
    }
  }
};

export default atsService;
