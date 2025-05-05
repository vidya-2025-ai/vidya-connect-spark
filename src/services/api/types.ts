
// Add these interfaces to the existing types.ts file if they don't exist already

export interface PaginatedResponse<T> {
  data?: T[];
  events?: T[];
  posts?: T[];
  grievances?: T[];
  challenges?: T[];
  mentorships?: T[];
  mentors?: T[];
  applications?: T[];
  opportunities?: T[];
  totalCount?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
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

export interface User {
  id: string;
  _id?: string; // Adding both for compatibility
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
  skills?: string[];
  bio?: string;
  avatar?: string;
  // Additional properties needed by components
  profileCompleteness?: number;
  yearsOfExperience?: number;
  availability?: string;
  education?: {
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
  }[];
  experience?: {
    company: string;
    position: string;
    duration: string;
    description?: string;
  }[];
  location?: string;
}

export interface Application {
  id: string;
  _id?: string; // Adding both for compatibility
  opportunity: {
    id: string;
    title: string;
    organization?: {
      id?: string;
      organization?: string;
      name?: string;
    };
  } | string;
  student: User;
  status: string;
  appliedDate: string;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
  interviewDate?: string;
  activities?: {
    id: string;
    _id?: string;
    type: string;
    date: string;
    description: string;
  }[];
}

export interface Event {
  id: string;
  _id?: string; // Adding both for compatibility
  title: string;
  date: string;
  time?: string;
  startDate?: string; // Adding both date formats for compatibility
  endDate?: string;
  type: 'Interview' | 'Deadline' | 'Event' | 'Meeting' | 'Other';
  description?: string;
  location?: string;
  isCompleted: boolean;
  relatedTo?: string;
  onModel?: string;
  createdAt: string;
}

export interface CommunityPost {
  id: string;
  _id?: string; // Adding both for compatibility
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  likes: number;
  comments: number | PostComment[]; // Allow both number and array types
  createdAt: string;
  replies?: PostComment[];
}

export interface PostComment {
  id: string;
  _id?: string; // Adding both for compatibility
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
  _id?: string; // Adding both for compatibility
  title: string;
  description: string;
  status: 'pending' | 'resolved' | 'closed' | 'open' | 'under-review'; // Expanded to include all statuses
  category?: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  responses: GrievanceResponse[];
  createdAt: string;
}

export interface GrievanceResponse {
  id: string;
  _id?: string; // Adding both for compatibility
  content: string;
  responder: {
    id: string;
    name: string;
    role: string;
  };
  createdAt: string;
}

export interface Challenge {
  id: string;
  _id?: string; // Adding both for compatibility
  title: string;
  description: string;
  organization: string;
  organizationName?: string; // Alias for organization in some components
  skillsRequired: string[];
  skills?: string[]; // Alias for skillsRequired in some components
  deadline: string;
  submissionCount: number;
  isActive: boolean;
  createdAt: string;
}

export interface ChallengeSolution {
  id: string;
  _id?: string; // Adding both for compatibility
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
  repositoryUrl?: string;
}

export interface MentorshipRequest {
  id: string;
  _id?: string; // Adding both for compatibility
  mentor: User;
  student: User;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  topic?: string;
  createdAt: string;
}

export interface Opportunity {
  id: string;
  _id?: string;
  title: string;
  organization: {
    id?: string;
    organization?: string;
    name?: string;
  } | string;
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

export interface Resume {
  id: string;
  _id?: string;
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
  updatedAt?: string; // Alias for lastUpdated
  content?: any; // For content fields in ResumeBuilder
}

export interface Certificate {
  id: string;
  _id?: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  certificateImage?: string;
  skills: string[];
  status: 'In Progress' | 'Completed';
  issuedBy?: string; // Alias for issuer
  verificationLink?: string; // For certificate verification
}

export interface ATSParameter {
  id: string;
  _id?: string;
  title: string;
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

export interface ApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  shortlisted: number;
  interview: number;
  accepted: number;
  rejected: number;
}
