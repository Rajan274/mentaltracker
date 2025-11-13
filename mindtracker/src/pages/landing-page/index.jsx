import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigate('/personal-dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="main-content">
        <HeroSection />
        <FeaturesSection />
        <TrustSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default LandingPage;