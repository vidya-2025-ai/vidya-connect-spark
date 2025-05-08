
import api from './index';

// Sample dashboard data for mock responses
const mockDashboardData = {
  activeJobs: 8,
  totalApplications: 156,
  interviewsScheduled: 12,
  hiringRate: 18.5, // percentage
  applicationsByMonth: [
    { month: 'Jan', count: 24 },
    { month: 'Feb', count: 32 },
    { month: 'Mar', count: 45 },
    { month: 'Apr', count: 30 },
    { month: 'May', count: 25 },
  ],
  topPositions: [
    { position: 'Software Developer', count: 42 },
    { position: 'Data Analyst', count: 38 },
    { position: 'UI/UX Designer', count: 27 },
    { position: 'Product Manager', count: 18 },
    { position: 'Marketing Intern', count: 31 },
  ],
  upcomingInterviews: [
    {
      id: 'int1',
      candidateName: 'Sarah Wilson',
      position: 'Frontend Developer',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      time: '10:00 AM',
      type: 'Technical'
    },
    {
      id: 'int2',
      candidateName: 'Michael Brown',
      position: 'Data Scientist',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      time: '2:30 PM',
      type: 'Final'
    }
  ],
  recentHires: [
    {
      id: 'hire1',
      name: 'David Kim',
      position: 'UX Designer',
      startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 'hire2',
      name: 'Jessica Martinez',
      position: 'Software Engineer',
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    }
  ]
};

const dashboardService = {
  getRecruiterDashboard: async (): Promise<any> => {
    try {
      const response = await api.get('/dashboard/recruiter');
      return response.data;
    } catch (error) {
      console.error('Error fetching recruiter dashboard:', error);
      console.warn('Returning mock dashboard data since backend is unavailable');
      return mockDashboardData;
    }
  },
  
  getStudentDashboard: async (): Promise<any> => {
    try {
      const response = await api.get('/dashboard/student');
      return response.data;
    } catch (error) {
      console.error('Error fetching student dashboard:', error);
      return {
        applicationsSent: 8,
        interviewsScheduled: 2,
        savedOpportunities: 12,
        completedInternships: 1,
        profileCompleteness: 75, // percentage
        recentActivity: []
      };
    }
  },
  
  getApplicationStats: async (): Promise<any> => {
    try {
      const response = await api.get('/dashboard/applications/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching application statistics:', error);
      return {
        totalApplications: 156,
        byStatus: {
          Pending: 45,
          'Under Review': 65,
          Shortlisted: 22,
          Interview: 12,
          Accepted: 8,
          Rejected: 4
        }
      };
    }
  }
};

export default dashboardService;
