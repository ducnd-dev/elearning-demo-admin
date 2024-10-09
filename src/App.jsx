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
import CategoriesList from './pages/Category/CourseList';
import CategoriesDetail from './pages/Category/CategoriesDetail';
import AccountList from './pages/Account/AccountList';
import AccountDetail from './pages/Account/AccountDetail';
import CreateAccount from './pages/Account/CreateAccount';
import ListSeting from './pages/Setting/ListSeting';

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
    if (!token) {
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
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path='/categories' element={ <CategoriesList />} />
          <Route path="/users" element={<AccountList />} />
          <Route path="/users/:id" element={<AccountDetail />} />
          <Route path="/users/create" element={<CreateAccount />} />
          <Route path="/categories/:id" element={<CategoriesDetail />} />
          <Route path="/settings" element={<ListSeting />} />
          <Route path="unauthorized" element={<UnAuth />} />
        </Route>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
