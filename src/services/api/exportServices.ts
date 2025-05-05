
// Export all services from a single file for convenience
import authService from './authService';
import applicationService from './applicationService';
import opportunityService from './opportunityService';
import certificateService from './certificateService';
import calendarService from './calendarService';
import skillService from './skillService';
import resumeService from './resumeService';
import atsService from './atsService';
import mentorshipService from './mentorshipService';
import communityService from './communityService';
import grievanceService from './grievanceService';
import challengeService from './challengeService';
import microInternshipService from './microInternshipService';
import userService from './userService';
import dashboardService from './dashboardService';
import skillAssessmentService from './skillAssessmentService';

// Also export all types
import {
  User,
  Application,
  Event,
  CommunityPost,
  PostComment,
  Grievance,
  GrievanceResponse,
  Challenge,
  ChallengeSolution,
  MentorshipRequest,
  PaginatedResponse,
  Resume,
  Certificate,
  ATSParameter,
  Opportunity
} from './types';

export {
  // Services
  authService,
  applicationService,
  opportunityService,
  certificateService,
  calendarService,
  skillService,
  resumeService,
  atsService,
  mentorshipService,
  communityService,
  grievanceService,
  challengeService,
  microInternshipService,
  userService,
  dashboardService,
  skillAssessmentService,
  
  // Types
  User,
  Application,
  Event,
  CommunityPost,
  PostComment,
  Grievance,
  GrievanceResponse,
  Challenge,
  ChallengeSolution,
  MentorshipRequest,
  PaginatedResponse,
  Resume,
  Certificate,
  ATSParameter,
  Opportunity
};
