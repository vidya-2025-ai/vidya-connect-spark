
// User Types
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
  education?: Education[];
  experience?: Experience[];
  socialLinks?: SocialLinks;
  preferences?: UserPreferences;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: Date | string;
  endDate?: Date | string;
  current: boolean;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: Date | string;
  endDate?: Date | string;
  current: boolean;
  description?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  applicationUpdates: boolean;
  marketingEmails: boolean;
}

// Authentication Types
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'student' | 'recruiter';
  organization?: string;
  jobTitle?: string;
}

// Opportunity Types
export interface Opportunity {
  _id: string;
  title: string;
  organization: {
    _id: string;
    firstName: string;
    lastName: string;
    organization: string;
  };
  description: string;
  requirements?: string[];
  location?: string;
  type: string;
  duration: string;
  stipend?: {
    amount: number;
    currency: string;
  };
  deadline?: string | Date;
  skillsRequired?: string[];
  tags?: string[];
  isActive: boolean;
  applications?: string[];
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Application Types
export interface Application {
  _id: string;
  student: string | User;
  opportunity: string | Opportunity;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  appliedDate: string | Date;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
  activities: ApplicationActivity[];
  lastUpdated: string | Date;
}

export interface ApplicationActivity {
  type: string;
  description: string;
  date: string | Date;
}
