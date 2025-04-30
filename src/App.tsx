
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { AuthProvider } from "./hooks/useAuth";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterOrg from "./pages/auth/RegisterOrg";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ExploreOpportunities from "./pages/student/ExploreOpportunities";
import ApplicationsTracker from "./pages/student/ApplicationsTracker";
import Certificates from "./pages/student/Certificates";
import Mentorship from "./pages/student/Mentorship";
import CalendarPage from "./pages/student/Calendar";
import Settings from "./pages/student/Settings";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterJobs from "./pages/recruiter/Jobs";
import RecruiterApplications from "./pages/recruiter/Applications";
import RecruiterCandidates from "./pages/recruiter/Candidates";
import RecruiterSchedule from "./pages/recruiter/Schedule";
import RecruiterSettings from "./pages/recruiter/Settings";
import CareerSkills from "./pages/student/CareerSkills";
import MicroInternships from "./pages/student/MicroInternships";
import CommunityHub from "./pages/student/CommunityHub";
import InternshipChallenges from "./pages/student/InternshipChallenges";
import GrievanceSystem from "./pages/student/GrievanceSystem";
import UniversityDashboard from "./pages/university/Dashboard";
import RecruiterTalentSearch from "./pages/recruiter/TalentSearch";
import RecruiterMentorship from "./pages/recruiter/Mentorship";
import RecruiterChallenges from "./pages/recruiter/Challenges";
import RecruiterGrievances from "./pages/recruiter/Grievances";
import RecruiterCommunity from "./pages/recruiter/Community";
import ATSCalculator from "./pages/student/ATSCalculator";
import ResumeBuilder from "./pages/student/ResumeBuilder";
import AssessmentStats from "./pages/recruiter/AssessmentStats";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen w-full">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register-org" element={<RegisterOrg />} />
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/explore" element={<ExploreOpportunities />} />
                <Route path="/student/applications" element={<ApplicationsTracker />} />
                <Route path="/student/certificates" element={<Certificates />} />
                <Route path="/student/mentorship" element={<Mentorship />} />
                <Route path="/student/calendar" element={<CalendarPage />} />
                <Route path="/student/settings" element={<Settings />} />
                <Route path="/student/career-skills" element={<CareerSkills />} />
                <Route path="/student/micro-internships" element={<MicroInternships />} />
                <Route path="/student/community" element={<CommunityHub />} />
                <Route path="/student/challenges" element={<InternshipChallenges />} />
                <Route path="/student/grievances" element={<GrievanceSystem />} />
                <Route path="/student/ats-calculator" element={<ATSCalculator />} />
                <Route path="/student/resume-builder" element={<ResumeBuilder />} />
                <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
                <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
                <Route path="/recruiter/applications" element={<RecruiterApplications />} />
                <Route path="/recruiter/candidates" element={<RecruiterCandidates />} />
                <Route path="/recruiter/schedule" element={<RecruiterSchedule />} />
                <Route path="/recruiter/talent-search" element={<RecruiterTalentSearch />} />
                <Route path="/recruiter/mentorship" element={<RecruiterMentorship />} />
                <Route path="/recruiter/challenges" element={<RecruiterChallenges />} />
                <Route path="/recruiter/grievances" element={<RecruiterGrievances />} />
                <Route path="/recruiter/community" element={<RecruiterCommunity />} />
                <Route path="/recruiter/settings" element={<RecruiterSettings />} />
                <Route path="/recruiter/assessment-stats" element={<AssessmentStats />} />
                <Route path="/university/dashboard" element={<UniversityDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
