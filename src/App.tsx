import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskDetail from './components/TaskDetail';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import TeachersPage from './pages/TeachersPage';
import ContactsPage from './pages/ContactsPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import MaterialPage from './pages/MaterialPage';
import HomeworksPage from './pages/HomeworksPage';
import Dashboard from './pages/Dashboard';
import SchedulePage from './pages/SchedulePage';
import { useEffect } from 'react';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page wrapper with transition
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// Auth pages don't have navbar/footer
const AUTH_ROUTES = ['/login', '/register'];

function AppContent() {
  const location = useLocation();
  const isAuth = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuth && <Navbar />}

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/courses" element={<PageWrapper><CoursesPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/teachers" element={<PageWrapper><TeachersPage /></PageWrapper>} />
            <Route path="/contacts" element={<PageWrapper><ContactsPage /></PageWrapper>} />

            <Route path="/login" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><AuthPage /></PageWrapper>} />

            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/materials" element={<PageWrapper><MaterialPage /></PageWrapper>} />
            <Route path="/schedule" element={<PageWrapper><SchedulePage /></PageWrapper>} />
            <Route path="/homeworks" element={<PageWrapper><HomeworksPage /></PageWrapper>} />

            <Route path="/homework/:id" element={<PageWrapper><TaskDetail /></PageWrapper>} />

            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />

            {/* <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
            <Route path="/courses" element={<PageWrapper><CoursesPage /></PageWrapper>} />
            <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
            <Route path="/teachers" element={<PageWrapper><TeachersPage /></PageWrapper>} />
            <Route path="/contacts" element={<PageWrapper><ContactsPage /></PageWrapper>} />
            <Route path="/login" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route path="/register" element={<PageWrapper><AuthPage /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} /> */}
          </Routes>
        </AnimatePresence>
      </main>

      {!isAuth && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent />
    </BrowserRouter>
  );
}
