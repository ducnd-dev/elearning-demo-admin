import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth";

import Loader from './common/Loader';
import ExpertList from './pages/Experts/ExpertList';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import { AuthProvider } from './hooks/useAuth';
import DefaultLayout from './layout/DefaultLayout';
import ExpertDetail from './pages/Experts/ExpertDetail';
import CreateExpert from './pages/Experts/CreateExpert';
import UnAuth from './pages/Authentication/UnAuth';

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
          <Route path='/experts' element={ <ExpertList />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route path="/experts/create" element={<CreateExpert />} />
          <Route path="unauthorized" element={<UnAuth />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
