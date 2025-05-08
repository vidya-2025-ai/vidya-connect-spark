
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/dashboard/StudentDashboard';
import ExploreOpportunities from './pages/student/ExploreOpportunities';
import OpportunityDetail from './pages/student/OpportunityDetail';
import ATSCalculator from './pages/student/ATSCalculator';
import MicroInternships from './pages/student/MicroInternships';
import Settings from './pages/student/Settings';
import RecruiterDashboard from './pages/recruiter/Dashboard';
import Applications from './pages/recruiter/Applications';
import AssessmentStats from './pages/recruiter/AssessmentStats';
import Candidates from './pages/recruiter/Candidates';
import Challenges from './pages/recruiter/Challenges';
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from '@/hooks/useAuth';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Home and Auth Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Student Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/explore-opportunities" element={<ExploreOpportunities />} />
          <Route path="/student/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/student/ats-calculator" element={<ATSCalculator />} />
          <Route path="/student/micro-internships" element={<MicroInternships />} />
          <Route path="/student/settings" element={<Settings />} />
          
          {/* Recruiter Routes */}
          <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
          <Route path="/recruiter/applications" element={<Applications />} />
          <Route path="/recruiter/assessment-stats" element={<AssessmentStats />} />
          <Route path="/recruiter/candidates" element={<Candidates />} />
          <Route path="/recruiter/challenges" element={<Challenges />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;
