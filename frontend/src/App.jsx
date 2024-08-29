import { Navigate, Route, Routes } from 'react-router-dom';
import FloatingShape from './components/FloatingShape';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import LoadingSpinner from './components/LoadingSpinner';


import EmailVerificationPage from './pages/EmailVerificationPage';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

// protect routes that require authenctication
const ProtectedRoute = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if(!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

// redirect authenitcated users to the homepage
const RedirectAuthenicatedUser = ({children}) => {
  const { isAuthenticated, user } = useAuthStore();

  if(isAuthenticated && user.isVerified ) {
    return <Navigate to='/' replace />;
  }
  return children;
};


function App() {

  // Todo: Remove isAuthenticated & user - for debugging purposes
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if(isCheckingAuth) return <LoadingSpinner />;

  // debug
  console.log("is authenticated: ", isAuthenticated);
  console.log("user", user);

  return (
    <div
			className='min-h-screen bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden'
		>
      <FloatingShape
        color="bg-green-500" size="w-64 h-64" top="-5%"
        Left="10%" delay={0}
      />

      <FloatingShape
        color="bg-emerald-500" size="w-48 h-48" top="70%"
        Left="80%" delay={5}
      />

      <FloatingShape
        color="bg-lime-500" size="w-32 h-32" top="40%"
        Left="-10%" delay={2}
      />

      <Routes>
        <Route path="/" element={
          <ProtectedRoute>  { /* unauthenticated users cannot visit this protected route */}
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <RedirectAuthenicatedUser>
            <SignUpPage />
          </RedirectAuthenicatedUser>
          } />
        <Route path="/login" element={
          <RedirectAuthenicatedUser>
           <LoginPage />
          </RedirectAuthenicatedUser>
          } />
        <Route path="/verify-email" element={ <EmailVerificationPage /> } />
        <Route path="/forgot-password" element={ 
          <RedirectAuthenicatedUser>
            <ForgotPasswordPage />
          </RedirectAuthenicatedUser> } />

          <Route 
            path='/reset-password/:token'

            element={
              <RedirectAuthenicatedUser>
                <ResetPasswordPage />
              </RedirectAuthenicatedUser>
            }
          />

        { /* Catch all routes - todo 404 page component*/}
        <Route 
            path='*'

            element={
              <Navigate to='/' replace />
            }
          />

      </Routes>

      <Toaster />

    </div>
  )
}

export default App
