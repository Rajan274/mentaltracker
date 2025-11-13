import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CTASection = () => {
  const benefits = [
  "Start tracking your mood in under 2 minutes",
  "Private and secure - your data stays yours",
  "No credit card required for free account",
  "Access to wellness insights and analytics"];


  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary rounded-full blur-2xl"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Sparkles" size={16} />
                <span>Start Your Journey Today</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Ready to Take Control of Your
                <span className="block text-primary">Mental Wellness?</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of users who have transformed their mental health journey with MindTracker. Start with a free account and discover the power of mindful self-monitoring.
              </p>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits?.map((benefit, index) =>
              <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-success/10 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-success" strokeWidth={3} />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/user-registration">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg font-medium shadow-medium hover:shadow-pronounced"
                  iconName="ArrowRight"
                  iconPosition="right">

                  Create Free Account
                </Button>
              </Link>
              <Link to="/user-login">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 text-lg font-medium"
                  iconName="LogIn"
                  iconPosition="left">

                  Sign In
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-full border-2 border-background"></div>
                <div className="w-8 h-8 bg-muted rounded-full border-2 border-background flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">+</span>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">50,000+</span> users trust MindTracker
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-pronounced">
              <Image
                src="https://images.unsplash.com/photo-1587373305041-a8544a4b0a98"
                alt="Smiling young woman with curly hair using smartphone while sitting in bright modern room with plants"
                className="w-full h-80 lg:h-96 object-cover" />

            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-pronounced border border-border/50 max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-success to-success/70 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} color="white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">Mood Improved</div>
                  <div className="text-xs text-muted-foreground">+23% this week</div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-accent/20 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>);

};

export default CTASection;