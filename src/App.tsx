import { Suspense, useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "./components/home";
import StudentList from "./components/students/StudentList";
import TeacherList from "./components/teachers/TeacherList";
import ClassList from "./components/classes/ClassList";
import AttendanceManager from "./components/attendance/AttendanceManager";
import ExamResults from "./components/exams/ExamResults";
import FeeManager from "./components/fees/FeeManager";
import Sidebar from "./components/layout/Sidebar";
import LandingPage from "./components/landing/LandingPage";
import LoadingAnimation from "./components/common/LoadingAnimation";
import { motion, AnimatePresence } from "framer-motion";
import routes from "tempo-routes";
import { checkUserRole, ROLES, UserRole } from "./lib/roles";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import Settings from "./components/settings/Settings";
import AuthPage from "./components/auth/AuthPage";
import { Toast } from "./components/common/Toast";
import MainLayout from "./components/layout/MainLayout";
import AboutPage from "./components/about/AboutPage";
import ContactPage from "./components/contact/ContactPage";
import PricingPage from "./components/pricing/PricingPage";
import FeaturesPage from "./components/features/FeaturesPage";

interface HomeProps {
  userRole: UserRole;
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user, logout } = useAuth0();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => setIsInitializing(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Redirect to dashboard if authenticated
    if (
      isAuthenticated &&
      (location.pathname === "/" || location.pathname === "/auth")
    ) {
      console.log("User is authenticated, redirecting to dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, location.pathname, navigate]);

  // Debug logging
  useEffect(() => {
    console.log("Auth state:", {
      isLoading,
      isAuthenticated,
      user,
      path: location.pathname,
    });
  }, [isLoading, isAuthenticated, user, location.pathname]);

  if (isInitializing || isLoading) {
    return <LoadingAnimation />;
  }

  // Handle public routes
  if (!isAuthenticated) {
    console.log("User is not authenticated, showing landing page or auth page");
    if (location.pathname === "/auth") {
      return <AuthPage />;
    }
    // Allow access to public pages
    if (
      ["/about", "/contact", "/pricing", "/features"].includes(
        location.pathname,
      )
    ) {
      return (
        <Suspense fallback={<LoadingAnimation />}>
          <Routes location={location}>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/features" element={<FeaturesPage />} />
          </Routes>
        </Suspense>
      );
    }
    if (location.pathname !== "/") {
      // Redirect to home if trying to access protected routes
      return <Navigate to="/" replace />;
    }
    return <LandingPage />;
  }

  console.log("User is authenticated, showing dashboard");
  // For demo purposes, always assign admin role
  const userRole = ROLES.ADMIN;

  return (
    <MainLayout userRole={userRole}>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <LoadingAnimation />
          </div>
        }
      >
        <Routes location={location}>
          <Route path="/dashboard" element={<Home userRole={userRole} />} />
          <Route path="/auth" element={<AuthPage />} />

          {/* Public Routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<FeaturesPage />} />

          {/* Student Routes */}
          <Route
            path="/exams"
            element={
              <ProtectedRoute>
                <ExamResults />
              </ProtectedRoute>
            }
          />

          {/* Teacher Routes */}
          <Route
            path="/students"
            element={
              <ProtectedRoute>
                <StudentList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <AttendanceManager />
              </ProtectedRoute>
            }
          />

          {/* Admin Only Routes */}
          <Route
            path="/teachers"
            element={
              <ProtectedRoute>
                <TeacherList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <ClassList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fees"
            element={
              <ProtectedRoute>
                <FeeManager />
              </ProtectedRoute>
            }
          />

          {/* Settings Route */}
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        {/* Tempo routes are handled separately */}
      </Suspense>
    </MainLayout>
  );
}

export default App;
