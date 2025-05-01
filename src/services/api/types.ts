
// API response types

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
}

export interface Application {
  id: string;
  opportunity: Opportunity;
  student: User;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  description: string;
  requirements: string[];
  location?: string;
  type: 'Internship' | 'Research' | 'Volunteer' | 'Part-time' | 'Full-time';
  duration: string;
  stipend?: {
    amount: number;
    currency: string;
  };
  deadline?: string;
  skillsRequired: string[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  skills: string[];
  status: 'In Progress' | 'Completed';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
  type: 'Interview' | 'Deadline' | 'Event' | 'Meeting' | 'Other';
  description?: string;
  location?: string;
  isCompleted: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  description?: string;
  level?: number;
}

export interface UserSkill {
  id: string;
  skill: Skill;
  level: number;
  assessments: {
    score: number;
    date: string;
    certificate?: Certificate;
  }[];
}

export interface Resume {
  id: string;
  title: string;
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  education: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
    description?: string;
  }[];
  experience: {
    company: string;
    position: string;
    location?: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
  }[];
  skills: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate: string;
    endDate?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    id?: string;
  }[];
  atsScore?: number;
  lastUpdated: string;
}

export interface ATSParameter {
  id: string;
  name: string;
  requiredSkills: {
    skill: string;
    weight: number;
  }[];
  requiredExperience: number;
  requiredEducation?: string;
  keywords: {
    keyword: string;
    weight: number;
  }[];
  formatRequirements: {
    preferredLength?: number;
    requiresContactInfo: boolean;
    requiresEducation: boolean;
  };
  active: boolean;
  createdAt: string;
}

export interface MentorshipRequest {
  id: string;
  mentor: User;
  student: User;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  likes: number;
  comments: number;
  createdAt: string;
}

export interface PostComment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

export interface Grievance {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'closed';
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  responses: {
    id: string;
    content: string;
    responder: {
      id: string;
      name: string;
      role: string;
    };
    createdAt: string;
  }[];
  createdAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  organization: string;
  skillsRequired: string[];
  deadline: string;
  submissionCount: number;
  createdAt: string;
}

export interface ChallengeSolution {
  id: string;
  challenge: string;
  student: {
    id: string;
    name: string;
  };
  content: string;
  attachments: string[];
  score?: number;
  feedback?: string;
  status: 'submitted' | 'evaluated';
  submittedAt: string;
}

export interface MicroInternship {
  id: string;
  title: string;
  description: string;
  organization: string;
  duration: string;
  skillsRequired: string[];
  stipend: {
    amount: number;
    currency: string;
  };
  deadline: string;
  applicants: number;
  createdAt: string;
}

export interface MicroInternshipApplication {
  id: string;
  internshipId: string;
  student: {
    id: string;
    name: string;
  };
  status: 'pending' | 'accepted' | 'rejected' | 'shortlisted';
  appliedAt: string;
}
