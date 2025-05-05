
import api from './index';
import { Grievance, PaginatedResponse } from './types';

export interface GrievanceFilters {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface GrievanceStatistics {
  totalGrievances: number;
  pendingGrievances: number;
  resolvedGrievances: number;
  closedGrievances: number;
  responseTime: {
    average: number;
    min: number;
    max: number;
  };
  categoryCounts: {
    category: string;
    count: number;
  }[];
}

export const grievanceService = {
  getGrievances: async (filters: GrievanceFilters = {}): Promise<Grievance[]> => {
    const response = await api.get<PaginatedResponse<Grievance>>('/grievances', { 
      params: filters 
    });
    return response.data.grievances || [];
  },
  
  getGrievanceById: async (id: string): Promise<Grievance> => {
    const response = await api.get<Grievance>(`/grievances/${id}`);
    return response.data;
  },
  
  fileGrievance: async (grievanceData: { title: string, description: string, category?: string }): Promise<Grievance> => {
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
  },
  
  reopenGrievance: async (id: string): Promise<any> => {
    const response = await api.put<any>(`/grievances/${id}/reopen`);
    return response.data;
  },
  
  getGrievanceStatistics: async (): Promise<GrievanceStatistics> => {
    const response = await api.get<GrievanceStatistics>('/grievances/statistics');
    return response.data;
  }
};

export default grievanceService;
