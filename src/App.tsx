import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterOrg from "./pages/auth/RegisterOrg";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import ExploreOpportunities from "./pages/student/ExploreOpportunities";
import Applications from "./pages/student/Applications";
import ActivityTracker from "./pages/student/ActivityTracker";
import Certificates from "./pages/student/Certificates";
import Mentorship from "./pages/student/Mentorship";
import CalendarPage from "./pages/student/Calendar";
import Settings from "./pages/student/Settings";
import RecruiterDashboard from "./pages/recruiter/Dashboard";
import RecruiterJobs from "./pages/recruiter/Jobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-org" element={<RegisterOrg />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/explore" element={<ExploreOpportunities />} />
          <Route path="/student/applications" element={<Applications />} />
          <Route path="/student/tracker" element={<ActivityTracker />} />
          <Route path="/student/certificates" element={<Certificates />} />
          <Route path="/student/mentorship" element={<Mentorship />} />
          <Route path="/student/calendar" element={<CalendarPage />} />
          <Route path="/student/settings" element={<Settings />} />
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
