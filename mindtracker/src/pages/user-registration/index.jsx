import React from 'react';
import Header from '../../components/ui/Header';
import WelcomeHero from './components/WelcomeHero';
import RegistrationForm from './components/RegistrationForm';
import PrivacyMessage from './components/PrivacyMessage';

const UserRegistration = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <Header />
      <main className="main-content">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          {/* Hero Section */}
          <section className="mb-12 lg:mb-16">
            <WelcomeHero />
          </section>

          {/* Registration Section */}
          <section className="mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Registration Form */}
              <div className="order-2 lg:order-1">
                <RegistrationForm />
              </div>

              {/* Privacy Message */}
              <div className="order-1 lg:order-2">
                <PrivacyMessage />
              </div>
            </div>
          </section>

          {/* Trust Indicators */}
          <section className="border-t border-border pt-8">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Trusted by mental health professionals and individuals worldwide
              </p>
              
              <div className="flex items-center justify-center space-x-8 opacity-60">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">SSL Secured</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">H</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">HIPAA Compliant</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">🔒</span>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">End-to-End Encrypted</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} MindTracker. All rights reserved.
            </p>
            <div className="flex items-center justify-center space-x-4 text-xs">
              <button className="text-muted-foreground hover:text-primary gentle-transition">
                Privacy Policy
              </button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-primary gentle-transition">
                Terms of Service
              </button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-primary gentle-transition">
                Support
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserRegistration;