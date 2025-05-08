
export interface User {
  id: string;
  _id?: string;
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
  socialLinks?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    portfolio?: string;
  };
  preferences?: {
    emailNotifications?: boolean;
    applicationUpdates?: boolean;
    marketingEmails?: boolean;
  };
  createdAt?: string;
  lastActive?: string;
  careerInterests?: string[];
  yearsOfExperience?: number;
  location?: string;
  availability?: 'Immediate' | '2 Weeks' | 'Month' | 'Negotiable';
  profileCompleteness?: number;
  savedOpportunities?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Opportunity {
  id: string;
  _id?: string;
  title: string;
  description: string;
  organization: string;
  type: 'Internship' | 'Research' | 'Volunteer' | 'Part-time' | 'Full-time';
  duration: string;
  location: string;
  skillsRequired: string[];
  deadline: string;
  stipend?: {
    amount: number;
    currency: string;
  };
  createdAt: string;
  isActive: boolean;
  requirements: string[];
  tags: string[];
}

export interface Application {
  _id: string;
  id?: string;
  student: User | string;
  opportunity: Opportunity | string;
  status: string;
  appliedDate: Date | string;
  lastUpdated: Date | string;
  notes?: string;
  resumeUrl?: string;
  coverLetter?: string;
  feedback?: string;
  interviewDate?: Date | string;
  interviewTime?: string;
  interviewLocation?: string;
}

export interface ApplicationStats {
  total: number;
  byStatus: Record<string, number>;
  byDate: Array<{
    date: string;
    count: number;
  }>;
}

export interface Resume {
  _id: string;
  id: string;
  title: string;
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    linkedin?: string;
    website?: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
    location?: string;
    achievements?: string[];
  }>;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    achievements?: string[];
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    startDate?: string;
    endDate?: string;
    url?: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }>;
  lastUpdated: string;
}

export interface Certificate {
  _id: string;
  id: string;
  title: string;
  issuedBy: string;
  issuedTo: User | string;
  issuedDate: Date | string;
  expiryDate?: Date | string;
  credentialId: string;
  credentialURL?: string;
  skills: string[];
  description?: string;
  verified: boolean;
}

export interface Event {
  _id: string;
  id: string;
  title: string;
  description: string;
  startTime: Date | string;
  endTime: Date | string;
  location?: string;
  isVirtual: boolean;
  meetingLink?: string;
  participants: Array<User | string>;
  organizer: User | string;
  type: 'Interview' | 'Workshop' | 'Webinar' | 'Other';
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'Postponed';
}

export interface ATSParameter {
  _id: string;
  id: string;
  name: string;
  description: string;
  weight: number;
  category: string;
  active: boolean;
}

export interface Skill {
  _id: string;
  id: string;
  name: string;
  category: string;
  description?: string;
  level?: number;
}

export interface UserSkill {
  _id: string;
  id: string;
  userId: string;
  skillId: string;
  level: number;
  verificationStatus: 'Unverified' | 'Self-Verified' | 'Peer-Verified' | 'Expert-Verified';
  endorsements: number;
}

export interface MentorshipRequest {
  _id: string;
  id: string;
  mentee: User | string;
  mentor: User | string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  createdAt: Date | string;
  message?: string;
  goals?: string[];
  duration?: string;
  meetingFrequency?: string;
}

export interface CommunityPost {
  _id: string;
  id: string;
  title: string;
  content: string;
  author: User | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  likes: number;
  comments: PostComment[];
  tags: string[];
  category: string;
}

export interface PostComment {
  _id: string;
  id: string;
  content: string;
  author: User | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  likes: number;
  parentComment?: string;
}

export interface Grievance {
  _id: string;
  id: string;
  title: string;
  description: string;
  submittedBy: User | string;
  submittedAgainst?: User | string | Opportunity | string;
  status: 'Open' | 'Under Investigation' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  submittedDate: Date | string;
  resolvedDate?: Date | string;
  responses: GrievanceResponse[];
  category: string;
}

export interface GrievanceResponse {
  _id: string;
  id: string;
  content: string;
  responder: User | string;
  responseDate: Date | string;
  attachments?: string[];
}

export interface Challenge {
  _id: string;
  id: string;
  title: string;
  description: string;
  createdBy: User | string;
  startDate: Date | string;
  endDate: Date | string;
  status: 'Draft' | 'Active' | 'Completed' | 'Cancelled';
  participants: Array<User | string>;
  requirements: string[];
  resources: Array<{
    name: string;
    url: string;
    type: string;
  }>;
  evaluation: Array<{
    criteria: string;
    weight: number;
  }>;
  prizes: Array<{
    position: number;
    description: string;
  }>;
}

export interface ChallengeSolution {
  _id: string;
  id: string;
  challenge: Challenge | string;
  submittedBy: User | string;
  submissionDate: Date | string;
  content: string;
  attachments: string[];
  score?: number;
  feedback?: string;
  status: 'Submitted' | 'Under Review' | 'Evaluated';
}

export interface MicroInternship {
  _id?: string;
  id: string;
  title: string;
  description: string;
  company: string;
  category: string;
  skills: string[];
  duration: number; // hours
  deadline: string;
  applicants?: number;
  status: 'active' | 'completed' | 'draft';
  remote: boolean;
  compensation: number;
  appliedDate?: string; // Used for displaying when a user applied
}

export interface MicroInternshipApplication {
  _id?: string;
  id: string;
  microInternship: MicroInternship | string;
  applicant: User | string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  appliedDate: string;
  coverLetter?: string;
  resumeUrl?: string;
  feedback?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  opportunities?: T[]; // Alternative response format
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
