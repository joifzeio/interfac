import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { EventsProvider } from './contexts/EventsContext';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
// import LegalPage from './pages/LegalPage'; // Kept for reference if needed, or remove.
import MentionsLegales from './pages/MentionsLegales';
import CGV from './pages/CGV';
import Confidentialite from './pages/Confidentialite';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppContent = () => {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/cgv" element={<CGV />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </TooltipProvider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <EventsProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </EventsProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

export default App;