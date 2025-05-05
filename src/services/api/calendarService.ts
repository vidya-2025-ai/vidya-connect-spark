
import api from './index';
import { Event, PaginatedResponse } from './types';

export interface EventFilters {
  type?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface EventStatistics {
  totalEvents: number;
  upcomingEvents: number;
  eventsByType: {
    type: string;
    count: number;
  }[];
  eventsByMonth: {
    month: string;
    count: number;
  }[];
}

export const calendarService = {
  getAllEvents: async (filters: EventFilters = {}): Promise<Event[]> => {
    const response = await api.get<PaginatedResponse<Event>>('/calendar', { 
      params: filters 
    });
    return response.data.events || [];
  },
  
  getEventById: async (id: string): Promise<Event> => {
    const response = await api.get<Event>(`/calendar/${id}`);
    return response.data;
  },
  
  createEvent: async (eventData: any): Promise<Event> => {
    const response = await api.post<Event>('/calendar', eventData);
    return response.data;
  },
  
  updateEvent: async (id: string, eventData: any): Promise<Event> => {
    const response = await api.put<Event>(`/calendar/${id}`, eventData);
    return response.data;
  },
  
  deleteEvent: async (id: string): Promise<void> => {
    await api.delete<void>(`/calendar/${id}`);
  },
  
  getEventStatistics: async (): Promise<EventStatistics> => {
    const response = await api.get<EventStatistics>('/calendar/statistics');
    return response.data;
  },
  
  getRecentEvents: async (limit: number = 5): Promise<Event[]> => {
    const response = await api.get<Event[]>('/calendar/recent', { 
      params: { limit } 
    });
    return response.data;
  }
};

export default calendarService;
