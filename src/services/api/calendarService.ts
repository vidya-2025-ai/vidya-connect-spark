
import api from './index';
import { Event } from './types';

export const calendarService = {
  getAllEvents: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/calendar');
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
    const response = await api.delete<void>(`/calendar/${id}`);
    return response.data;
  }
};

export default calendarService;
