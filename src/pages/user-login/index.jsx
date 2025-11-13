import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LoginForm from './components/LoginForm';
import AuthFooter from './components/AuthFooter';
import WellnessQuote from './components/WellnessQuote';

const UserLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/personal-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <div className="min-h-screen flex">
          {/* Login Section */}
          <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 lg:w-1/2">
            <div className="w-full max-w-md mx-auto space-y-8">
              <LoginForm />
              <AuthFooter />
            </div>
          </div>

          {/* Wellness Quote Section - Desktop Only */}
          <WellnessQuote />
        </div>
      </main>
    </div>
  );
};

export default UserLogin;