
import api from './index';
import { Certificate } from './types';

export const certificateService = {
  getAllCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get<Certificate[]>('/certificates');
    return response.data;
  },
  
  createCertificate: async (certificateData: any): Promise<Certificate> => {
    const response = await api.post<Certificate>('/certificates', certificateData);
    return response.data;
  },
  
  getCertificateById: async (id: string): Promise<Certificate> => {
    const response = await api.get<Certificate>(`/certificates/${id}`);
    return response.data;
  },
  
  updateCertificate: async (id: string, certificateData: any): Promise<Certificate> => {
    const response = await api.put<Certificate>(`/certificates/${id}`, certificateData);
    return response.data;
  }
};

export default certificateService;
