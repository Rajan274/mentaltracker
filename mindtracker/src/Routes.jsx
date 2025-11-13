import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import CalendarView from './pages/calendar-view';
import JournalEntries from './pages/journal-entries';
import LandingPage from './pages/landing-page';
import UserRegistration from './pages/user-registration';
import PersonalDashboard from './pages/personal-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/calendar-view" element={<CalendarView />} />
        <Route path="/journal-entries" element={<JournalEntries />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="/personal-dashboard" element={<PersonalDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
