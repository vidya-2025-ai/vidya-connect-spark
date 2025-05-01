
import api from './index';
import { Skill, UserSkill } from './types';

export const skillService = {
  getAllSkills: async (): Promise<Skill[]> => {
    const response = await api.get<Skill[]>('/skills/all');
    return response.data;
  },
  
  getUserSkills: async (): Promise<UserSkill[]> => {
    const response = await api.get<UserSkill[]>('/skills/user');
    return response.data;
  },
  
  addUserSkill: async (skillData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>('/skills/user', skillData);
    return response.data;
  },
  
  addSkillAssessment: async (skillId: string, assessmentData: any): Promise<UserSkill> => {
    const response = await api.post<UserSkill>(`/skills/user/${skillId}/assessment`, assessmentData);
    return response.data;
  }
};

export default skillService;
