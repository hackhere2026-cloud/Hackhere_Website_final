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

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import AllUserList from './pages/admin/AllUserList';
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
            <Route path="/admin" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/admin/analytics" element={<PageTransition><AnalyticsPage /></PageTransition>} />
            <Route path="/admin/users" element={<PageTransition><AllUserList /></PageTransition>} />
            <Route path="/admin/scanner/:id" element={<PageTransition><AdminScannerMeetup /></PageTransition>} />
            <Route path="/admin/meetups" element={<PageTransition><AdminMeetupList /></PageTransition>} />
            <Route path="/admin/meetup/create" element={<PageTransition><AdminMeetup /></PageTransition>} />
            <Route path="/admin/meetup/edit/:meetupId" element={<PageTransition><AdminMeetupEdit /></PageTransition>} />
            <Route path="/admin/meetup/registrations/:id" element={<PageTransition><AdminMeetupRegistrations /></PageTransition>} />
            <Route path="/admin/programs" element={<PageTransition><AdminProgramsList /></PageTransition>} />
            <Route path="/admin/programs/:id/submissions" element={<PageTransition><AdminProgramSubmissions /></PageTransition>} />
            <Route path="/admin/mentorship-programs" element={<PageTransition><AdminMentorshipPrograms /></PageTransition>} />
            <Route path="/admin/mentorship/manage/:id" element={<PageTransition><AdminMentorshipManager /></PageTransition>} />
            <Route path="/admin/mentorship/create" element={<PageTransition><AdminMentorshipProgramEditor /></PageTransition>} />
            <Route path="/admin/mentorship/edit/:id" element={<PageTransition><AdminMentorshipProgramEditor /></PageTransition>} />
            <Route path="/admin/mentorship/program/:programId/week/create" element={<PageTransition><AdminWeekEditor /></PageTransition>} />
            <Route path="/admin/mentorship/week/:weekId/edit" element={<PageTransition><AdminWeekEditor /></PageTransition>} />
            <Route path="/admin/mentorship/submissions/:weekId" element={<PageTransition><AdminWeekSubmissions /></PageTransition>} />
            <Route path="/admin/mentorship/general-requests" element={<PageTransition><AdminGeneralMentorshipRequests /></PageTransition>} />
            <Route path="/admin/mentorship/all-registrations" element={<PageTransition><AdminAllProgramRegistrations /></PageTransition>} />
            <Route path="/admin/blogs" element={<PageTransition><AdminBlogList /></PageTransition>} />
            <Route path="/admin/blog/create" element={<PageTransition><AdminBlogEditor /></PageTransition>} />
            <Route path="/admin/blog/edit/:id" element={<PageTransition><AdminBlogEditor /></PageTransition>} />
            <Route path="/admin/blog/email/:id" element={<PageTransition><AdminBlogEmailer /></PageTransition>} />
            <Route path="/admin/hall-of-fame" element={<PageTransition><AdminHallOfFame /></PageTransition>} />
            <Route path="/admin/community-photos" element={<PageTransition><AdminCommunityPhotos /></PageTransition>} />
            <Route path="/admin/feedback" element={<PageTransition><AdminFeedbackList /></PageTransition>} />
            <Route path="/admin/form-builder" element={<PageTransition><AdminFormBuilder /></PageTransition>} />
            <Route path="/admin/form-builder/:id" element={<PageTransition><AdminFormBuilder /></PageTransition>} />

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
