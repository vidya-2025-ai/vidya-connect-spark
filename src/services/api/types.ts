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
  careerInterests?: string[];
  yearsOfExperience?: number;
  location?: string;
  availability?: string;
  profileCompleteness?: number;
  savedOpportunities?: string[] | Opportunity[];
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
  category?: string;
  experienceLevel?: string;
  applicationCount?: number;
  views?: number;
}

// Application Stats
export interface ApplicationStats {
  total: number;
  pending: number;
  underReview: number;
  shortlisted: number;
  interview: number;
  accepted: number;
  rejected: number;
}

// Application Types
export interface Application {
  _id: string;
  student: string | User;
  opportunity: string | Opportunity;
  status: 'Pending' | 'Under Review' | 'Shortlisted' | 'Interview' | 'Accepted' | 'Rejected';
  appliedDate: string | Date;
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
  activities: ApplicationActivity[];
  lastUpdated: string | Date;
  rating?: number;
  interviewDate?: string | Date;
  feedback?: string;
  skillMatch?: number;
}

export interface ApplicationActivity {
  type: string;
  description: string;
  date: string | Date;
}

// Pagination Response
export interface PaginatedResponse<T> {
  opportunities?: T[]; // For opportunities endpoint
  applications?: T[];  // For applications endpoint
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Event Types
export interface Event {
  _id: string;
  title: string;
  description?: string;
  startDate: string | Date;
  endDate: string | Date;
  location?: string;
  type: 'interview' | 'deadline' | 'reminder' | 'other';
  user: string | User;
  relatedOpportunity?: string | Opportunity;
  color?: string;
  isCompleted?: boolean;
  createdAt: string | Date;
}

// Resume Types
export interface Resume {
  _id: string;
  user: string | User;
  title: string;
  content: ResumeContent;
  isDefault: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  lastUpdated?: string | Date;
  personalInfo?: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
  projects?: Project[];
  certifications?: Certification[];
}

export interface ResumeContent {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: string[];
  projects?: Project[];
  certifications?: Certification[];
  summary?: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string | Date;
  endDate?: string | Date;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string | Date;
  expiry?: string | Date;
  credentialId?: string;
  link?: string;
}

// Certificate Types
export interface Certificate {
  _id: string;
  title: string;
  description: string;
  issuedTo: string | User;
  issuedBy: string;
  issueDate: string | Date;
  expiryDate?: string | Date;
  credentialId?: string;
  imageUrl?: string;
  verificationLink?: string;
  skills: string[];
  createdAt: string | Date;
}

// ATSParameter Types
export interface ATSParameter {
  _id: string;
  owner: string | User;
  title: string;
  keywords: string[];
  requiredSkills: string[];
  bonusSkills: string[];
  education: string[];
  experience: string[];
  active: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Skill Types
export interface Skill {
  _id: string;
  name: string;
  category: string;
  description?: string;
  icon?: string;
  popularity: number;
  createdAt: string | Date;
}

export interface UserSkill {
  skill: string | Skill;
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  yearsOfExperience?: number;
  endorsements?: number;
}

// Mentorship Types
export interface MentorshipRequest {
  _id: string;
  student: string | User;
  mentor: string | User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  topic: string;
  message?: string;
  schedule?: {
    preferredDays: string[];
    preferredTimes: string[];
  };
  createdAt: string | Date;
  updatedAt: string | Date;
}

// Community Types
export interface CommunityPost {
  _id: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  title: string;
  content: string;
  likes: number;
  comments: number | string[] | PostComment[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface PostComment {
  _id: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
  content: string;
  createdAt: string | Date;
}

// Grievance Types
export interface Grievance {
  _id: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
  };
  title: string;
  description: string;
  status: "open" | "under-review" | "resolved" | "closed";
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  category?: string;
  responses: GrievanceResponse[];
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface GrievanceResponse {
  _id: string;
  responder: {
    id: string;
    name: string;
    role: string;
  } | string | User;
  responderRole?: string;
  content: string;
  createdAt: string | Date;
}

// Challenge Types
export interface Challenge {
  _id: string;
  id?: string; // Added for frontend compatibility
  title: string;
  description: string;
  creator?: string | User;
  organization?: string; // Added for frontend compatibility
  organizationName?: string; // Added for frontend compatibility
  difficulty?: 'easy' | 'medium' | 'hard';
  skills?: string[];
  skillsRequired?: string[]; // Added for frontend compatibility
  instructions?: string;
  resources?: string[];
  deadline: string | Date;
  isActive: boolean;
  solutions?: string[] | ChallengeSolution[];
  submissionCount?: number; // Added for frontend compatibility
  createdAt: string | Date;
  updatedAt?: string | Date;
}

export interface ChallengeSolution {
  _id: string;
  id?: string; // Added for frontend compatibility
  challenge: string | Challenge;
  student: string | User | {
    id: string;
    name: string;
  };
  content: string;
  repositoryUrl?: string;
  demoUrl?: string;
  feedback?: string;
  score?: number;
  attachments?: string[]; // Added for frontend compatibility
  status?: 'submitted' | 'evaluated'; // Added for frontend compatibility
  submittedAt: string | Date;
  evaluatedAt?: string | Date;
}

// MicroInternship Types
export interface MicroInternship {
  _id: string;
  title: string;
  company: string | User;
  description: string;
  tasks: string[];
  skills: string[];
  duration: string;
  compensation?: {
    amount: number;
    currency: string;
  };
  deadline: string | Date;
  maxApplicants: number;
  currentApplicants: number;
  status: 'open' | 'in-progress' | 'completed';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface MicroInternshipApplication {
  _id: string;
  microInternship: string | MicroInternship;
  student: string | User;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  proposal?: string;
  submittedAt: string | Date;
  updatedAt: string | Date;
}
