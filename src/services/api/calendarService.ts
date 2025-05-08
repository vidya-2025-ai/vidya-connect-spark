
import api from './index';
import { Event } from './types';

// Mock events data
const mockEvents = [
  {
    _id: 'event1',
    id: 'event1',
    title: 'Technical Interview with Tech Solutions Inc',
    description: 'First round technical interview for the Frontend Developer position',
    startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000).toISOString(), // 2 days from now, 10 AM
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000).toISOString(), // 2 days from now, 11 AM
    isVirtual: true,
    meetingLink: 'https://meeting-link-1.example.com',
    participants: [],
    organizer: 'org1',
    type: 'Interview',
    status: 'Scheduled'
  },
  {
    _id: 'event2',
    id: 'event2',
    title: 'Resume Building Workshop',
    description: 'Learn how to create an ATS-friendly resume that stands out',
    startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000).toISOString(), // 5 days from now, 2 PM
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000).toISOString(), // 5 days from now, 4 PM
    location: 'Career Center, Room 302',
    isVirtual: false,
    participants: [],
    organizer: 'org2',
    type: 'Workshop',
    status: 'Scheduled'
  },
  {
    _id: 'event3',
    id: 'event3',
    title: 'Industry Insights: Tech Trends 2025',
    description: 'Webinar with industry experts discussing upcoming technology trends',
    startTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 18 * 60 * 60 * 1000).toISOString(), // 7 days from now, 6 PM
    endTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 19.5 * 60 * 60 * 1000).toISOString(), // 7 days from now, 7:30 PM
    isVirtual: true,
    meetingLink: 'https://webinar-link.example.com',
    participants: [],
    organizer: 'org3',
    type: 'Webinar',
    status: 'Scheduled'
  }
];

const calendarService = {
  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      const response = await api.get<Event[]>('/calendar/events/upcoming');
      return response.data;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      console.warn('Returning mock events data since backend is unavailable');
      return mockEvents as Event[];
    }
  },
  
  getEventById: async (id: string): Promise<Event> => {
    try {
      const response = await api.get<Event>(`/calendar/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching event by ID:', error);
      const mockEvent = mockEvents.find(event => event._id === id || event.id === id);
      if (mockEvent) {
        return mockEvent as Event;
      }
      throw error;
    }
  },
  
  createEvent: async (eventData: any): Promise<Event> => {
    try {
      const response = await api.post<Event>('/calendar/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  
  updateEvent: async (id: string, eventData: any): Promise<Event> => {
    try {
      const response = await api.put<Event>(`/calendar/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
  
  deleteEvent: async (id: string): Promise<{ message: string }> => {
    try {
      const response = await api.delete<{ message: string }>(`/calendar/events/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },
  
  getUserEvents: async (startDate?: string, endDate?: string): Promise<Event[]> => {
    try {
      const response = await api.get<Event[]>('/calendar/events/user', {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user events:', error);
      return [];
    }
  },
  
  respondToEvent: async (eventId: string, response: 'accept' | 'decline' | 'tentative'): Promise<{ message: string }> => {
    try {
      const apiResponse = await api.post<{ message: string }>(`/calendar/events/${eventId}/respond`, { response });
      return apiResponse.data;
    } catch (error) {
      console.error('Error responding to event:', error);
      throw error;
    }
  }
};

export default calendarService;
