
// Add these interfaces to the existing types.ts file if they don't exist already

export interface PaginatedResponse<T> {
  data?: T[];
  events?: T[];
  posts?: T[];
  grievances?: T[];
  challenges?: T[];
  mentorships?: T[];
  mentors?: T[];
  totalCount?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
}

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

export interface Event {
  id: string;
  title: string;
  date: string;
  time?: string;
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
  category?: string;
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
  isActive: boolean;
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

export interface MentorshipRequest {
  id: string;
  mentor: User;
  student: User;
  status: 'pending' | 'accepted' | 'rejected';
  message: string;
  topic?: string;
  createdAt: string;
}

export interface Application {
  id: string;
  opportunity: {
    id: string;
    title: string;
  };
  student: User;
  status: string;
  appliedDate: string;
}
