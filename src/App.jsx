// src/App.jsx
import './index.css';
import React, { useEffect } from 'react';
import {
  SessionContextProvider,
  useSession,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import { supabase } from './lib/supabaseClient';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import PageTransition from './components/PageTransition';
import AdminLayout from './components/AdminLayout';
import { Toaster } from 'react-hot-toast';
import { LoadingProvider } from "./context/LoadingContext";

// Navigation & Footer
import HackHereNav from './components/HackHereNav';
import HackHereFooter from './components/ui/HackHereFooter';

// Core Architecture Pages
import HomePage from './pages/HomePage';
import VisionPage from './pages/VisionPage';
import ProgramsPage from './pages/ProgramsPage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import CommunityPage from './pages/CommunityPage';
import GetStartedPage from './pages/GetStartedPage';
import ProjectShowcasePage from './pages/ProjectShowcasePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import TeamPage from './pages/TeamPage';
import CollaboratePage from './pages/CollaboratePage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

// Auth & User Platform
import AuthForm from './components/AuthForm';
import UserDashboard from './pages/user/UserDashboard';
import UserProfile from './pages/user/UserProfile';
import PublicProfile from './pages/PublicProfile';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordConfirm from './pages/ResetPasswordConfirm';
import UserPlayGround from './pages/user/UserPlayGround';
import UserCodingPlatform from './pages/user/UserCodingPlatform';
import ResumeAnalyzer from './components/ResumeAnalyzer';
import UserResource from './pages/user/UserResource';
import UserResumeBuilder from './pages/user/UserResumeBuilder';
import UserFormView from './pages/user/UserFormView';
import UserMeetupsList from './pages/user/UserMeetupsList';
import PublicMeetupPage from './pages/PublicMeetupPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetail from './pages/user/BlogDetail';

// Admin Pages & Protection
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import Dashboard from './pages/admin/Dashboard';
import AdminSystemHealthPage from './pages/admin/AdminSystemHealthPage';
import AllUserList from './pages/admin/AllUserList';
import AdminUserDetailPage from './pages/admin/AdminUserDetailPage';
import AdminRegistrationsManager from './pages/admin/AdminRegistrationsManager';
import AdminAuditLogsPage from './pages/admin/AdminAuditLogsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import AdminScannerMeetup from './pages/admin/AdminScannerMeetup';
import AdminMeetupList from './pages/admin/AdminMeetupList';
import AdminMeetup from './pages/admin/AdminMeetup';
import AdminMeetupEdit from './pages/admin/AdminMeetupEdit';
import AdminMeetupRegistrations from './pages/admin/AdminMeetupRegistrations';
import AdminProgramsList from './pages/admin/AdminProgramsList';
import AdminProgramSubmissions from './pages/admin/AdminProgramSubmissions';
import AdminMentorshipPrograms from './pages/admin/AdminMentorshipPrograms';
import AdminMentorshipManager from './pages/admin/AdminMentorshipManager';
import AdminMentorshipProgramEditor from './pages/admin/AdminMentorshipProgramEditor';
import AdminWeekEditor from './pages/admin/AdminWeekEditor';
import AdminWeekSubmissions from './pages/admin/AdminWeekSubmissions';
import AdminGeneralMentorshipRequests from './pages/admin/AdminGeneralMentorshipRequests';
import AdminAllProgramRegistrations from './pages/admin/AdminAllProgramRegistrations';
import AdminBlogList from './pages/admin/AdminBlogList';
import AdminBlogEditor from './pages/admin/AdminBlogEditor';
import AdminBlogEmailer from './pages/admin/AdminBlogEmailer';
import AdminHallOfFame from './pages/admin/AdminHallOfFame';
import AdminCommunityPhotos from './pages/admin/AdminCommunityPhotos';
import AdminFeedbackList from './pages/admin/AdminFeedbackList';
import AdminFormBuilder from './pages/admin/AdminFormBuilder';
import NotFoundPage from './components/ui/NotFoundPage';

const AnimatedAppRoutes = () => {
  const location = useLocation();
  const session = useSession();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-[#F4FAFB] text-[#080B10]">
      {!isAdminRoute && <HackHereNav />}

      <main className={`flex-grow ${!isAdminRoute ? 'pt-[73px]' : ''}`}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* PRIMARY ARCHITECTURE ROUTES */}
            <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/home" element={<PageTransition><HomePage /></PageTransition>} />
            <Route path="/vision" element={<PageTransition><VisionPage /></PageTransition>} />
            <Route path="/program" element={<PageTransition><ProgramsPage /></PageTransition>} />
            <Route path="/programs" element={<PageTransition><ProgramsPage /></PageTransition>} />
            <Route path="/programs/:id" element={<PageTransition><UserFormView /></PageTransition>} />
            <Route path="/events" element={<PageTransition><EventsPage /></PageTransition>} />
            <Route path="/events/:id" element={<PageTransition><EventDetailPage /></PageTransition>} />
            <Route path="/meetup/:id" element={<PageTransition><PublicMeetupPage /></PageTransition>} />
            <Route path="/meetups" element={<PageTransition><UserMeetupsList /></PageTransition>} />
            <Route path="/community" element={<PageTransition><CommunityPage /></PageTransition>} />
            <Route path="/get-started" element={<PageTransition><GetStartedPage /></PageTransition>} />

            {/* SHOWCASE & PROJECT DETAILS */}
            <Route path="/showcase" element={<PageTransition><ProjectShowcasePage /></PageTransition>} />
            <Route path="/projects" element={<PageTransition><ProjectShowcasePage /></PageTransition>} />
            <Route path="/showcase/:projectId" element={<PageTransition><ProjectDetailPage /></PageTransition>} />
            <Route path="/project/:projectId" element={<PageTransition><ProjectDetailPage /></PageTransition>} />

            {/* SUPPORTING PAGES */}
            <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
            <Route path="/collaborate" element={<PageTransition><CollaboratePage /></PageTransition>} />
            <Route path="/partners" element={<PageTransition><CollaboratePage /></PageTransition>} />
            <Route path="/faq" element={<PageTransition><FAQPage /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />

            {/* BLOGS */}
            <Route path="/blogs" element={<PageTransition><BlogListPage /></PageTransition>} />
            <Route path="/blog/:slug" element={<PageTransition><BlogDetail /></PageTransition>} />

            {/* AUTH & USER DASHBOARD */}
            <Route path="/signin" element={<PageTransition><AuthForm /></PageTransition>} />
            <Route path="/auth" element={<PageTransition><AuthForm /></PageTransition>} />
            <Route path="/login" element={<PageTransition><AuthForm /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><UserDashboard /></PageTransition>} />
            <Route path="/profile" element={<PageTransition><UserProfile /></PageTransition>} />
            <Route path="/profile/:username" element={<PageTransition><PublicProfile /></PageTransition>} />
            <Route path="/forgot-password" element={<PageTransition><ResetPassword /></PageTransition>} />
            <Route path="/reset-password" element={<PageTransition><ResetPasswordConfirm /></PageTransition>} />

            {/* BUILDER TOOLS */}
            <Route path="/code" element={<PageTransition><UserCodingPlatform /></PageTransition>} />
            <Route path="/playground" element={<PageTransition><UserPlayGround /></PageTransition>} />
            <Route path="/resume-analyzer" element={<PageTransition><ResumeAnalyzer /></PageTransition>} />
            <Route path="/resume" element={<PageTransition><UserResumeBuilder /></PageTransition>} />
            <Route path="/resource" element={<PageTransition><UserResource /></PageTransition>} />

            {/* ADMIN ROUTES */}
            {/* 1. Unprotected Admin Login */}
            <Route path="/admin/login" element={<PageTransition><AdminLoginPage /></PageTransition>} />

            {/* 2. Protected Admin Core Pages */}
            <Route path="/admin" element={<AdminProtectedRoute><PageTransition><Dashboard /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/dashboard" element={<AdminProtectedRoute><PageTransition><Dashboard /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/system" element={<AdminProtectedRoute><PageTransition><AdminSystemHealthPage /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/users" element={<AdminProtectedRoute><PageTransition><AllUserList /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/users/:id" element={<AdminProtectedRoute><PageTransition><AdminUserDetailPage /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/registrations" element={<AdminProtectedRoute><PageTransition><AdminRegistrationsManager /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/audit-logs" element={<AdminProtectedRoute><PageTransition><AdminAuditLogsPage /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/settings" element={<AdminProtectedRoute><PageTransition><AdminSettingsPage /></PageTransition></AdminProtectedRoute>} />

            {/* 3. Protected Existing Admin Subsystems */}
            <Route path="/admin/scanner/:id" element={<AdminProtectedRoute><PageTransition><AdminScannerMeetup /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/meetups" element={<AdminProtectedRoute><PageTransition><AdminMeetupList /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/meetup/create" element={<AdminProtectedRoute><PageTransition><AdminMeetup /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/meetup/edit/:meetupId" element={<AdminProtectedRoute><PageTransition><AdminMeetupEdit /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/meetup/registrations/:id" element={<AdminProtectedRoute><PageTransition><AdminMeetupRegistrations /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/programs" element={<AdminProtectedRoute><PageTransition><AdminProgramsList /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/programs/:id/submissions" element={<AdminProtectedRoute><PageTransition><AdminProgramSubmissions /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship-programs" element={<AdminProtectedRoute><PageTransition><AdminMentorshipPrograms /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/manage/:id" element={<AdminProtectedRoute><PageTransition><AdminMentorshipManager /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/create" element={<AdminProtectedRoute><PageTransition><AdminMentorshipProgramEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/edit/:id" element={<AdminProtectedRoute><PageTransition><AdminMentorshipProgramEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/program/:programId/week/create" element={<AdminProtectedRoute><PageTransition><AdminWeekEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/week/:weekId/edit" element={<AdminProtectedRoute><PageTransition><AdminWeekEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/submissions/:weekId" element={<AdminProtectedRoute><PageTransition><AdminWeekSubmissions /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/general-requests" element={<AdminProtectedRoute><PageTransition><AdminGeneralMentorshipRequests /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/mentorship/all-registrations" element={<AdminProtectedRoute><PageTransition><AdminAllProgramRegistrations /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/blogs" element={<AdminProtectedRoute><PageTransition><AdminBlogList /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/blog/create" element={<AdminProtectedRoute><PageTransition><AdminBlogEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/blog/edit/:id" element={<AdminProtectedRoute><PageTransition><AdminBlogEditor /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/blog/email/:id" element={<AdminProtectedRoute><PageTransition><AdminBlogEmailer /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/hall-of-fame" element={<AdminProtectedRoute><PageTransition><AdminHallOfFame /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/community-photos" element={<AdminProtectedRoute><PageTransition><AdminCommunityPhotos /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/feedback" element={<AdminProtectedRoute><PageTransition><AdminFeedbackList /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/form-builder" element={<AdminProtectedRoute><PageTransition><AdminFormBuilder /></PageTransition></AdminProtectedRoute>} />
            <Route path="/admin/form-builder/:id" element={<AdminProtectedRoute><PageTransition><AdminFormBuilder /></PageTransition></AdminProtectedRoute>} />

            {/* 404 NOT FOUND */}
            <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdminRoute && <HackHereFooter />}
    </div>
  );
};

export default function App() {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <LoadingProvider>
        <Router>
          <AnimatedAppRoutes />
          <Toaster position="top-center" toastOptions={{ style: { background: '#080B10', color: '#F4FAFB', border: '1px solid #263640' } }} />
        </Router>
      </LoadingProvider>
    </SessionContextProvider>
  );
}
