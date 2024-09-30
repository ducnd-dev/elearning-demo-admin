import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";

import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './hooks/useAuth';
import DefaultLayout from './layout/DefaultLayout';
import UnAuth from './pages/Authentication/UnAuth';
import CourseList from './pages/Course/CourseList';
import CourseDetail from './pages/Course/CourseDetail';
import CreateCourse from './pages/Course/CreateCourse';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const ProtectedRoute = ({ children }) => {
    const { token, role } = useAuth();
    if (!token || role !== "ADMIN") {
      return <Navigate to="/auth/signin" />;
    }
    return children;
  };

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <DefaultLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path='/courses' element={ <CourseList />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="unauthorized" element={<UnAuth />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
