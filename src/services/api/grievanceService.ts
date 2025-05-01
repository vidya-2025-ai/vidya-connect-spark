
import api from './index';
import { Grievance } from './types';

export const grievanceService = {
  getGrievances: async (): Promise<Grievance[]> => {
    const response = await api.get<Grievance[]>('/grievances');
    return response.data;
  },
  
  fileGrievance: async (grievanceData: { title: string, description: string }): Promise<Grievance> => {
    const response = await api.post<Grievance>('/grievances', grievanceData);
    return response.data;
  },
  
  respondToGrievance: async (id: string, responseData: { content: string }): Promise<any> => {
    const response = await api.put<any>(`/grievances/${id}/response`, responseData);
    return response.data;
  },
  
  closeGrievance: async (id: string): Promise<any> => {
    const response = await api.put<any>(`/grievances/${id}/close`);
    return response.data;
  }
};

export default grievanceService;
