import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthFooter = () => {
  return (
    <div className="w-full max-w-md mx-auto mt-8 space-y-6">
      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-muted-foreground text-sm mb-3">
          New to MindTracker?
        </p>
        <Link to="/user-registration">
          <Button variant="outline" fullWidth>
            Create Account
          </Button>
        </Link>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Back to Home */}
      <div className="text-center">
        <Link 
          to="/landing-page" 
          className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground gentle-transition"
        >
          <Icon name="ArrowLeft" size={14} />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Privacy Notice */}
      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
        <div className="flex items-start space-x-2">
          <Icon name="Lock" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-foreground">Privacy First</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your mental health data is encrypted end-to-end and never shared with third parties. 
              We follow HIPAA-compliant security standards.
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Shield" size={12} className="text-success" />
            <span>SSL Encrypted</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Eye" size={12} className="text-primary" />
            <span>Private by Design</span>
          </div>
        </div>
      </div>

      {/* Support Links */}
      <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
        <a href="#" className="hover:text-foreground gentle-transition">
          Help Center
        </a>
        <a href="#" className="hover:text-foreground gentle-transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-foreground gentle-transition">
          Terms of Service
        </a>
      </div>
    </div>
  );
};

export default AuthFooter;