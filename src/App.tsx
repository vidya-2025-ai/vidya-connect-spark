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
import { Toaster } from "@/components/ui/toaster";
import './App.css';

// Import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/explore-opportunities" element={<ExploreOpportunities />} />
        <Route path="/student/opportunities/:id" element={<OpportunityDetail />} />
        <Route path="/student/ats-calculator" element={<ATSCalculator />} />
        
        {/* Add more routes as needed */}
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
