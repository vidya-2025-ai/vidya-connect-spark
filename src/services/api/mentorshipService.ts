
import api from './index';
import { MentorshipRequest } from './types';

export const mentorshipService = {
  getAllMentorships: async (): Promise<MentorshipRequest[]> => {
    const response = await api.get<MentorshipRequest[]>('/mentorship');
    return response.data;
  },
  
  getMyMentorships: async (): Promise<MentorshipRequest[]> => {
    const response = await api.get<MentorshipRequest[]>('/mentorship/my');
    return response.data;
  },
  
  createMentorshipRequest: async (mentorshipData: any): Promise<MentorshipRequest> => {
    const response = await api.post<MentorshipRequest>('/mentorship/request', mentorshipData);
    return response.data;
  },
  
  updateMentorshipStatus: async (id: string, status: string): Promise<MentorshipRequest> => {
    const response = await api.put<MentorshipRequest>(`/mentorship/${id}/status`, { status });
    return response.data;
  }
};

export default mentorshipService;
